import { Button, Popover, TestModal, TestModalPayload } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'

const content = <div>Hover</div>
export const TestPage = () => {
  const handleClick = () => {
    EventManager.emit<TestModalPayload>(EVENT_NAME.TEST_MODAL_OPEN, { content: 'body', title: 'Header' })
  }
  return (
    <div>
      <Button onClick={handleClick}>Click to Open Modal</Button>
      <TestModal />
      <div></div>
      <Popover>
        <Button>Click</Button>
      </Popover>
      <Popover trigger='hover' content={content}>
        <Button>Hover</Button>
      </Popover>
      <Popover trigger='focus'>
        <Button>Focus</Button>
      </Popover>
    </div>
  )
}
