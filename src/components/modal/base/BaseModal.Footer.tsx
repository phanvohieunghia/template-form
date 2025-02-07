import clsx from 'clsx'
import { FC, HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const BaseModalFooter: FC<Props> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <div className={clsx('footer rounded-b-lg bg-white p-4', className)} {...restProps}>
      {children}
    </div>
  )
}
