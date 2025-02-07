import { createChat } from '@n8n/chat'
import clsx from 'clsx'
import { FC, PropsWithChildren, useEffect } from 'react'
import { Footer, Header } from '../components'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.aivos.tech/webhook/11ef8a4c-a48f-40b6-aa3d-4caf419cda50/chat',
      initialMessages: ['Chào bạn! 👋', 'Tôi là chat bot hỗ trợ thủ tục. Hôm nay tôi có thể giúp ghì cho bạn?'],
      i18n: {
        en: {
          title: '',
          subtitle: 'Bắt đầu cuộc trò chuyện, chúng tôi sẵn sàng giúp bạn 24/7!',
          footer: '',
          getStarted: 'Bắt đầu',
          inputPlaceholder: 'Nhập tin nhắn...',
          closeButtonTooltip: 'Đóng',
        },
      },
    })
  }, [])
  return (
    <>
      <Header />
      <main className={clsx('mx-auto w-full max-w-screen-xl p-4', 'mt-[73px] min-h-screen')}>{children}</main>
      <Footer />
    </>
  )
}
