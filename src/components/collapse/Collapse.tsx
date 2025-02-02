import ChevronDownIcon from '@/assets/svgs/chevron_down.svg'
import clsx from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'
interface CollapseProps {
  items: ItemProps[]
  accordion?: boolean
  defaultActiveKey?: string[]
  onChange?: (activeKeys: string[]) => void
}

type ItemProps = {
  header: React.ReactNode
  content: React.ReactNode
  key: string
}

export const Collapse: FC<CollapseProps> = (props) => {
  const { items, accordion = false, defaultActiveKey = [], onChange } = props
  const [activeKeys, setActiveKeys] = useState<string[]>(defaultActiveKey)
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleToggle = (key: string) => {
    let newActiveKeys: string[]
    if (accordion) {
      newActiveKeys = activeKeys.includes(key) ? [] : [key]
    } else {
      newActiveKeys = activeKeys.includes(key) ? activeKeys.filter((k) => k !== key) : [...activeKeys, key]
    }
    setActiveKeys(newActiveKeys)
    onChange?.(newActiveKeys)
  }

  useEffect(() => {
    items.forEach((item) => {
      const contentEl = contentRefs.current[item.key]
      if (contentEl) {
        contentEl.style.maxHeight = activeKeys.includes(item.key) ? `${contentEl.scrollHeight}px` : '0'
      }
    })
  }, [activeKeys, items])

  return (
    <div className='w-full overflow-hidden rounded-lg border'>
      {items.map((item) => (
        <div key={item.key} className='border-b'>
          {/* Header */}
          <div
            role='button'
            className='flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-gray-50'
            onClick={() => handleToggle(item.key)}
          >
            <div className='font-medium'>{item.header}</div>

            <ChevronDownIcon className={clsx('h-4 w-4 transform transition-transform', activeKeys.includes(item.key) ? 'rotate-180' : '')} />
          </div>

          {/* Content */}
          <div
            ref={(el) => (contentRefs.current[item.key] = el)}
            className='overflow-hidden transition-all duration-300 ease-in-out'
            style={{ maxHeight: '0' }}
          >
            <div className='p-4'>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
