import { FC, PropsWithChildren } from 'react'
import { ErrorProvider } from './ErrorProvider'
import { StateProvider } from './StateProvider'

export const ConfigProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <ErrorProvider>
      <StateProvider>{children}</StateProvider>
    </ErrorProvider>
  )
}
