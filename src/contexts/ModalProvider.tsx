import { ExpertAdviceModal } from '@/components'
import { FC, PropsWithChildren } from 'react'

export const ModalProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <>
      {children}
      <ExpertAdviceModal />
    </>
  )
}
