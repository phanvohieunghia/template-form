import BookIcon from '@/assets/svgs/book.svg'
import BookQuestionIcon from '@/assets/svgs/book_question.svg'
import LegalIcon from '@/assets/svgs/legal_icon.svg'
import PlusIcon from '@/assets/svgs/plus.svg'
import TagNewIcon from '@/assets/svgs/tag_new.svg'
import VectorDotIcon from '@/assets/svgs/vector_dot.svg'
import { Button } from '@/components'
import { ChatService } from '@/stores'

export const ChatPenal = () => {
  const createNewChat = () => {
    ChatService.instance.clearAllMessages()
  }

  return (
    <div className='scrollbar-thin h-full min-w-[250px] max-w-[300px] overflow-auto rounded-lg bg-white'>
      <div className='py-2 text-center'>
        <Button icon={<PlusIcon fontSize={20} />} onClick={createNewChat} type='primary' className='button-primary-2 mx-auto'>
          Cuộc trò chuyện mới
        </Button>
        <Button icon={<BookIcon fontSize={36} />} type='link' href='' className='chat-panel-button-1'>
          Văn bản Pháp Luật
          <TagNewIcon fontSize={56} />
        </Button>
        <Button icon={<LegalIcon fontSize={26} />} type='link' href='' className='chat-panel-button-1 py-2 ps-4 hover:!bg-white'>
          Tra cứu Văn bản
        </Button>
        <Button icon={<VectorDotIcon fontSize={36} />} type='link' href='' className='chat-panel-button-1'>
          Thủ tục hành chính
          <TagNewIcon fontSize={56} />
        </Button>
        <Button icon={<BookQuestionIcon fontSize={36} />} type='link' href='' className='chat-panel-button-1 hover:!bg-white'>
          Hỗ trợ
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
