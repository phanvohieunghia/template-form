import clsx from 'clsx'
import { FC, HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const BaseModalBody: FC<Props> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <main className={clsx('bg-white p-4', className)} {...restProps}>
      {children}
    </main>
  )
}
