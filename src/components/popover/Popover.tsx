import clsx from 'clsx'
import debounce from 'lodash/debounce'
import { ButtonHTMLAttributes, cloneElement, CSSProperties, FC, HTMLAttributes, ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getClosestScrollableElement, getNewPopupPosition, POPOVER } from '../utils'
import { PositionState } from '../utils/intefaces'
import { PopoverContentProps, Props, State } from './interfaces'

export const Popover: FC<Props> = (props) => {
  const { children, trigger = 'click', content, zIndex, placement = 'bottom', width, onChange, open } = props

  const [position, setPosition] = useState<PositionState>({ top: 0, left: 0 })
  const [state, setState] = useState<State>({ isActive: open ?? false, firstTime: false, isDisplay: false })
  const childRef = useRef<HTMLButtonElement | HTMLInputElement | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<boolean>(false)

  const handleClickOutside = (event: Event) => {
    if (
      childRef.current &&
      !childRef.current.contains(event.target as Node) &&
      popupRef.current &&
      !popupRef.current.contains(event.target as Node)
    ) {
      const timeout = setTimeout(() => {
        if (typeof open === 'boolean') {
          if (onChange) onChange(false)
          return
        }
        setState((prev) => (prev.isActive ? { ...prev, isActive: false } : prev))
        clearTimeout(timeout)
      }, 0)
    }
  }

  const handleActive = () => {
    const timeout = setTimeout(() => {
      const newPosition = getNewPopupPosition(childRef, popupRef, POPOVER.GAP, placement)
      console.log(newPosition)
      if (newPosition) setPosition(newPosition)
      if (typeof open === 'boolean') {
        if (onChange) onChange(true)
        return
      }

      setState((prev) => {
        if (onChange) onChange(!prev.isActive)
        return { ...prev, isActive: !prev.isActive }
      })
      clearTimeout(timeout)
    }, 0)
  }

  const handleClick = () => {
    setState((prev) => ({ ...prev, firstTime: true }))

    if (state.isActive) {
      if (typeof open === 'boolean') {
        if (onChange) onChange(!open)
        return
      }
      setState((prev) => ({ ...prev, isActive: !prev.isActive }))
    } else handleActive()
  }

  const handleFocus = () => {
    setState((prev) => (!prev.firstTime ? { ...prev, firstTime: true } : prev))
    handleActive()
  }

  const handleBlur = () => {
    if (typeof open === 'boolean') {
      if (onChange) onChange(false)
      return
    }
    setState((prev) => ({ ...prev, isActive: false }))
  }

  const handleMouseEnter = () => {
    if (typeof open === 'boolean') {
      if (onChange) onChange(true)
      return
    }

    blurRef.current = false
    setState((prev) => (!prev.firstTime ? { ...prev, firstTime: true } : prev))
    handleActive()
  }

  const handleMouseLeave = () => {
    blurRef.current = true
  }

  const handleMouseMove = (event: Event) => {
    if (blurRef.current && popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setState((prev) => {
        if (prev.isActive) {
          if (onChange) onChange(false)
          return { ...prev, isActive: false }
        }
        return prev
      })
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    if (trigger === 'hover') document.addEventListener('mousemove', debounce(handleMouseMove, 50))
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (trigger === 'hover') document.removeEventListener('mousemove', debounce(handleMouseMove, 50))
    }
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (open ?? state.isActive) {
      setState((prev) => ({ ...prev, isDisplay: true }))
    } else
      timeout = setTimeout(() => {
        setState((prev) => ({ ...prev, isDisplay: false }))
      }, 300)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [state.isActive, open])

  const clonedChildren = useMemo(() => {
    if (!children) return null

    const eventHandlersObject = {
      click: { onClick: handleClick },
      focus: { onFocus: handleFocus, onBlur: handleBlur },
      hover: { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
    }
    return cloneElement(children as ReactElement<ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }>, {
      ...eventHandlersObject[trigger],
      ref: (e: HTMLButtonElement) => {
        if (childRef.current !== e) {
          childRef.current = e
        }
        if (typeof children === 'object' && 'ref' in children) {
          if (typeof children.ref === 'function') {
            children.ref(e)
          } else if (children.ref) {
            ;(children.ref as React.MutableRefObject<HTMLButtonElement | null>).current = e
          }
        }
      },
    })
  }, [children, trigger])

  const clonedContent = useMemo(() => {
    if (!content) return null
    return cloneElement(content as ReactElement<HTMLAttributes<HTMLElement> & PopoverContentProps>, {
      onClose: handleClick,
    })
  }, [content])

  return (
    <>
      {clonedChildren}
      {state.firstTime &&
        clonedContent &&
        createPortal(
          <div>
            <div
              ref={popupRef}
              className={clsx(
                'absolute flex flex-col gap-[2px] overflow-hidden rounded-md bg-white',
                (open ?? state.isActive) ? 'animate-fade-in' : 'animate-fade-out',
              )}
              style={{
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                visibility: state.isDisplay ? ('visible' as CSSProperties['visibility']) : ('hidden' as CSSProperties['visibility']),
                top: position.top,
                left: position.left,
                zIndex: zIndex ?? 'z-10',
                minWidth: width,
              }}
            >
              {clonedContent}
            </div>
          </div>,
          getClosestScrollableElement(childRef.current) === document.documentElement ? document.body : document.documentElement,
        )}
    </>
  )
}
