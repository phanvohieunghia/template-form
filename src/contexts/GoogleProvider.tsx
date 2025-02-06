import { appConfig } from '@/configs'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PropsWithChildren } from 'react'

export const GoogleProvider = (props: PropsWithChildren) => {
  const { children } = props
  return <GoogleOAuthProvider clientId={appConfig.googleClientId}>{children}</GoogleOAuthProvider>
}
