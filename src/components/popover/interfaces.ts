import { PropsWithChildren } from 'react'
import { PlacementType } from '../utils/intefaces'

export type PopoverContentProps = { onClose?: () => void }

export type Props = PropsWithChildren & {
  trigger?: 'hover' | 'focus' | 'click'
  content?: React.ReactNode | JSX.Element
  zIndex?: number
  placement?: PlacementType
}

export type State = {
  isOpen: boolean
  isActive: boolean
  isDisplay: boolean
}
