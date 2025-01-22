import { EVENT_NAME, EventManager } from '@/utils'
import clsx from 'clsx'
import { FC, HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react'
import { BaseModalBody as Body } from './BaseModal.Body'
import { BaseModalFooter as Footer } from './BaseModal.Footer'
import { BaseModalHeader as Header } from './BaseModal.Header'

type Props = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    active: boolean
    maskClosable?: boolean
    escKeyboard?: boolean // Whether support press esc to close
  }
type BaseModalComponent = FC<Props> & {
  Header: typeof Header
  Footer: typeof Footer
  Body: typeof Body
}

export const BaseModal: BaseModalComponent = (props) => {
  const { children, active: isActive, maskClosable = false, escKeyboard = false, className, style, ...restProps } = props
  const [modalDisplay, setModalDisplay] = useState<boolean>(isActive)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (isActive) setModalDisplay(true)
    else
      timeout = setTimeout(() => {
        setModalDisplay(false)
      }, 300)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isActive])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (escKeyboard && event.key === 'Escape') {
        EventManager.emit(EVENT_NAME.TEST_MODAL_CLOSE)
      }
    }
    if (isActive) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [escKeyboard, isActive])

  return (
    <div
      style={{ ...style, display: modalDisplay ? 'block' : 'none' }}
      className={clsx('modal fixed inset-0 bg-black bg-opacity-35 backdrop-blur-sm', className, isActive ? 'animate-fade-in' : 'animate-fade-out')}
      onClick={maskClosable ? () => EventManager.emit(EVENT_NAME.TEST_MODAL_CLOSE) : undefined}
      {...restProps}
    >
      <div className='fixed inset-0 flex items-start justify-center py-20'>
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx('animate- w-full max-w-[500px] shadow-lg', isActive ? 'animate-fadeInUp-zoomIn' : 'animate-fadeOutUp-zoomOut')}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

BaseModal.Header = Header
BaseModal.Footer = Footer
BaseModal.Body = Body
