import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  me: boolean
}

export const ChatViewMessage: FC<Props> = (props) => {
  const { me = false, children } = props
  return (
    <div className={clsx('mb-1 flex items-start gap-2', me && 'justify-end')}>
      <div className='max-w-[80%] rounded-lg bg-white px-4 py-2 shadow'>
        <div className='mb-2 text-sm text-gray-900'>{children}</div>
      </div>
    </div>
  )
}
