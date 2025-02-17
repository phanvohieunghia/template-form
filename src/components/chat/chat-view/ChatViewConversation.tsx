import logoSrc from '@/assets/images/logo.png'
import { ExpertAdviceModalPayload } from '@/components/modal'
import { appConfig } from '@/configs'
import { useAppSelector } from '@/hooks'
import { EVENT_NAME, EventManager, ROUTE_NAME } from '@/utils'
import React, { forwardRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatViewMessage } from './ChatViewMessage'

export const ChatViewConversation = forwardRef<HTMLDivElement>((_, ref) => {
  const messages = useAppSelector((state) => state.chat.messages)
  const navigate = useNavigate()

  const handleLoopDone = useCallback(() => {
    const divRef = ref as unknown as React.MutableRefObject<HTMLDivElement>
    if (divRef && divRef.current) {
      if (divRef.current.scrollHeight - (divRef.current.scrollTop + divRef.current.offsetHeight) < 60)
        divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [])

  const openExpertPopup = useCallback((href: string) => {
    if (href.includes('csdl.dichvucong.gov.vn')) {
      const localStyle = 'font-semibold text-green-600'
      EventManager.emit<ExpertAdviceModalPayload>(EVENT_NAME.EXPERT_ADVICE.OPEN, {
        title: 'Chuyên gia tư vấn',
        content: (
          <>
            Chúng tôi muốn <span className={localStyle}>chắc chắn</span> rằng bạn sẽ có được những lời khuyên chuyên môn nhất. Vì vậy, tôi xin phép
            gợi ý một số <span className={localStyle}>chuyên gia</span> có <span className={localStyle}>kiến thức chuyên sâu</span> để hỗ trợ bạn trực
            tiếp.
          </>
        ),
        onConfirm: () => {
          navigate(ROUTE_NAME.EXPERT_)
        },
      })
    }
  }, [])

  return (
    <div className='scrollbar-thin mb-2 flex-1 overflow-auto p-2' ref={ref} style={{ overscrollBehavior: 'contain' }}>
      <div className='h-full'>
        {messages.length !== 0 ? (
          messages.map((item, index) => {
            return (
              <ChatViewMessage me={item.userType === 'me'} key={index} loading={item.loading} onLoopDone={handleLoopDone} onPopup={openExpertPopup}>
                {item.text as string}
              </ChatViewMessage>
            )
          })
        ) : (
          <div className='flex h-full flex-col content-center items-center justify-center text-center text-lg font-bold text-gray-600 md:text-2xl lg:text-3xl'>
            <img src={logoSrc} alt='logo error' width={100} className='mb-3 inline-block' />
            {appConfig.title} có thể hỗ trợ gì <div className='mt-1'>cho bạn?</div>
          </div>
        )}
      </div>
    </div>
  )
})
