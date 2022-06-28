import {LocalStorageEntity} from './localStorageApi'
import {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from 'react'
import throttle from 'lodash.throttle'

/**
 *
 * Usage :
 *
 * const [state, setState, setStateBackToDefault] = usePersistentState({ ... initial state... }, 'my-key')
 *
 * Whenever you change the state, it will be persisted to the local storage
 *
 * When you usePersistentState() for the first time, the state is read from the local storage
 * Only if the local storage is empty, the parameter initial state is used
 *
 */
export function usePersistentState<S>(initialState: S | (() => S), key?: string): [S, Dispatch<SetStateAction<S>>, () => void] {
  const localStorage = useMemo(() => new LocalStorageEntity<S>(generateId(key)), [])
  const [state, setState] = useState<S>(localStorage.load() ?? initialState)
  const throttled = useRef(throttle(localStorage.save, 1000))
  useEffect(() => throttled.current(state), [state])

  return [
    state,
    setState,
    () => {
      localStorage.clear()
      setState(initialState)
    },
  ]
}

const generateId = (key?: string | number): string => {
  return 'react-persistant-state-' + (key ?? generateHash(new Error().stack ?? ''))
}

const generateHash = (x: string): number => {
  return x.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
}
