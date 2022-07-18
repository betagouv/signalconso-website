export * from './Duration'
export * from './Enum'
export * from './FnSwitch'
export * from './MapPromise'

export const delay =
  <T>(ms: number) =>
  (t: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(t), ms))

export const map = <T, R>(t: T | undefined, fn: (t: T) => R): R | undefined => {
  return t !== undefined ? fn(t) : undefined
}

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

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}

const hashArgs = (args: any[]) => {
  let res = ''
  args.forEach(arg => {
    if (typeof arg == 'string' || typeof arg == 'boolean' || typeof arg == 'number') res += '|' + arg
    else if (typeof arg === 'function') res += '|fun'
    else res += '|' + JSON.stringify(arg)
  })
  return res
}

export const lazy = <T, P extends Array<any>>(fn: (...p: P) => T): ((...p: P) => T) => {
  const cache = new Map<string, T>()
  return (...p: P) => {
    const argsHashed = hashArgs(p)
    const cachedValue = cache.get(argsHashed)
    if (cachedValue === undefined) {
      const value = fn(...p)
      cache.set(argsHashed, value)
      return value
    }
    return cachedValue
  }
}
