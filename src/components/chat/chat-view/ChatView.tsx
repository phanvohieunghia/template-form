import { ChatViewConversation } from './ChatViewConversation'
import { ChatViewInput } from './ChatViewInput'

export const ChatView = () => {
  return (
    <div className='flex flex-grow flex-col bg-gray-100'>
      <ChatViewConversation />
      <ChatViewInput />
    </div>
  )
}
