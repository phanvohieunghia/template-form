import { Button, Popover, Select, TestModal, TestModalPayload } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'

const content = <div>Hover</div>
export const TestPage = () => {
  const handleClick = () => {
    EventManager.emit<TestModalPayload>(EVENT_NAME.TEST_MODAL_OPEN, { content: 'body', title: 'Header' })
  }

  const testChange = (data: unknown) => {
    // console.log(data)
  }

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
    { label: 'Option 6', value: '6' },
    { label: 'Option 7', value: '7' },
    { label: 'Option 8', value: '8' },
    { label: 'Option 9', value: '9' },
    { label: 'Option 10', value: '10' },
    { label: 'Option 11', value: '11' },
    { label: 'Option 12', value: '12' },
    { label: 'Option 13', value: '13' },
    { label: 'Option 14', value: '14' },
    { label: 'Option 15', value: '15' },
    { label: 'Option 16', value: '16' },
    { label: 'Option 17', value: '17' },
    { label: 'Option 18', value: '18' },
    { label: 'Option 19', value: '19' },
    { label: 'Option 20', value: '20' },
  ]

  return (
    <>
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

      {/* <Select defaultValue={'1'} onChange={testChange} options={data} style={{ width: '15%' }} /> */}
      <Select
        defaultValue={'1'}
        placeholder='Select some options'
        mode='multiple'
        onChange={testChange}
        options={data.map((item, index) => ({ ...item, label: '1'.repeat(index + 1) }))}
        style={{ width: '30%' }}
      />
    </>
  )
}
