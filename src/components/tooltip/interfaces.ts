import { PropsWithChildren } from 'react'

export type Props = PropsWithChildren & {
  trigger?: 'hover' | 'focus' | 'click'
  title: string
}

export type State = {
  isOpen: boolean
  isActive: boolean
  isDisplay: boolean
  position: { top: number; left: number }
}
