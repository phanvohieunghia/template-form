import { ErrorBoundary } from '@/pages'
import { FC, PropsWithChildren } from 'react'

export const ErrorProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return <ErrorBoundary>{children}</ErrorBoundary>
}
