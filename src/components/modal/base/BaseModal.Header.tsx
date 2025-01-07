import CloseIcon from '@/assets/svgs/close.svg'
import { Button } from '@/components'
import { FC } from 'react'

type Props = {
  title: string
  onClose: () => void
}
export const BaseModalHeader: FC<Props> = (props) => {
  const { title, onClose } = props
  return (
    <div className='flex justify-between rounded-t-lg bg-white p-4 text-base'>
      <div className='self-center'>{title}</div>
      <Button onClick={onClose} icon={<CloseIcon fontSize={24} />} type='text' shape='circle' />
    </div>
  )
}
