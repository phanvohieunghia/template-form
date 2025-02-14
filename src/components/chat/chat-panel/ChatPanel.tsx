import BookIcon from '@/assets/svgs/book.svg'
import BookQuestionIcon from '@/assets/svgs/book_question.svg'
import LegalIcon from '@/assets/svgs/legal_icon.svg'
import PlusIcon from '@/assets/svgs/plus.svg'
import TagNewIcon from '@/assets/svgs/tag_new.svg'
import VectorDotIcon from '@/assets/svgs/vector_dot.svg'
import { Button } from '@/components'
import { ChatService } from '@/stores'
import { ROUTE_NAME } from '@/utils'

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
        <Button icon={<BookIcon fontSize={36} />} type='link' href={ROUTE_NAME.RESEARCH_} className='chat-panel-button-1'>
          Tra Cứu Văn Bản
          <TagNewIcon width={56} height={20} />
        </Button>
        <Button icon={<VectorDotIcon fontSize={36} />} type='link' href='' className='chat-panel-button-1'>
          Thủ tục hành chính
          <TagNewIcon width={56} height={20} />
        </Button>
        <Button icon={<LegalIcon fontSize={26} />} type='link' href='' className='chat-panel-button-1'>
          Tin tức
        </Button>
        <Button icon={<BookQuestionIcon fontSize={36} />} type='link' href='' className='chat-panel-button-1'>
          Hỗ trợ
        </Button>
      </div>
    </div>
  )
}
