import { ROUTE_NAME } from '@/utils'
// import { createChat } from '@n8n/chat'
import clsx from 'clsx'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Footer, Header } from '../components'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const { pathname } = useLocation()
  useEffect(() => {
    // createChat({
    //   webhookUrl: 'https://n8n.aivos.tech/webhook/11ef8a4c-a48f-40b6-aa3d-4caf419cda50/chat',
    //   initialMessages: ['Chào bạn! 👋', 'Tôi là chat bot hỗ trợ thủ tục. Hôm nay tôi có thể giúp ghì cho bạn?'],
    //   i18n: {
    //     en: {
    //       title: '',
    //       subtitle: 'Bắt đầu cuộc trò chuyện, chúng tôi sẵn sàng giúp bạn 24/7!',
    //       footer: '',
    //       getStarted: 'Bắt đầu',
    //       inputPlaceholder: 'Nhập tin nhắn...',
    //       closeButtonTooltip: 'Đóng',
    //     },
    //   },
    // })
  }, [])

  return (
    <>
      <Header />
      <main
        className={clsx(
          'background-chat mx-auto w-full p-4 pt-[calc(81px+16px)]',
          pathname.includes(ROUTE_NAME.HOME) ? 'min-h-screen' : 'h-screen max-w-screen-xl',
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
