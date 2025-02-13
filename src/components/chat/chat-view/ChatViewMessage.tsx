import LoadingDotsIcon from '@/assets/svgs/loading_dots.svg'
import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Markdown } from './Markdown'

interface Props extends PropsWithChildren {
  me: boolean
  loading?: boolean
  onLoopDone: () => void
}

export const ChatViewMessage: FC<Props> = (props) => {
  const { me = false, children, loading, onLoopDone } = props

  const renderMessage = () => {
    if (me) return <p className='mb-3'>{children}</p>
    else {
      if (loading)
        return (
          <div className='flex'>
            <LoadingDotsIcon fontSize={20} className='mb-3 text-gray-600' />
          </div>
        )
      else return <Markdown onLoopDone={onLoopDone}>{children}</Markdown>
    }
  }

  return (
    <div className={clsx('mb-2 flex items-start gap-2', me && 'justify-end')}>
      <div className='min-h-[36px] max-w-[80%] rounded-lg bg-white px-4 py-2 shadow'>
        <div className='-mb-3 text-sm text-gray-900'>{renderMessage()}</div>
      </div>
    </div>
  )
}
