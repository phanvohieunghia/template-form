import { FC, PropsWithChildren } from 'react'

export const BaseModalBody: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return <main className='bg-white p-4'>{children}</main>
}
