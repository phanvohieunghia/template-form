import { ChatPenal, ChatView } from '@/components'

export const ChatPage = () => {
  return (
    <div className='background-chat flex h-[calc(100vh-97px)] overflow-hidden rounded-xl'>
      <ChatPenal />
      <ChatView />
    </div>
  )
}
