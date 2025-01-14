import { PropsWithChildren } from 'react'

export type PopoverContentProps = { onClose?: () => void }

export type Props = PropsWithChildren & {
  trigger?: 'hover' | 'focus' | 'click'
  content?: React.ReactNode | JSX.Element
}

export type State = {
  isOpen: boolean
  isActive: boolean
  isDisplay: boolean
}
