import clsx from 'clsx'
import { debounce } from 'lodash'
import { ButtonHTMLAttributes, cloneElement, CSSProperties, ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getClosestScrollableElement, getNewArrowPosition, getNewPopupPosition, TOOLTIP } from '../utils'
import { Props, State } from './interfaces'
import styles from './styles.module.css'

export const Tooltip = (props: Props) => {
  const { children, title, trigger = 'hover', arrow } = props

  const childRef = useRef<HTMLButtonElement | HTMLInputElement | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<boolean>(false)

  const [state, setState] = useState<State>({
    isActive: false,
    isOpen: false,
    isDisplay: false,
    position: { popup: { top: 0, left: 0 }, arrow: { top: 0 } },
  })

  const handleActive = () => {
    const timeout = setTimeout(() => {
      const newPosition: Partial<State['position']> = {}

      const newArrowPosition = getNewArrowPosition(childRef, arrow ? TOOLTIP.GAP.ARROW : TOOLTIP.GAP.WITHOUT_ARROW)
      if (newArrowPosition) newPosition.arrow = newArrowPosition

      const newPopupPosition = getNewPopupPosition(childRef, popupRef, arrow ? TOOLTIP.GAP.ARROW : TOOLTIP.GAP.WITHOUT_ARROW)
      if (newPopupPosition) newPosition.popup = newPopupPosition
      console.log(newArrowPosition, newPopupPosition)
      setState((prev) => ({ ...prev, isActive: !prev.isActive, position: newPosition as State['position'] }))
      clearTimeout(timeout)
    }, 0)
  }

  const handleMouseEnter = () => {
    blurRef.current = false
    setState((prev) => (!prev.isOpen ? { ...prev, isOpen: true } : prev))
    handleActive()
  }

  const handleClick = () => {
    setState((prev) => (!prev.isOpen ? { ...prev, isOpen: true } : prev))
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
    // setState((prev) => ({ ...prev, isActive: false }))
  }

  const handleMouseMove = (event: Event) => {
    if (blurRef.current && popupRef.current && !popupRef.current.contains(event.target as Node)) {
      // setState((prev) => (prev.isActive ? { ...prev, isActive: false } : prev))
    }
  }

  const handleClickOutside = (event: Event) => {
    if (
      childRef.current &&
      !childRef.current.contains(event.target as Node) &&
      popupRef.current &&
      !popupRef.current.contains(event.target as Node)
    ) {
      const timeout = setTimeout(() => {
        setState((prev) => ({ ...prev, isActive: false }))
        clearTimeout(timeout)
      }, 0)
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (state.isActive) setState((prev) => ({ ...prev, isDisplay: true }))
    else
      timeout = setTimeout(() => {
        setState((prev) => ({ ...prev, isDisplay: false }))
      }, 100)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [state.isActive])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    if (trigger === 'hover') document.addEventListener('mousemove', debounce(handleMouseMove, 50))
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (trigger === 'hover') document.removeEventListener('mousemove', debounce(handleMouseMove, 50))
    }
  }, [])

  const handleMouseLeave = () => {
    blurRef.current = true
  }
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
  }, [children])

  return (
    <>
      {clonedChildren}
      {state.isOpen &&
        title &&
        createPortal(
          <div>
            <div>
              <div
                ref={popupRef}
                className={clsx(
                  'absolute z-10 rounded-[6px] bg-black p-1 px-2 text-white animate-duration-100',
                  state.isActive ? 'animate-fade-in' : 'animate-fade-out',
                )}
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  visibility: state.isDisplay ? ('visible' as CSSProperties['visibility']) : ('hidden' as CSSProperties['visibility']),
                  ...state.position.popup,
                }}
              >
                {title}
              </div>
              {arrow && (
                <div
                  className={clsx(styles['arrow'], state.isActive ? 'animate-fade-in' : 'animate-fade-out')}
                  style={{
                    visibility: state.isDisplay ? ('visible' as CSSProperties['visibility']) : ('hidden' as CSSProperties['visibility']),
                    ...state.position.arrow,
                  }}
                ></div>
              )}
            </div>
          </div>,
          getClosestScrollableElement(childRef.current) === document.documentElement ? document.body : document.documentElement,
        )}
    </>
  )
}
