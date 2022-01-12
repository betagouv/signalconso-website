// Use this file to defined used lodash features because:
// - We don't want to import all lodash code
// - Default import are pain in the ass
import _uniqBy from 'lodash/uniqBy'
import _debounce from 'lodash/debounce'
import _throttle from 'lodash/throttle'
import _groupBy from 'lodash/groupBy'
import _intersectionBy from 'lodash/intersectionBy'
import _differenceBy from 'lodash/differenceBy'

export const uniqBy = _uniqBy
export const debounce = _debounce
export const throttle = _throttle
export const groupBy = _groupBy
export const intersectionBy = _intersectionBy
export const differenceBy = _differenceBy
