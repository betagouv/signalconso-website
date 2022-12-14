import format from 'date-fns/format'

export const isNotDefined = (value: any): value is undefined | null | '' => {
  return [undefined, null, ''].includes(value)
}

export const isDefined = <T>(value: T | undefined | null | ''): value is T => !isNotDefined(value)

export const undefinedIfNull = <A>(a: A | null): A | undefined => {
  return a === null ? undefined : a
}
