import CloseIcon from '@/assets/svgs/close.svg'
import clsx from 'clsx'
import { FC, isValidElement, PropsWithChildren, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../button'
import styles from './Drawer.module.css'

type DrawerPosition = 'top' | 'right' | 'bottom' | 'left'

interface Props extends PropsWithChildren {
  open?: boolean
  title?: string
  position?: DrawerPosition
  extra?: JSX.Element
  iconClose?: JSX.Element
  closable?: boolean
  isShowHeader?: boolean
  width?: number
  onClose: () => void
}

export type State = {
  firstTimeOpen: boolean
  isDisplay: boolean
}

export const Drawer: FC<Props> = (props) => {
  const {
    open = false,
    title = 'Drawer',
    position = 'right',
    onClose,
    extra = null,
    iconClose = null,
    closable = true,
    isShowHeader = true,
    children,
    width = 500,
  } = props

  const [state, setState] = useState<State>({ firstTimeOpen: false, isDisplay: false })
  const drawerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (open && !state.firstTimeOpen) setState((prev) => ({ ...prev, firstTimeOpen: true }))
  }, [open])

  const positionAnimate = useMemo(() => {
    switch (position) {
      case 'right':
        return open ? 'animate-fade-right-in' : 'animate-fade-right-out'
      case 'left':
        return open ? 'animate-fade-left-in' : 'animate-fade-left-out'
      case 'top':
        return open ? 'animate-fade-up-in' : 'animate-fade-up-out'
      case 'bottom':
        return open ? 'animate-fade-down-in' : 'animate-fade-down-out'
    }
  }, [position, open])
  const handleAnimationEnd = useCallback(() => {
    if (!open) {
      setState((prev) => ({ ...prev, isDisplay: false }))
    }
  }, [])
  return (
    <>
      {state.firstTimeOpen &&
        createPortal(
          <div className='drawer'>
            <div className={clsx('fixed left-0 right-0 top-0 z-50 h-dvh', !open && 'pointer-events-none')}>
              <div
                onClick={onClose}
                onAnimationEnd={handleAnimationEnd}
                className={clsx('absolute inset-0 z-10 bg-black/10', open ? 'animate-fade-in' : 'pointer-events-none animate-fade-out')}
              ></div>
              <div
                onClick={(e) => e.stopPropagation()}
                ref={drawerRef}
                style={{ maxWidth: width }}
                className={clsx('absolute z-20 bg-white', positionAnimate, styles[`placement-${position}`])}
              >
                {isShowHeader && (
                  <div className='flex items-center gap-x-1 px-6 py-4'>
                    {closable && (
                      <Button
                        onClick={onClose}
                        icon={iconClose || <CloseIcon fontSize={16} />}
                        className='min-h-6 min-w-6 rounded border-0 p-1 text-[#00000073] hover:bg-[#0000000f] hover:text-[#000000e0]'
                      />
                    )}
                    {title && <span className='block flex-1 font-semibold'>{title}</span>}
                    {isValidElement(extra) && extra}
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
