import {Dispatch, SetStateAction, useRef, useState} from 'react'

export type Func<R = any> = (...args: any[]) => R

export type Fetch<T extends Func<Promise<FetcherResult<T>>>> = (
  p?: {force?: boolean; clean?: boolean},
  ..._: Parameters<T>
) => ReturnType<T>

export interface FetchParams {
  force?: boolean
  clean?: boolean
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

type FetcherResult<T extends Func> = ThenArg<ReturnType<T>>

export type UseFetcher<F extends Func<Promise<FetcherResult<F>>>, E = any> = {
  entity?: FetcherResult<F>
  loading: boolean
  error?: E
  fetch: Fetch<F>
  setEntity: Dispatch<SetStateAction<FetcherResult<F> | undefined>>
  clearCache: () => void
}

/**
 * Factorize fetching logic which goal is to prevent unneeded fetchs and expose loading indicator + error status.
 */
export const useFetcher = <F extends Func<Promise<any>>, E = any>(
  fetcher: F,
  initialValue?: FetcherResult<F>,
  mapError: (_: any) => E = _ => _,
): UseFetcher<F, E> => {
  const [entity, setEntity] = useState<FetcherResult<F> | undefined>(initialValue)
  const [error, setError] = useState<E | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const fetch$ = useRef<Promise<FetcherResult<F>>>()

  const fetch = ({force = true, clean = true}: FetchParams = {}, ...args: any[]): Promise<FetcherResult<F>> => {
    if (!force) {
      if (fetch$.current) {
        return fetch$.current!
      }
      if (entity) {
        return Promise.resolve(entity)
      }
    }
    if (clean) {
      setError(undefined)
      setEntity(undefined)
    }
    setLoading(true)
    fetch$.current = fetcher(...args)
    fetch$.current
      .then((x: FetcherResult<F>) => {
        setLoading(false)
        setEntity(x)
        fetch$.current = undefined
      })
      .catch(e => {
        setLoading(false)
        fetch$.current = undefined
        setError(mapError(e))
        setEntity(undefined)
        // return Promise.reject(e)
        throw e
      })
    return fetch$.current
  }

  const clearCache = () => {
    setEntity(undefined)
    setError(undefined)
    fetch$.current = undefined
  }

  return {
    entity,
    loading,
    error,
    // TODO(Alex) not sure the error is legitimate
    fetch: fetch as any,
    setEntity,
    clearCache,
  }
}
