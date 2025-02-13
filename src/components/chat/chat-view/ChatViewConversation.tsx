import logoSrc from '@/assets/images/logo.png'
import { appConfig } from '@/configs'
import { useAppSelector } from '@/hooks'
import React, { forwardRef, useCallback } from 'react'
import { ChatViewMessage } from './ChatViewMessage'

export const ChatViewConversation = forwardRef<HTMLDivElement>((_, ref) => {
  const messages2 = useAppSelector((state) => state.chat.messages)
  const messages = [
    {
      userType: 'me',
      text: 'ly hôn',
    },
    {
      userType: 'bot',
      text: 'Tôi rất tiếc nhưng tôi không thể hỗ trợ bạn về vấn đề đó. Nếu bạn có thắc mắc liên quan đến luật pháp Việt Nam, hãy cho tôi biết!',
      loading: false,
    },
    {
      userType: 'me',
      text: 'ly dị',
    },
    {
      userType: 'bot',
      text: 'Tìm thấy một thủ tục liên quan đến ly dị. Dưới đây là danh sách:\n\n1. [Thủ tục công nhận bảo vật quốc gia đối với bảo tàng cấp tỉnh, ban hoặc trung tâm quản lý di tích](https://aibieumau.com/tim-kiem/-i.cm5ulpfki015zu58k7atph2we)\n\nXin vui lòng chọn một thủ tục bằng cách nhập số thứ tự tương ứng.',
    },
    ...messages2,
  ]

  const handleLoopDone = useCallback(() => {
    const divRef = ref as unknown as React.MutableRefObject<HTMLDivElement>
    if (divRef && divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [])

  return (
    <div className='scrollbar-thin flex-1 overflow-auto p-2' ref={ref}>
      <div className='h-full'>
        {messages.length !== 0 ? (
          messages.map((item, index) => {
            return (
              <ChatViewMessage me={item.userType === 'me'} key={index} loading={item.loading} onLoopDone={handleLoopDone}>
                {item.text as string}
              </ChatViewMessage>
            )
          })
        ) : (
          <div className='flex h-full flex-col content-center items-center justify-center text-center text-3xl font-bold text-gray-600'>
            <img src={logoSrc} alt='logo error' width={100} className='mb-3 inline-block' />
            {appConfig.title} có thể hỗ trợ gì <div className='mt-1'>cho bạn?</div>
          </div>
        )}
      </div>
    </div>
  )
})
