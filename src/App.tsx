import { createChat } from '@n8n/chat'
import '@n8n/chat/style.css'
import { useEffect } from 'react'
import { appConfig } from './configs'
import { ConfigProvider } from './contexts'
import { BaseRoutes } from './routes'
import './styles'

function App() {
  document.title = appConfig.title

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
    <ConfigProvider>
      <BaseRoutes />
    </ConfigProvider>
  )
}

export default App
