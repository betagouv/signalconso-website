// Use this file to defined used lodash features because:
// - We don't want to import all lodash code
// - Default import are pain in the ass
import _throttle from 'lodash/throttle'
import _last from 'lodash/last'

export const throttle = _throttle
export const last = _last
