import {useState} from 'react'
import {Func} from '../useFetcher/UseFetcher'

export type UseAsync<F extends Func<Promise<any>>, E = any> = {
  loading: boolean
  error?: E
  call: F
}

/**
 * Factorize async by exposing loading indicator and error status.
 */
export const useAsync = <F extends Func<Promise<any>>, E = any>(caller: F, mapError: (_: any) => E = _ => _): UseAsync<F, E> => {
  const [error, setError] = useState<E | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const call = (...args: any[]) => {
    setLoading(true)
    return caller(...args)
      .then(_ => {
        setLoading(false)
        return _
      })
      .catch((e: E) => {
        setLoading(false)
        setError(mapError(e))
        throw e
      })
  }

  return {
    loading,
    error,
    // @ts-ignore
    call,
  }
}
