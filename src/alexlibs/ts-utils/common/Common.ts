/**
 * Functional for loop.
 * mapFor(n, callback)
 * is equivalent to
 * [...new Array(n)].map((_, i) => callback(i))
 * with better performance
 */
export const mapFor = <T>(n: number, callback: (i: number) => T): T[] => {
  const result: T[] = new Array(n)
  for (let i = 0; i < n; i++) {
    result[i] = callback(i)
  }
  return result
}

type Filter<T> = (value: T, index: number, array: T[]) => boolean

/**
 * The goal is to be able to add filters conditionally using this pattern
 * multipleFilters(
 *  condition && callback,
 *  condition2 && callback2,
 *  ...
 * )(list)
 */
export const multipleFilters =
  <T>(...filters: Array<boolean | Filter<T>>) =>
  (list: T[]) => {
    if (filters.length === 0) return list
    return list.filter((t: T, index: number, array: T[]) =>
      filters
        .filter(filter => filter instanceof Function)
        // @ts-ignore
        .every(filter => filter(t, index, array)),
    )
  }

export const toPercent = (value: number): string => value.toFixed(2) + '%'

/**
 * Promises are sometimes more convenient to manipulate !
 */
export const toPromise = <T>(call: () => T): Promise<T> =>
  new Promise((resolve, reject) => {
    try {
      resolve(call())
    } catch (e) {
      reject(e)
    }
  })

/**
 * Principally designed to be used in a promise chain and automatically cast the function's result from Array<T | undefined> to T.
 * E.G.
 * const fetchingData: () => Promise<Array<T | undefined>> = ...
 * const data: T[] = await fetchingData().then(filterUndefined);
 */
export const filterUndefined = <T>(data: Array<T | undefined>): T[] => data.filter(_ => _ !== undefined) as T[]

/**
 * Principally designed to be used in a promise chain and automatically cast the function's result from T | undefined to T.
 * E.G.
 * const fetchingData: () => Promise<T | undefined> = ...
 * const data: T = await fetchingData().then(throwIfUndefined);
 */
export const throwIfUndefined =
  (message: string = 'Unexpected undefined value.') =>
  <T>(data?: T): T => {
    if (data === undefined) throw new Error(message)
    return data
  }

/**
 * Principally designed to be used in a promise chain and automatically cast the function's result from T | undefined to T.
 * E.G.
 * const fetchUser: () => Promise<User> = ...
 * const frenchUser = await fetchUsers().then(throwIf(user => user.nationality !== 'fr', 'User should be french'));
 */
export const throwIf =
  <T>(condition: (t: T) => boolean, message: string) =>
  (data: T): T => {
    if (condition(data)) throw new Error(message)
    return data
  }

/**
 * Take an array as a parameter and shuffle it following the Fisher-Yates Algorithm.
 * Not that it's on purpose that the input array is overriden has it's the most efficient way to shuffle an array.
 * input an array of any type
 * output the input array shuffled
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
