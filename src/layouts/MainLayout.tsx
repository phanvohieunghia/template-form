import { ROUTE_NAME } from '@/utils'
// import { createChat } from '@n8n/chat'
import clsx from 'clsx'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components'

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

  const renderClass = () => {
    const s = pathname
    if (s.includes(ROUTE_NAME.LOGIN_) || s.includes(ROUTE_NAME.REGISTER_) || s.includes(ROUTE_NAME.FORGOT_PASSWORD_)) {
      return 'flex items-center justify-center'
    }
  }

  return (
    <>
      <Header />
      <main
        className={clsx(
          'mx-auto w-full p-2 pt-[calc(61px+8px)] lg:p-4 lg:pt-[calc(81px+16px)]',
          pathname === ROUTE_NAME.HOME ? 'background-chat h-dvh' : 'h-screen max-w-screen-lg',
          renderClass(),
        )}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </>
  )
}
