import { store } from '@/stores'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

export const StateProvider = (props: PropsWithChildren) => {
  const { children } = props

  return <Provider store={store}>{children}</Provider>
}
