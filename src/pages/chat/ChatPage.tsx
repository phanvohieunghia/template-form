import { ChatPenal, ChatView } from '@/components'

export const ChatPage = () => {
  return (
    <div className='flex h-[calc(100vh-97px-16px)]'>
      <ChatPenal />
      <ChatView />
    </div>
  )
}
