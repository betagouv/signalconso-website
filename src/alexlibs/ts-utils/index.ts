export const delay =
  <T>(ms: number) =>
  (t: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(t), ms))

export const ifDefined = <T, R>(t: T | undefined, fn: (t: T) => R): R | undefined => {
  return t !== undefined ? fn(t) : undefined
}

// Loop n times, building an array of length n
// Equivalent to
// [...new Array(n)].map((_, i) => callback(i))
export const mapNTimes = <T>(n: number, callback: (i: number) => T): T[] => {
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
