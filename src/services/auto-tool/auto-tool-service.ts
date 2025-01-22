import { Key } from '@/interfaces'

type SelectorsType = {
  className?: string | string[]
  tagName?: string
  id?: string
}
export class AutoClickService {
  private static _instance: AutoClickService
  private pressedKeys: Set<Key> = new Set()
  private handlerQueue: (() => void)[] = []
  private constructor() {}

  public static get instance(): AutoClickService {
    if (!AutoClickService._instance) {
      AutoClickService._instance = new AutoClickService()
    }
    return AutoClickService._instance
  }

  public press(keys: Key[]): this {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key
      const typedKey = /^\d$/.test(key) ? Number(key) : key
      this.pressedKeys.add(typedKey as Key)
    }

    const handleKeyUp = async (event: KeyboardEvent) => {
      const allKeysPressed = keys.every((key) => this.pressedKeys.has(key))
      if (allKeysPressed) {
        for (const fn of this.handlerQueue) {
          await fn()
        }
      }

      const key = event.key
      const typedKey = /^\d$/.test(key) ? Number(key) : key
      this.pressedKeys.delete(typedKey as Key)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return this
  }

  /**
   * Clicks an element specified by its class string. Can optionally delay the click.
   * @param classString - The class string of the target element.
   * @param delayTime - Optional delay time in milliseconds.
   * @returns this - For method chaining.
   */
  public click(classString: SelectorsType, delayTime: number = 500): this {
    const init = async () => {
      const domString = this.selectorsToDomString(classString)
      await this.delay(delayTime)
      console.log(domString)
      console.log('click', document.querySelector(domString))
      ;(document.querySelector(domString) as HTMLElement)?.click()
    }
    this.handlerQueue.push(init)
    return this
  }

  public input(classString: SelectorsType, value: string, delayTime: number = 500, typingSpeed?: number): this {
    const init = async () => {
      const domString = this.selectorsToDomString(classString)
      await this.delay(delayTime)
      const inputElement = document.querySelector(domString) as HTMLInputElement

      if (inputElement) {
        if (value) {
          let current = 0
          const writeText = async () => {
            if (current < value.length) {
              inputElement.value += value[current]
              console.log(value[current])
              current++
              await this.delay(typingSpeed || 10)
              writeText()
            }
          }

          await writeText()
        }
      }
    }
    this.handlerQueue.push(init)

    return this
  }

  private selectorsToDomString(selectorsObject: SelectorsType): string {
    const transferClassName = (className: SelectorsType['className']): string => {
      if (className === undefined) return ''
      const classString = Array.isArray(className) ? className.join('#') : className
      return classString
        .replace(/(:|!|\[|\]|,)/g, '\\$1')
        .split(' ')
        .map((item) => `.${item}`)
        .join('')
        .replace(/#/g, ' ')
    }

    const idString = selectorsObject.id ? `#${selectorsObject.id}` : ''
    const tagNameString = selectorsObject.tagName ? selectorsObject.tagName : ''
    return tagNameString + idString + transferClassName(selectorsObject.className)
  }

  /**
   * Utility method for delaying execution using Promise.
   * @param ms - Number of milliseconds to delay.
   * @returns Promise<void> - Resolves after the specified delay.
   */
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
