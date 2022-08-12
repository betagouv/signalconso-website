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

export const frenchDateFormat = 'dd/MM/yyyy'
