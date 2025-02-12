import { appConfig } from '@/configs'
import { useAppSelector } from '@/hooks'
import { ChatViewMessage } from './ChatViewMessage'

export const ChatViewConversation = () => {
  const messages = useAppSelector((state) => state.chat.messages)
  // const x = { text: 'hello', userType: 'me' }
  // const messages = [...messages2, ...Array(50).fill(x)]
  // console.log(messages)
  return (
    <div className='flex max-h-screen flex-1 flex-col justify-end overflow-auto p-2'>
      {messages.length !== 0 ? (
        messages.map((item, index) => {
          return (
            <ChatViewMessage me={item.userType === 'me'} key={index} loading={item.loading}>
              {item.text}
            </ChatViewMessage>
          )
        })
      ) : (
        <div className='h-full content-center text-center text-3xl font-bold text-gray-600'>
          {appConfig.title} có thể hỗ trợ gì <div className='mt-1'>cho bạn?</div>
        </div>
      )}
    </div>
  )
}
