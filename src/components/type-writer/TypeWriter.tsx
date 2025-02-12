import { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { Typewriter } from 'react-simple-typewriter'

interface Types extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  words: string[]
  typeSpeed: number
  cursor?: boolean
  loop?: boolean | number
  serialRender?: boolean
  delaySpeed?: number
}

export const TypeWriter: FC<Types> = (props) => {
  const { words, cursor = false, loop = 1, typeSpeed, serialRender = false, delaySpeed = 2000, ...restProps } = props

  return (
    <span {...restProps}>
      <Typewriter
        words={serialRender ? ['', ...words] : words}
        loop={loop}
        cursor={cursor}
        cursorStyle='|'
        typeSpeed={typeSpeed}
        deleteSpeed={30}
        delaySpeed={delaySpeed}
      />
    </span>
  )
}
