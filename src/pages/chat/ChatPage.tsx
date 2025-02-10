import { ChatPenal, ChatView } from '@/components'

export const ChatPage = () => {
  return (
    <div className='flex h-full bg-red-400'>
      <ChatPenal />
      <ChatView />
    </div>
  )
}
