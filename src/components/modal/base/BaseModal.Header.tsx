import CloseIcon from '@/assets/svgs/close.svg'
import { Button } from '@/components'
import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'

type Props = {
  title: string
  onClose: () => void
} & HTMLAttributes<HTMLDivElement>

export const BaseModalHeader: FC<Props> = (props) => {
  const { title, onClose, className, ...restProps } = props
  return (
    <div className={clsx('flex justify-between rounded-t-lg bg-white p-4 text-base', className)} {...restProps}>
      <div className='self-center'>{title}</div>
      <Button onClick={onClose} icon={<CloseIcon fontSize={24} />} type='text' shape='circle' />
    </div>
  )
}
