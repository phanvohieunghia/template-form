import { LocalStorageService } from '@/services'
import { LOCAL_STORAGE } from '@/utils'
import { FC, PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
  type: 'token' | 'public' | 'both'
  fallback?: ReactNode
}

export const Authenticated: FC<Props> = (props) => {
  const { type, children, fallback } = props
  const accessToken = LocalStorageService.instance.get(LOCAL_STORAGE.ACCESS_TOKEN)

  const getConditionalToken = () => {
    if (accessToken) return children
    return fallback
  }

  const getConditionalPublic = () => {
    if (!accessToken) return children
    return fallback
  }

  switch (type) {
    case 'token':
      return getConditionalToken()
    case 'public':
      return getConditionalPublic()
    default:
      return children
  }
}
