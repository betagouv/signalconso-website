import {isServerSide} from '../../core/helper/utils'
// Wrapper around window.localStorage
// It just adds automatic JSON serialization/deserialization if you feed in an object
const jsonAwareStorage = {
  load: (key: string): any => {
    if (!isServerSide()) {
      let serializedState: string | null
      try {
        serializedState = localStorage.getItem(key)
      } catch (err) {
        console.error(err)
        return null
      }
      try {
        return serializedState && JSON.parse(serializedState)
      } catch (err) {
        // Parsing will fail when it's not an object, so simply return the value
        return serializedState
      }
    }
  },

  save: (key: string, value: any): void => {
    if (!isServerSide()) {
      try {
        const serializedState = typeof value === 'object' ? JSON.stringify(value) : value
        localStorage.setItem(key, serializedState)
      } catch (err) {
        console.error(err)
      }
    }
  },

  clear: (key: string): void => {
    if (!isServerSide()) {
      // All localStorage calls may throw an error, if the browser is configured to refuse it
      try {
        localStorage.removeItem(key)
      } catch (err) {
        console.error(err)
      }
    }
  },
}

/**
 *
 * Wrapper around window.localStorage so you can use it in a typesafe way for one specify key
 * Also adds the JSON handling
 *
 * Usage :
 *
 *   const dogStorage = new LocalStorageEntity<Dog>("something-storage-key")
 *   dogStorage.save({ ... dog object ...})
 *
 *   // later
 *   const dog = dogStorage.load()
 *
 */
export class LocalStorageEntity<T> {
  constructor(private key: string) {}

  save = (value: T): void => {
    return jsonAwareStorage.save(this.key, value)
  }

  load = (): T | null => {
    return jsonAwareStorage.load(this.key) as T
  }

  clear = (): void => {
    jsonAwareStorage.clear(this.key)
  }
}
