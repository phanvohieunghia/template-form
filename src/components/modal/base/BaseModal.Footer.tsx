import { FC, PropsWithChildren } from 'react'

export const BaseModalFooter: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return <div className='rounded-b-lg bg-white p-4'>{children}</div>
}
