import PlusIcon from '@/assets/svgs/plus.svg'
import { Button } from '@/components'
import { ChatService } from '@/stores'

export const ChatPenal = () => {
  const createNewChat = () => {
    ChatService.instance.clearAllMessages()
  }

  return (
    <div className='scrollbar-thin h-full min-w-[250px] max-w-[250px] overflow-auto bg-slate-100'>
      <div className='py-2 text-center'>
        <Button icon={<PlusIcon fontSize={20} />} onClick={createNewChat} type='primary' className='button-primary'>
          Cuộc trò chuyện mới
        </Button>
      </div>
      {/* {data &&
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
        ))} */}
    </div>
  )
}
