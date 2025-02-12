import { ChatViewConversation } from './ChatViewConversation'
import { ChatViewInput } from './ChatViewInput'

export const ChatView = () => {
  return (
    <div className='flex flex-grow flex-col'>
      <ChatViewConversation />
      <ChatViewInput />
    </div>
  )
}
