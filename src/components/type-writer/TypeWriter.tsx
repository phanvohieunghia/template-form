import { FC, PropsWithChildren } from 'react'
import { Typewriter } from 'react-simple-typewriter'

interface Types extends PropsWithChildren {
  words: string[]
}
export const TypeWriter: FC<Types> = (props) => {
  const { words } = props
  return (
    <span className='text font-bold text-green-600'>
      <Typewriter words={words} loop={true} cursor cursorStyle='|' typeSpeed={100} deleteSpeed={30} delaySpeed={1000} />
    </span>
  )
}
