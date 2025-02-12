import { TypeWriter } from '@/components'
import { memo, PropsWithChildren, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Markdown = memo((props: PropsWithChildren) => {
  const { children } = props
  const time = useRef(0)

  if (typeof children !== 'string') {
    console.error('Markdown component expects children to be a string.')
    return null
  }

  const increase = (count: React.MutableRefObject<number>, value: number) => {
    const previousTime = count.current
    count.current = previousTime + value
    return previousTime
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node: _node, children, ...props }) => {
          const child = children as string
          return (
            <p className='mb-3' {...props}>
              <TypeWriter words={[child]} cursor={false} typeSpeed={5} serialRender delaySpeed={increase(time, child.length) * 5 + 20} />
            </p>
          )
        },
        a: ({ node: _node, href, children, ...props }) => {
          const child = children as string
          return (
            <a href={href} target='_blank' className='mb-2 inline-block underline hover:text-green-600 hover:decoration-green-600' {...props}>
              <TypeWriter words={[child]} cursor={false} typeSpeed={5} serialRender delaySpeed={increase(time, child.length) * 5 + 20} />
            </a>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
})
