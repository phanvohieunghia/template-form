export class LocalStorageService {
  private static _instance: LocalStorageService

  public static get instance(): LocalStorageService {
    if (!LocalStorageService._instance) {
      LocalStorageService._instance = new LocalStorageService()
    }
    return LocalStorageService._instance
  }

  /**
   * Save an item to localStorage
   * @param key - The key under which the data should be stored
   * @param value - The value to store (will be stringified if it's not a string)
   */
  public set(key: string, value: unknown): void {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
      localStorage.setItem(key, stringValue)
    } catch (error) {
      console.error('Error setting item in localStorage:', error)
    }
  }

  /**
   * Retrieve an item from localStorage
   * @param key - The key of the item to retrieve
   * @returns The parsed value if it exists and is valid JSON, or the raw value as a string
   */
  public get<T>(key: string): T | string | null {
    try {
      const value = localStorage.getItem(key)
      if (value) {
        // Try parsing as JSON, otherwise return raw string
        try {
          return JSON.parse(value) as T
        } catch {
          return value // Return raw string if not JSON
        }
      }
      return null
    } catch (error) {
      console.error('Error getting item from localStorage:', error)
      return null
    }
  }

  /**
   * Remove multiple items from localStorage
   * @param keys - An array of keys to remove
   */
  public remove(keys: string[]): void {
    try {
      keys.forEach((key) => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Error removing items from localStorage:', error)
    }
  }

  /**
   * Clear all items from localStorage
   */
  public clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}
