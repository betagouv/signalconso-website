import {useMemo} from 'react'

export const useMemoFn = <T, R>(dep: T, map: (_: T) => R): undefined extends T ? (R | undefined) : R => {
  // @ts-ignore
  return useMemo(() => {
    return dep ? map(dep) : undefined
  }, [dep])
}
