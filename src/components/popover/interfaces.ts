import { PropsWithChildren } from 'react'
import { PlacementType } from '../utils/intefaces'

export type PopoverContentProps = { onClose?: () => void }

export type Props = PropsWithChildren & {
  trigger?: 'hover' | 'focus' | 'click'
  content?: React.ReactNode | JSX.Element
  zIndex?: number
  placement?: PlacementType
  width?: number
  open?: boolean
  onChange?: (state: boolean) => void
}

export type State = {
  firstTime: boolean
  isActive: boolean
  isDisplay: boolean
}
