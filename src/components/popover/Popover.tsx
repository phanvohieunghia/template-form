import clsx from 'clsx'
import debounce from 'lodash/debounce'
import { ButtonHTMLAttributes, cloneElement, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = PropsWithChildren & {
  trigger?: 'hover' | 'focus' | 'click'
  content?: React.ReactNode
}

type State = {
  isOpen: boolean
  isActive: boolean
  isDisplay: boolean
}

export const Popover: FC<Props> = (props) => {
  const { children, trigger = 'click', content } = props

  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [popoverState, setPopoverState] = useState<State>({ isActive: false, isOpen: false, isDisplay: false })

  const childRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<boolean>(false)

  const handleClickOutside = (event: Event) => {
    if (
      childRef.current &&
      !childRef.current.contains(event.target as Node) &&
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      const timeout = setTimeout(() => {
        setPopoverState((prev) => ({ ...prev, isActive: false }))
        clearTimeout(timeout)
      }, 100)
    }
  }

  const handleClick = () => {
    setPopoverState((prev) => ({ ...prev, isOpen: true }))
    if (popoverState.isActive) {
      setPopoverState((prev) => ({ ...prev, isActive: !prev.isActive }))
    } else {
      handleActivePopover()
    }
  }
  const handleActivePopover = useCallback(() => {
    const timeout = setTimeout(() => {
      updatePosition()
      setPopoverState((prev) => ({ ...prev, isActive: !prev.isActive }))
      clearTimeout(timeout)
    }, 0)
  }, [])

  const handleFocus = () => {
    setPopoverState((prev) => ({ ...prev, isOpen: true }))
    handleActivePopover()
  }

  const handleBlur = () => {
    setPopoverState((prev) => ({ ...prev, isActive: false }))
  }

  const handleMouseEnter = () => {
    blurRef.current = false
    setPopoverState((prev) => ({ ...prev, isOpen: true }))
    handleActivePopover()
  }

  const handleMouseLeave = () => {
    blurRef.current = true
  }

  const handleMouseMove = (event: Event) => {
    if (blurRef.current && popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setPopoverState((prev) => ({ ...prev, isActive: false }))
    }
  }

  const updatePosition = () => {
    if (childRef.current) {
      const childRect = childRef.current.getBoundingClientRect()
      console.log(closestScrollableElement.scrollLeft, childRect.left, childRect.width, popoverRef.current?.offsetWidth)
      setPosition({
        top: closestScrollableElement.scrollTop + childRect.bottom + 6,
        left: closestScrollableElement.scrollLeft + childRect.left + childRect.width / 2 - (popoverRef.current?.offsetWidth ?? 0) / 2,
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
    if (popoverState.isActive) setPopoverState((prev) => ({ ...prev, isDisplay: true }))
    else
      timeout = setTimeout(() => {
        setPopoverState((prev) => ({ ...prev, isDisplay: false }))
      }, 300)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [popoverState.isActive])

  const clonedElement = useMemo(() => {
    const eventHandlersObject = {
      click: { onClick: handleClick },
      focus: { onFocus: handleFocus, onBlur: handleBlur },
      hover: { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
    }

    return cloneElement(children as ReactElement<ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }>, {
      ...eventHandlersObject[trigger],
      ref: childRef,
    })
  }, [children, trigger])

  const closestScrollableElement = useMemo(() => {
    return closestScrollable(childRef.current)
  }, [])

  function isScrollable(element: HTMLElement | null): boolean {
    if (!element) return false
    const style = window.getComputedStyle(element)
    const overflowY = style.overflowY
    const isOverflowScrollable = overflowY === 'scroll' || overflowY === 'auto'
    return isOverflowScrollable && element.scrollHeight > element.clientHeight
  }

  function closestScrollable(element: HTMLElement | null): HTMLElement {
    let currentElement = element

    while (currentElement) {
      if (isScrollable(currentElement) || currentElement === document.documentElement) return currentElement
      currentElement = currentElement.parentElement
    }
    return document.documentElement
  }

  return (
    <>
      {clonedElement}
      {popoverState.isOpen &&
        content &&
        createPortal(
          <div>
            <div
              ref={popoverRef}
              className={clsx('absolute z-10', popoverState.isActive ? 'animate-fade-in' : 'animate-fade-out')}
              style={{
                visibility: popoverState.isDisplay ? 'visible' : 'hidden',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                borderRadius: 8,
                top: position.top,
                left: position.left,
              }}
            >
              {content}
            </div>
          </div>,
          closestScrollableElement === document.documentElement ? document.body : document.documentElement,
        )}
    </>
  )
}
