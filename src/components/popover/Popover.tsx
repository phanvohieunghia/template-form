import clsx from 'clsx'
import debounce from 'lodash/debounce'
import {
  ButtonHTMLAttributes,
  cloneElement,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { getClosestScrollableElement, getNewPosition } from '../utils'
import { PopoverContentProps } from './interfaces'

type Props = PropsWithChildren & {
  trigger?: 'hover' | 'focus' | 'click'
  content?: React.ReactNode | JSX.Element
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
      const newPosition = getNewPosition(childRef, popupRef)
      if (newPosition) setPosition(newPosition)
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
    if (blurRef.current && popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setPopoverState((prev) => ({ ...prev, isActive: false }))
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

  const clonedChildren = useMemo(() => {
    if (!children) return null
    const eventHandlersObject = {
      click: { onClick: handleClick },
      focus: { onFocus: handleFocus, onBlur: handleBlur },
      hover: { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
    }
    return cloneElement(children as ReactElement<ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }>, {
      ...eventHandlersObject[trigger],
      ref: (e) => {
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
      {popoverState.isOpen &&
        clonedContent &&
        createPortal(
          <div>
            <div
              ref={popupRef}
              className={clsx('absolute z-10 overflow-hidden', popoverState.isActive ? 'animate-fade-in' : 'animate-fade-out')}
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
              {clonedContent}
            </div>
          </div>,
          getClosestScrollableElement(childRef.current) === document.documentElement ? document.body : document.documentElement,
        )}
    </>
  )
}
