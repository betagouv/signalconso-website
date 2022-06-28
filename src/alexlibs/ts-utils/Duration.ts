const SECOND = (x: number = 1): number => x * 1000
const MINUTE = (x: number = 1): number => x * 60 * SECOND()
const HOUR = (x: number = 1): number => x * 60 * MINUTE()
const DAY = (x: number = 1): number => x * 24 * HOUR()

type TimeUnit = 'second' | 'minute' | 'hour' | 'day'

type Duration = number & {
  toMs: number
  toSeconds: number
  toMinutes: number
  toHours: number
  toDays: number
  valueOf: () => number
  toString: () => string
}

interface DurationConstructor {
  (value: number, unit?: TimeUnit): Duration
}

const toSeconds = (x: number) => Math.floor(x / 1000)
const toMinutes = (x: number) => Math.floor(toSeconds(x) / 60)
const toHours = (x: number) => Math.floor(toMinutes(x) / 60)
const toDays = (x: number) => Math.floor(toHours(x) / 24)

const parseTimeUnit = (str?: TimeUnit): ((_: number) => number) => {
  switch (str) {
    case 'second':
      return SECOND
    case 'minute':
      return MINUTE
    case 'hour':
      return HOUR
    case 'day':
      return DAY
    default:
      return _ => _
  }
}

// exemple :
//    duration(2, 'hours)
// Creates a Duration object with a bunch of unused methods
// We should delete all this file and just use raw numbers instead
export const duration: DurationConstructor = (value: number, unit?: TimeUnit) => {
  if (isNaN(value)) {
    throw new Error(`[ts-utils/Duration] value '${value}' is not a valid number.`)
  }
  const toMs = parseTimeUnit(unit)(value)
  return {
    toMs,
    toSeconds: toSeconds(toMs),
    toMinutes: toMinutes(toMs),
    toHours: toHours(toMs),
    toDays: toDays(toMs),
    valueOf: (): number => toMs,
    toString: (): string => {
      const print = (value: number, suffix: string) => (value > 0 ? `${value} ${suffix} ` : '')
      const output = (
        '' +
        `${print(toDays(toMs), 'Days')}` +
        `${print(toHours(toMs % DAY()), 'Hr')}` +
        `${print(toMinutes(toMs % HOUR()), 'Min')}` +
        `${print(toSeconds(toMs % MINUTE()), 'Sec')}`
      ).trim()
      return output === '' ? '0 Sec' : output
    },
  } as never as Duration
}
