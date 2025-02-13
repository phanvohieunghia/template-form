import { useRef } from 'react'
import { ChatViewConversation } from './ChatViewConversation'
import { ChatViewInput } from './ChatViewInput'

export const ChatView = () => {
  const viewConversationRef = useRef<HTMLDivElement>(null)
  return (
    <div className='flex flex-grow flex-col'>
      <ChatViewConversation ref={viewConversationRef} />
      <ChatViewInput />
    </div>
  )
}
