import { LocalStorageService } from '@/services'
import { PropsWithChildren } from 'react'

export const TempProvider = (props: PropsWithChildren) => {
  const { children } = props

  LocalStorageService.instance.set('test', 'laisefsioefisefojisfoisfejo')

  return <>{children}</>
}
