import {Config} from '../config/config.js'
import {PageNotFoundException} from '../utils/exceptions.js'

export const fetchDGCCRFRSS = async (): Promise<string> => {
  const response = await fetch(`${Config.dgccrfRSSUrl}`)
  const body = await response.text()

  if (response.status >= 200 && response.status < 400) {
    return body
  } else {
    console.debug(`Request to ${Config.dgccrfRSSUrl} returned status ${response.status}`)
    return Promise.reject(new PageNotFoundException(Config.dgccrfRSSUrl))
  }
}
