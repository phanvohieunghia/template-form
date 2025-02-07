import clsx from 'clsx'
import debounce from 'lodash/debounce'
import { ButtonHTMLAttributes, cloneElement, CSSProperties, FC, HTMLAttributes, ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getClosestScrollableElement, getNewPopupPosition, POPOVER } from '../utils'
import { PositionState } from '../utils/intefaces'
import { PopoverContentProps, Props, State } from './interfaces'

export const Popover: FC<Props> = (props) => {
  const { children, trigger = 'click', content, zIndex, placement = 'bottom' } = props

  const [position, setPosition] = useState<PositionState>({ top: 0, left: 0 })
  const [state, setState] = useState<State>({ isActive: false, isOpen: false, isDisplay: false })

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
        setState((prev) => (prev.isActive ? { ...prev, isActive: false } : prev))
        clearTimeout(timeout)
      }, 0)
    }
  }

  const handleActive = () => {
    const timeout = setTimeout(() => {
      const newPosition = getNewPopupPosition(childRef, popupRef, POPOVER.GAP, placement)
      if (newPosition) setPosition(newPosition)
      setState((prev) => ({ ...prev, isActive: !prev.isActive }))
      clearTimeout(timeout)
    }, 0)
  }

  const handleClick = () => {
    setState((prev) => ({ ...prev, isOpen: true }))
    if (state.isActive) {
      setState((prev) => ({ ...prev, isActive: !prev.isActive }))
    } else {
      handleActive()
    }
  }

  const handleFocus = () => {
    setState((prev) => (!prev.isOpen ? { ...prev, isOpen: true } : prev))
    handleActive()
  }

  const handleBlur = () => {
    setState((prev) => ({ ...prev, isActive: false }))
  }

  const handleMouseEnter = () => {
    blurRef.current = false
    setState((prev) => (!prev.isOpen ? { ...prev, isOpen: true } : prev))
    handleActive()
  }

  const handleMouseLeave = () => {
    blurRef.current = true
  }

  const handleMouseMove = (event: Event) => {
    if (blurRef.current && popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setState((prev) => (prev.isActive ? { ...prev, isActive: false } : prev))
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
    if (state.isActive) setState((prev) => ({ ...prev, isDisplay: true }))
    else
      timeout = setTimeout(() => {
        setState((prev) => ({ ...prev, isDisplay: false }))
      }, 300)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [state.isActive])

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
      {state.isOpen &&
        clonedContent &&
        createPortal(
          <div>
            <div
              ref={popupRef}
              className={clsx(
                'absolute flex flex-col gap-[2px] overflow-hidden rounded-md bg-white',
                state.isActive ? 'animate-fade-in' : 'animate-fade-out',
              )}
              style={{
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                visibility: state.isDisplay ? ('visible' as CSSProperties['visibility']) : ('hidden' as CSSProperties['visibility']),
                top: position.top,
                left: position.left,
                zIndex: zIndex ? zIndex : 'z-10',
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
