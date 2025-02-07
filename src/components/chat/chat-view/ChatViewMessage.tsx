import { Avatar } from '@/components'
import { formatMessageTime } from '@/utils'
import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  me?: boolean
  time: string
  isAvatar: boolean
}

export const ChatViewMessage: FC<Props> = (props) => {
  const { me = false, children, time, isAvatar = true } = props
  return (
    <div className={clsx('mb-1 flex items-start gap-2', me && 'justify-end')}>
      {!me && isAvatar ? <Avatar size={40}>N</Avatar> : <div className='w-[40px]'></div>}
      <div className='rounded-lg bg-white px-4 py-2 shadow'>
        <div className='mb-2 text-sm text-gray-900'>{children}</div>
        <div className='text-xs text-gray-500'>{formatMessageTime(time)}</div>
      </div>
    </div>
  )
}
