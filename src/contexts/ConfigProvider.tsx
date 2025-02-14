import { appConfig } from '@/configs'
import { FC, PropsWithChildren } from 'react'
import { ErrorProvider } from './ErrorProvider'
import { GoogleProvider } from './GoogleProvider'
import { StateProvider } from './StateProvider'
import { TestProvider } from './TestProvider'

export const ConfigProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props
  document.title = appConfig.title

  const link = document.querySelector("link[rel~='icon']")
  if (!link) {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    document.head.appendChild(link)
    link.href = appConfig.logo.onlyLogo
  }

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
