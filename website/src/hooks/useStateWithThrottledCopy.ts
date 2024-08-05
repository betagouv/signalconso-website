import {useEffect, useState} from 'react'
import {useThrottle} from '@/utils/useThrottle'

export function useStateWithThrottledCopy<A>(defaultValue: A): [A, React.Dispatch<React.SetStateAction<A>>, A] {
  const [state, setState] = useState(defaultValue)
  const [throttledCopy, setThrottledCopy] = useThrottle(state, 5)
  useEffect(() => {
    // always copy the first state into the second one
    // But since it's throttled, it will delay changes a bit
    setThrottledCopy(state)
  }, [state])
  // Return a normal version (to be used when displaying)
  // And a throttled copy (doesn't update as often, but it's useful to throttle API calls based on it)
  return [state, setState, throttledCopy]
}
