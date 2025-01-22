import React, { Dispatch, SetStateAction, useState } from 'react'

interface PanelProps {
  title: string
  content: string
}
const items = [
  {
    title: 'This is panel header 1',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
  },
  {
    title: 'This is panel header 2',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
  },
  {
    title: 'This is panel header 3',
    content:
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
  },
]

type ItemProps = Pick<State, 'content' | 'title'> & {
  index: number
  open: boolean
  onOpen: Dispatch<SetStateAction<State[]>>
}

const Items = (props: ItemProps) => {
  const { title, content, open: isOpen, onOpen, index } = props

  return (
    <div className='mb-2 rounded-lg border border-gray-300'>
      <button
        onClick={() => onOpen((prev) => ({ ...prev, isOpen: !prev[index].isOpen }))}
        className='flex w-full items-center justify-between px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && <div className='border-t border-gray-300 px-4 py-2 text-gray-700'>{content}</div>}
    </div>
  )
}
type State = {
  title: string
  content: string
  isOpen: boolean
}

export const Collapse: React.FC = () => {
  const [state, setState] = useState<State[]>(items.map((item) => ({ ...item, isOpen: false })))

  return (
    <div className='mx-auto mt-10 max-w-md'>
      {items.map((item, index) => (
        <Items title={item.title} content={item.content} open={state[index].isOpen} onOpen={setState} index={index} />
      ))}
    </div>
  )
}

export default Collapse
