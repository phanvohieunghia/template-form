import { PropsWithChildren } from 'react'
import { PositionState } from '../utils/intefaces'

export type Props = PropsWithChildren & {
  trigger?: 'hover' | 'focus' | 'click'
  title?: string
  arrow?: boolean
}

export type State = {
  isOpen: boolean
  isActive: boolean
  isDisplay: boolean
  position: {
    arrow: PositionState
    popup: PositionState
  }
}
