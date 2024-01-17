import {format, parse} from 'date-fns'
import {AppLang} from '../i18n/localization/AppLangs'
import {ReactNode} from 'react'

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

// yyyy-mm-dd to 3 Juin 2023
export const isoToHumanReadableText = (d: string, lang: AppLang) => {
  const date = new Date(d)
  const formatter = new Intl.DateTimeFormat(lang, {year: 'numeric', month: 'long', day: 'numeric'})
  return formatter.format(date)
}

export const dateToFrenchFormat = (d: Date) => {
  return format(d, frenchDateFormat)
}

export const frenchFormatToDate = (d: string) => {
  return parse(d, frenchDateFormat, new Date())
}

export const isDateInRange = (d: string, min: string, max: string) => {
  return (
    isoDateStringToDateObject(d) >= isoDateStringToDateObject(min) &&
    isoDateStringToDateObject(d) <= isoDateStringToDateObject(max)
  )
}

export function isoDateStringToDateObject(d: string) {
  return new Date(d)
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

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

// Equivalent of Object.entries but with more precise types
// Not always 100% safe, see
// https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
export function getEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Entries<T>
}
// Same for Object.keys
export function getKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}

export const iconArrowRight = 'fr-icon-arrow-right-s-line'

export function notNull<A>(a: A | null): a is A {
  return a !== null
}

export function notUndefined<A>(a: A | undefined): a is A {
  return a !== undefined
}

export function lastFromArray<A>(arr: A[]): A | undefined {
  return arr.length === 0 ? undefined : arr[arr.length - 1]
}

export function sendMessageToReactNative(message: string): void {
  window.ReactNativeWebView?.postMessage(message)
}

// to avoid repetition
export type ChildrenProps = {
  children: ReactNode
}
export type MaybeChildrenProps = {
  children?: ReactNode
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
