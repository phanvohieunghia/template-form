import { Button, Collapse, Pagination, Popover, Select, TestModal, TestModalPayload, Tooltip } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'

const content = <div>Hover</div>
const TestPage = () => {
  const handleClick = () => {
    EventManager.emit<TestModalPayload>(EVENT_NAME.TEST_MODAL_OPEN, { content: 'body', title: 'Header' })
  }

  const testChange = () => {
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
      <Popover content={content}>
        <Button>Click</Button>
      </Popover>
      <Popover trigger='hover' content={content}>
        <Button>Hover</Button>
      </Popover>
      <Popover trigger='focus' content={content}>
        <Button>Focus</Button>
      </Popover>
      <div>
        <Popover content={content} placement='bottom'>
          <Button>Bottom</Button>
        </Popover>

        <Popover content={content} placement='bottomLeft'>
          <Button>Bottom Left</Button>
        </Popover>

        <Popover content={content} placement='bottomRight'>
          <Button>Bottom Right</Button>
        </Popover>

        <Popover content={content} placement='top'>
          <Button>Top</Button>
        </Popover>

        <Popover content={content} placement='topLeft'>
          <Button>Top Left</Button>
        </Popover>

        <Popover content={content} placement='topRight'>
          <Button>Top Right</Button>
        </Popover>
      </div>

      {/* <Select defaultValue={'1'} onChange={testChange} options={data} style={{ width: '15%' }} /> */}
      <Select
        defaultValue={'1'}
        placeholder='Select some options'
        mode='multiple'
        onChange={testChange}
        options={data.map((item, index) => ({ ...item, label: '1'.repeat(index + 1) }))}
        style={{ width: '30%' }}
      />
      <div className='flex w-[150%] justify-between'>
        <Tooltip title='left tooltip will be show'>
          <Button>Hello</Button>
        </Tooltip>
        <Tooltip title='tooltip'>
          <Button>Hello</Button>
        </Tooltip>
        <Tooltip title='right tooltip will be show'>
          <Button>Hello</Button>
        </Tooltip>
      </div>
      <div className='flex w-[150%] justify-between'>
        <Tooltip arrow title='left tooltip will be show'>
          <Button>Hello</Button>
        </Tooltip>
        <Tooltip arrow title='tooltip'>
          <Button>Hello</Button>
        </Tooltip>
        <Tooltip arrow title='right tooltip will be show'>
          <Button>Hello</Button>
        </Tooltip>
      </div>
      <div className='flex justify-center p-4'>
        <Pagination total={40} />
      </div>
      <div className='flex justify-center p-4'>
        <Pagination total={100} />
      </div>
      <div className='flex justify-center p-4'>
        <Pagination total={95} />
      </div>
      <div className='flex justify-center p-4'>
        <Pagination total={500} />
      </div>
      {/* <Collapse /> */}
      <div className='mx-auto max-w-xl p-4'>
        <Collapse
          items={[
            {
              key: '1',
              header: 'First Item',
              content: 'Content for first item',
            },
            {
              key: '2',
              header: 'Second Item',
              content: 'Content for second item',
            },
          ]}
          accordion
          defaultActiveKey={['1']}
        />
      </div>
      {/* <ExampleTable /> */}
    </>
  )
}
export default TestPage
