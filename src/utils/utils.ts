import {format, parse} from 'date-fns'

export const isServerSide = () => typeof window === 'undefined'

// dd/mm/yyyy to yyyy-mm-dd
// We don't use date-fns here, because we have problems
// with dates with five digits year (dd/mm/YYYYY)
// which can happen when the user is typing.
// It's safer to do it manually
export const frenchToIsoFormat = (d: string) => {
  return d.split('/').reverse().join('-')
}

// yyyy-mm-dd to dd/mm/yyyy
export const isoToFrenchFormat = (d: string) => {
  return d.split('-').reverse().join('/')
}

export const dateToFrenchFormat = (d: Date) => {
  return format(d, frenchDateFormat)
}

export const frenchFormatToDate = (d: string) => {
  return parse(d, frenchDateFormat, new Date())
}

export const isDateInRange = (d: string, min: string, max: string) => {
  return frenchFormatToDate(d) >= frenchFormatToDate(min) && frenchFormatToDate(d) <= frenchFormatToDate(max)
}

export const dateToIsoFormatWithoutTime = (d: Date) => {
  return d.toISOString().split('T')[0]
}

export const frenchDateFormat = 'dd/MM/yyyy'

export function scrollTop() {
  window.scrollTo(0, 0)
}

export const undefinedIfNull = <A>(a: A | null): A | undefined => {
  return a === null ? undefined : a
}

export function timeoutPromise(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), ms))
}

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
