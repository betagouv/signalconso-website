import {DetailInputType} from 'model'
import {DetailInput} from 'model'

export const getDefaultValueFromInput = (detailInput: DetailInput): string | undefined => {
  if (detailInput.type === DetailInputType.DATE || detailInput.type === DetailInputType.DATE_NOT_IN_FUTURE) {
    return detailInput.defaultValue
  }
  return undefined
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
