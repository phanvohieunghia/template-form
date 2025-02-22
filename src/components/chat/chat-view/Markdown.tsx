import { TypeWriter } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'
import React, { memo, MutableRefObject, PropsWithChildren, ReactNode, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

type Types = PropsWithChildren & {
  onLoopDone?: () => void
  onPopup?: (href: string) => void
}

export const Markdown = memo((props: Types) => {
  const { children, onPopup = () => {}, onLoopDone = () => {} } = props
  const count = useRef(0)

  if (typeof children !== 'string') {
    console.error('Markdown component expects children to be a string.')
    return null
  }

  const replaceStringChildren = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child: ReactNode) => {
      if (typeof child === 'string') {
        if (child.includes('\n')) {
          return null
        }
        return <TypeWriterCommon count={count} text={child} />
      }

      if (React.isValidElement(child) && child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: replaceStringChildren(child.props.children),
        })
      }

      return child
    })
  }

  const TypeWriterCommon = (props: { text: string; count: MutableRefObject<number> }) => {
    const { count, text } = props

    const handleComplete = () => {
      EventManager.emit(EVENT_NAME.TYPING)
      onLoopDone()
    }

    return <TypeWriter currentKey={count.current++} text={text} onComplete={handleComplete} speed={1} />
  }

  return (
    <ReactMarkdown
      components={{
        p: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <p className='mb-2' {...props}>
              <TypeWriterCommon count={count} text={child} />
            </p>
          )
        },
        a: ({ node: _node, href, children, ...props }) => {
          const child = children as string
          const newHref = href as string
          return (
            <a
              href={newHref}
              target={newHref.includes('csdl.dichvucong.gov.vn') ? '_self' : '_blank'}
              className='mb-2 inline-block underline hover:text-green-600 hover:decoration-green-600'
              {...props}
              onClick={() => onPopup(newHref)}
            >
              {child}
            </a>
          )
        },
        ul: ({ node: _node, ...props }) => <ul className='pl-10' {...props} />,
        ol: ({ node: _node, ...props }) => <ol className='pl-10' {...props} />,
        span: ({ node: _node, ...props }) => <span {...props} />,

        li: ({ node: _node, children, ...props }) => {
          return <li {...props}>{replaceStringChildren(children)}</li>
        },
        strong: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <strong {...props}>
              <TypeWriterCommon count={count} text={child} />
            </strong>
          )
        },
        h3: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <h3 {...props} className='mb-2 text-base font-semibold'>
              <TypeWriterCommon count={count} text={child} />
            </h3>
          )
        },
        h4: ({ node: _node, children, ...props }) => {
          const child = children as string

          if (typeof child !== 'string') return children
          return (
            <h4 {...props} className='mb-2 text-base font-semibold'>
              <TypeWriterCommon count={count} text={child} />
            </h4>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
})
