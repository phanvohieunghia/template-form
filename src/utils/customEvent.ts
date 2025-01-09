type EventHandler<T> = (params: CustomEvent<T>) => void

const events: { [key: string]: EventListener[] } = {}

const on = <T>(eventName: string, handler: EventHandler<T>): void => {
  if (!events[eventName]) {
    events[eventName] = []
  }
  events[eventName].push(handler as EventListener)
  window.addEventListener(eventName, handler as EventListener)
}

const off = <T>(eventName: string, handler: EventHandler<T>): void => {
  if (!events[eventName]) return

  events[eventName] = events[eventName].filter((h) => h !== (handler as EventListener))
  window.removeEventListener(eventName, handler as EventListener)
}

const emit = <T>(eventName: string, payload?: T): void => {
  if (!events[eventName]) return

  const eventObj = new CustomEvent<T>(eventName, { detail: payload || ({} as T) })
  window.dispatchEvent(eventObj)
}

export const EventManager = { emit, off, on }
