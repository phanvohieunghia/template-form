import { useAppSelector } from '@/hooks'
import { ChatViewMessage } from './ChatViewMessage'

export const ChatViewConversation = () => {
  const messages = useAppSelector((state) => state.chat.messages)
  console.log(messages)

  return (
    <div className='scrollbar-thin flex flex-1 flex-col-reverse overflow-auto p-2'>
      {messages &&
        messages.map((item, index) => {
          return (
            <ChatViewMessage me={item.userType === 'me'} key={index}>
              {item.text}
            </ChatViewMessage>
          )
        })}
    </div>
  )
}
