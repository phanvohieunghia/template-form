import { TypeWriter } from '@/components/type-writer'
import { memo, PropsWithChildren, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

export const Markdown = memo((props: PropsWithChildren & { onLoopDone?: () => void }) => {
  const { children, onLoopDone } = props
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
      components={{
        p: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <p className='mb-2' {...props}>
              <TypeWriter
                words={[child]}
                cursor={false}
                typeSpeed={5}
                serialRender
                delaySpeed={increase(time, child.length) * 5 + 20}
                onLoopDone={onLoopDone}
              />
            </p>
          )
        },
        a: ({ node: _node, href, children, ...props }) => {
          const child = children as string
          return (
            <a href={href} target='_blank' className='mb-2 inline-block underline hover:text-green-600 hover:decoration-green-600' {...props}>
              <TypeWriter
                words={[child]}
                cursor={false}
                typeSpeed={5}
                serialRender
                delaySpeed={increase(time, child.length) * 5 + 20}
                onLoopDone={onLoopDone}
              />
            </a>
          )
        },
        ul: ({ node: _node, ...props }) => <ul className='pl-10' {...props} />,
        ol: ({ node: _node, ...props }) => <ol className='pl-10' {...props} />,
        span: ({ node: _node, ...props }) => <span className='' {...props} />,

        li: ({ node: _node, children, ...props }) => {
          return (
            <li {...props}>
              {Array.isArray(children)
                ? children.map((item) => {
                    if (typeof item === 'string')
                      return (
                        <TypeWriter
                          words={[item]}
                          cursor={false}
                          typeSpeed={5}
                          serialRender
                          delaySpeed={increase(time, item.length) * 5 + 20}
                          onLoopDone={onLoopDone}
                        />
                      )
                    else {
                      return <>{item}</>
                    }
                  })
                : children}
            </li>
          )
        },
        strong: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <strong {...props}>
              <TypeWriter
                words={[child]}
                cursor={false}
                typeSpeed={5}
                serialRender
                delaySpeed={increase(time, child.length) * 5 + 20}
                onLoopDone={onLoopDone}
              />
            </strong>
          )
        },
        h3: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <h3 {...props} className='mb-2 text-base font-semibold'>
              <TypeWriter
                words={[child]}
                cursor={false}
                typeSpeed={5}
                serialRender
                delaySpeed={increase(time, child.length) * 5 + 20}
                onLoopDone={onLoopDone}
              />
            </h3>
          )
        },
        h4: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <h4 {...props} className='mb-2 text-base font-semibold'>
              <TypeWriter
                words={[child]}
                cursor={false}
                typeSpeed={5}
                serialRender
                delaySpeed={increase(time, child.length) * 5 + 20}
                onLoopDone={onLoopDone}
              />
            </h4>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
})
