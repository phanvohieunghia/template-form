import { HTMLAttributes } from 'react'

export type State = {
  isOpen: boolean
  isActive: boolean
  isDisplay: boolean
  selected: DefaultOptionType | DefaultOptionType[] | undefined
  position: { top: number; left?: number }
}

export type DefaultOptionType = {
  // label?: React.ReactNode
  label?: string
  value?: string | number | null
  children?: JSX.Element
}

export type ModeType = 'multiple' | 'tags'

export type Props = {
  options?: DefaultOptionType[]
  mode?: ModeType
  defaultValue?: string
  placeholder?: string
  onChange?: (selectedParam: State['selected']) => void
} & HTMLAttributes<HTMLDivElement>

export type CurrentSelectType = {
  placeholder: Props['placeholder']
} & Pick<State, 'selected'> &
  Pick<Props, 'mode'>

export type CurrentSelectState = {
  isDisplay: boolean
  wrapperWidth: number
  resize: number
  selectedItems: {
    element: HTMLSpanElement
    isDisplay: boolean
  }[]
}
