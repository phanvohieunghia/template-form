import data from '@/assets/mock-data/pages/chat/messages.json'
import { Avatar } from '@/components'
import { formatRemainingTime } from '@/utils'
import clsx from 'clsx'
import { MomentInput } from 'moment'

export const ChatPenal = () => {
  return (
    <div className='scrollbar-thin h-screen w-[300px] overflow-auto bg-stone-200'>
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className={clsx('flex p-2 transition-colors duration-300 hover:cursor-pointer hover:bg-stone-400', '1' === item.id && 'bg-stone-300')}
          >
            <Avatar size={40} shape='square'>
              T
            </Avatar>
            <div className='flex flex-grow flex-col justify-between pl-4'>
              <div className='flex justify-between text-sm'>
                <span>Test</span>
                <span className='text-xs text-gray-600'>{formatRemainingTime(Date.now() as MomentInput)}</span>
              </div>
              <div className='text-xs text-gray-500'>Last message</div>
            </div>
          </div>
        ))}
    </div>
  )
}
