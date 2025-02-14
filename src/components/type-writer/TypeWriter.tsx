import { EVENT_NAME, EventManager } from '@/utils'
import { useCallback, useEffect, useState } from 'react'

type PropsType = {
  text: string
  onComplete: () => void
  speed: number
  currentKey: number
  each?: 'word' | 'character'
}

export const TypeWriter = (props: PropsType) => {
  const { text, onComplete, speed = 100, currentKey, each = 'character' } = props
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')

  const handleComplete = useCallback(() => {
    setIndex((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (index !== currentKey) return
    let currentIndex = 0
    const textList = text.split(each === 'character' ? '' : ' ')
    setDisplayText('')

    const timer = setInterval(() => {
      setDisplayText(textList.slice(0, currentIndex + 1).join(each === 'character' ? '' : ' '))
      currentIndex++

      if (currentIndex === text.length) {
        clearInterval(timer)
        onComplete()
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed, onComplete, index])

  useEffect(() => {
    EventManager.on(EVENT_NAME.TYPING, handleComplete)
    return () => {
      EventManager.off(EVENT_NAME.TYPING, handleComplete)
    }
  }, [])

  return <span>{displayText}</span>
}
