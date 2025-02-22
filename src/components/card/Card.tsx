import clsx from 'clsx'
import { HTMLAttributes, PropsWithChildren } from 'react'

type Props = {
  title?: string
  data?: unknown
} & PropsWithChildren &
  HTMLAttributes<HTMLDivElement>

export const Card = (props: Props) => {
  const { title, children, className, ...restProps } = props

  return (
    <div className={clsx('overflow-hidden rounded-2xl border-[1px] border-gray-200 bg-white', className)} {...restProps}>
      {title && <div className='p-5 pb-0 text-2xl font-semibold text-gray-600'>{title}</div>}
      <div className='p-5'>{children}</div>
    </div>
  )
}
