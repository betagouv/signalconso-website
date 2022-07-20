import format from 'date-fns/format'

export type Index<T> = {[key: string]: T}
export type Shape<T extends object> = {[key in keyof T]: any}

export const dateToApiDate = (date?: Date): string | undefined => (date ? format(date, 'yyyy-MM-dd') : undefined)

export const dateToApiTime = (date?: Date): string | undefined => (date ? date.toISOString() : undefined)

export const getHostFromUrl = (url?: string) => {
  return url?.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0]
}

export const isNotDefined = (value: any): value is undefined | null | '' => {
  return [undefined, null, ''].includes(value)
}

export const isDefined = <T>(value: T | undefined | null | ''): value is T => !isNotDefined(value)

export const toNumberOrDefault = (value: any, defaultValue: number): number =>
  isNaN(value) || value == '' || value == null ? defaultValue : value

export const cleanObject = <T extends {[key: string]: any}>(obj: T): Partial<T> => {
  const clone = {...obj}
  for (let k in clone) {
    const val = clone[k]
    if (isNotDefined(val) || (Array.isArray(val) && val.filter(isDefined).length === 0)) {
      delete clone[k]
    }
  }
  return clone
}

export const roundValue = (_: number): number => Math.round(_)

export const toQueryString = (obj: any): string => {
  if (!obj) return ''
  return (
    '?' +
    Object.keys(obj)
      .filter(k => obj[k] !== undefined)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
      .join('&')
  )
}

export const directDownloadBlob =
  (fileName: string) =>
  (blob: Blob): void => {
    const url = window.URL.createObjectURL(new Blob([blob], {type: 'application/pdf'}))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  }

export const undefinedIfNull = <A>(a: A | null): A | undefined => {
  return a === null ? undefined : a
}
