import { FC, PropsWithChildren } from 'react'
import { ErrorProvider } from './ErrorProvider'
import { GoogleProvider } from './GoogleProvider'
import { StateProvider } from './StateProvider'
import { TestProvider } from './TestProvider'

export const ConfigProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <ErrorProvider>
      <TestProvider>
        <GoogleProvider>
          <StateProvider>{children}</StateProvider>
        </GoogleProvider>
      </TestProvider>
    </ErrorProvider>
  )
}
