import '@n8n/chat/style.css'
import { ConfigProvider } from './contexts'
import { BaseRoutes } from './routes'
import './styles'

function App() {
  return (
    <ConfigProvider>
      <BaseRoutes />
    </ConfigProvider>
  )
}

export default App
