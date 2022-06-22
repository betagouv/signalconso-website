export const map = <T, R>(t: T | undefined, fn: (t: T) => R): R | undefined => {
  return t !== undefined ? fn(t) : undefined
}
