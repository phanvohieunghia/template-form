import clsx from 'clsx'
import { useEffect, useState } from 'react'

export type TabProps = {
  defaultActiveKey?: string
  items: ItemProps[]
  onChange?: () => void
}

type ItemProps = {
  key: string
  label: string
  children: JSX.Element
}

export const Tab = (props: TabProps) => {
  const { defaultActiveKey, items } = props
  const [activeKey, setActiveKey] = useState<string>(defaultActiveKey ?? items[0]?.key ?? '')

  const handleTabClick = (key: string) => {
    setActiveKey(items.find((item) => item.key === key)?.key ?? defaultActiveKey ?? items[0]?.key)
  }

  useEffect(() => {
    if (items.length > 0) setActiveKey(items[0].key)
  }, [items])

  if (items.length === 0) return
  return (
    <>
      <span className='text-md mb-3 inline-flex rounded-3xl border-[1px] font-semibold'>
        {items.map((item, index) => (
          <span
            key={index}
            className={clsx('rounded-3xl px-3 py-1 transition-colors hover:cursor-pointer', activeKey === item.key && 'bg-gray-300')}
            onClick={() => handleTabClick(item.key)}
          >
            {item.label}
          </span>
        ))}
      </span>

      <div className='tab-content'>{items.find((item) => item.key === activeKey)?.children ?? items[0].children}</div>
    </>
  )
}
