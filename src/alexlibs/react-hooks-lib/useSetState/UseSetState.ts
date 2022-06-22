import {useState} from 'react'

export interface UseSetState<T> {
  add: (t: T | T[]) => void
  toggle: (t: T) => void
  toggleAll: (t: T[]) => void
  delete: (t: T) => boolean
  clear: () => void
  values: () => Iterable<T>
  toArray: () => T[]
  size: number
  has: (t: T) => boolean
  reset: (values?: T[]) => void
  get: () => Set<T>,
}

export const useSetState = <T>(initialValue: T[] = []): UseSetState<T> => {
  const [set, setSet] = useState(new Set<T>(initialValue))

  const add = (t: T | T[]): void => {
    if (Array.isArray(t)) {
      const newSet = new Set(t)
      setSet(newSet)
    } else {
      set.add(t)
      const newSet = new Set(set)
      setSet(newSet)
    }
  }

  const remove = (t: T): boolean => {
    const returnValue = set.delete(t)
    setSet(new Set(set))
    return returnValue
  }

  const toggle = (t: T): void => {
    set.has(t) ? remove(t) : add(t)
  }

  const toggleAll = (t: T[]): void => {
    t.map(t.every(_ => set.has(_)) ? remove : add)
  }

  const clear = () => setSet(new Set())

  const reset = (values: T[] = []) => setSet(new Set(values))

  const toArray = () => Array.from(set.values())

  return {
    has: (t: T) => set.has(t),
    size: set.size,
    get: () => new Set(toArray()),
    toArray,
    values: () => set.values(),
    add,
    toggle,
    toggleAll,
    reset,
    delete: remove,
    clear,
  }
}
