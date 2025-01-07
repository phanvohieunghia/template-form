import { Button, TestModal, TestModalPayload } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'

export const TestPage = () => {
  const handleClick = () => {
    EventManager.emit<TestModalPayload>(EVENT_NAME.TEST_MODAL_OPEN, { content: 'body', title: 'Header' })
  }
  return (
    <div>
      <Button onClick={handleClick}>Click</Button>
      <TestModal />
    </div>
  )
}
