export const int = (x?: string): undefined | number => (x ? parseInt(x) : undefined)

export const defaultValue =
  <T>(value: T) =>
  (x?: T): T =>
    x ?? value

export const required = <T>(x?: T): T => {
  if (!x) throw new Error(`Value is required but undefined.`)
  return x
}

export const bool = (x?: string): boolean | undefined => {
  if (x === 'true') return true
  if (x === 'false') return false
}
