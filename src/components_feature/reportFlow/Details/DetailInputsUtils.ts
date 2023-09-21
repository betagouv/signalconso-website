import {DetailInput, DetailInputDate, DetailInputDateNotInFuture, DetailInputType} from 'anomalies/Anomaly'
import {dateToIsoFormatWithoutTime, notNull} from 'utils/utils'

export const shouldDateInputDefaultToNow = (detailInput: DetailInputDate | DetailInputDateNotInFuture): boolean => {
  return detailInput.defaultValue === 'SYSDATE'
}

export function isDateInput(detailInput: DetailInput): detailInput is DetailInputDate | DetailInputDateNotInFuture {
  return detailInput.type === DetailInputType.DATE ?? detailInput.type === DetailInputType.DATE_NOT_IN_FUTURE
}

export const getPlaceholderFromInput = (detailInput: DetailInput): string | undefined => {
  if (detailInput.type === DetailInputType.TEXT || detailInput.type === DetailInputType.TEXTAREA) {
    return detailInput.placeholder
  }
  return undefined
}

export const getOptionsFromInput = (detailInput: DetailInput): string[] | undefined => {
  if (detailInput.type === DetailInputType.CHECKBOX || detailInput.type === DetailInputType.RADIO) {
    return detailInput.options
  }
  return undefined
}

export function buildDefaultValues(inputs: DetailInput[]) {
  return Object.fromEntries(
    inputs
      .map((input, inputIndex) => {
        if (isDateInput(input) && shouldDateInputDefaultToNow(input)) {
          const key = inputIndex.toString()
          const val = dateToIsoFormatWithoutTime(new Date())
          return [key, val] as const
        }
        return null
      })
      .filter(notNull),
  )
}
