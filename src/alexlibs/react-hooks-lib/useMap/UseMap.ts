import {useState} from 'react'

export interface UseMap<K, V> {
  set: (k: K, v: V) => void
  has: (k: K) => boolean
  values: () => V[]
  keys: () => K[]
  clear: () => void
  delete: (k: K) => void
  size: number
  get: (k: K) => V | undefined
}

export const useMap = <K, V>(initialValue: Map<K, V> = new Map()): UseMap<K, V> => {
  const [map, setMap] = useState<Map<K, V>>(initialValue)

  return {
    set: (k: K, v: V): void => {
      const newMap = map.set(k, v)
      setMap(new Map(newMap))
      return map as any
    },
    has: (k: K) => map.has(k),
    values: () => Array.from(map.values()),
    keys: () => Array.from(map.keys()),
    clear: () => map.clear(),
    delete: (k: K) => {
      const exists = map.delete(k)
      setMap(new Map(map))
      return exists
    },
    size: map.size,
    get: (k: K) => map.get(k),
  }
}
