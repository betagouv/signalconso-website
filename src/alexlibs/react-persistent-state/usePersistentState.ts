import {LocalStorageEntity} from './localStorageApi'
import {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from 'react'

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
export function usePersistentState<S>(initialState: S, key: string): [S, Dispatch<SetStateAction<S>>, () => void] {
  const localStorage = useMemo(() => new LocalStorageEntity<S>(`react-persistant-state-${key}`), [key])
  const [state, setState] = useState<S>(initialState)

  useEffect(() => {
    const storedState = localStorage.load()
    if (storedState) {
      setState(storedState)
    }
  }, [localStorage])

  useEffect(() => {
    if (state !== initialState) {
      localStorage.save(state)
    }
  }, [localStorage, state, initialState])

  return [
    state,
    setState,
    () => {
      localStorage.clear()
      setState(initialState)
    },
  ]
}
