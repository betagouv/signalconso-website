import {Dispatch, SetStateAction, useState} from 'react'

export interface UseToggle {
  value: boolean
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
  set: Dispatch<SetStateAction<boolean>>
}

export const useBoolean = (value: boolean = false): UseToggle => {
  const [b, setB] = useState(value)
  return {
    value: b,
    setTrue: () => setB(true),
    setFalse: () => setB(false),
    toggle: () => setB(b => !b),
    set: setB,
  }
}
