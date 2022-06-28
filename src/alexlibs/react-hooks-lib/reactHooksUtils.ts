import React, {useMemo, useEffect, useRef} from 'react'

export const useEffectFn = <T, R>(dep: T | undefined, map: (_: T) => void) => {
  return useEffect(() => {
    if (dep !== undefined) map(dep)
  }, [dep])
}

export const useMemoFn = <T, R>(dep: T, map: (_: T) => R): undefined extends T ? R | undefined : R => {
  // @ts-ignore
  return useMemo(() => {
    return dep ? map(dep) : undefined
  }, [dep])
}

/**
 * Use setTimeout with Hooks in a declarative way.
 *
 * @see https://stackoverflow.com/a/59274757/3723993
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export const useTimeout = (callback: React.EffectCallback, delay: number | null): React.MutableRefObject<number | null> => {
  const timeoutRef = useRef<number | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
      return () => window.clearTimeout(timeoutRef.current || 0)
    }
  }, [delay])

  return timeoutRef
}
