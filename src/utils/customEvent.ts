interface EventManager {
  on: <T>(eventName: string, callback: (event: CustomEvent<T>) => void) => void
  off: <T>(eventName: string, callback: (event: CustomEvent<T>) => void) => void
  emit: <T>(eventName: string, payload?: T) => void
}

const on = <T>(eventName: string, callback: (event: CustomEvent<T>) => void) => {
  window.addEventListener(eventName, callback as EventListener)
}

const off = <T>(eventName: string, callback: (event: CustomEvent<T>) => void) => {
  window.removeEventListener(eventName, callback as EventListener)
}

const emit = <T>(eventName: string, payload?: T) => {
  window.dispatchEvent(new CustomEvent<T>(eventName, { detail: payload }))
}

export const EventManager: EventManager = {
  on,
  off,
  emit,
}
