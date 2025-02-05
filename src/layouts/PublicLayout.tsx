import { PropsWithChildren } from 'react'

export const PublicLayout = (props: PropsWithChildren) => {
  const { children } = props
  return <>{children}</>
}
