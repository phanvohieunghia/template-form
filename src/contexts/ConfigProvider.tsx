import { FC, PropsWithChildren } from 'react'
import { ErrorProvider } from './ErrorProvider'
import { StateProvider } from './StateProvider'
import { TempProvider } from './TempProvider'

export const ConfigProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <ErrorProvider>
      <TempProvider>
        <StateProvider>{children}</StateProvider>
      </TempProvider>
    </ErrorProvider>
  )
}
