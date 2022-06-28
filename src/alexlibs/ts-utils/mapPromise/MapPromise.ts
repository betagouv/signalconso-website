type PromiseReturn<T> = T extends PromiseLike<infer U> ? U : T

type PromiseFnResult<T extends (...args: any[]) => Promise<object>> = PromiseReturn<ReturnType<T>>

/**
 * Map a function returning a Promise without having to redefined his parameters
 */
export const mapPromise =
  <F extends (...args: any[]) => Promise<any>, X>({
    promise,
    mapThen = _ => _,
    mapCatch = _ => Promise.reject(_),
  }: {
    promise: F
    mapThen?: (_: PromiseFnResult<F>) => X
    mapCatch?: (_: any) => any
  }) =>
  (...args: Parameters<F>): Promise<X> => {
    return promise(...args)
      .then(mapThen)
      .catch(mapCatch)
  }
