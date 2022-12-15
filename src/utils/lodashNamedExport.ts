// Use this file to defined used lodash features because:
// - We don't want to import all lodash code
// - Default import are pain in the ass
import _uniqBy from 'lodash/uniqBy'
import _throttle from 'lodash/throttle'
import _sortBy from 'lodash/sortBy'
import _last from 'lodash/last'

export const sortBy = _sortBy
export const uniqBy = _uniqBy
export const throttle = _throttle
export const last = _last
