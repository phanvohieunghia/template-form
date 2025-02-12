import { ChatPenal, ChatView } from '@/components'

export const ChatPage = () => {
  return (
    <div className='background-chat flex overflow-hidden rounded-xl'>
      <ChatPenal />
      <ChatView />
    </div>
  )
}
