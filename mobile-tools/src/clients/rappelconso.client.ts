import {Config} from '../config/config.js'
import {PageNotFoundException} from '../utils/exceptions.js'
import {RappelConso} from '../models/model.js'

export const fetchRappelConso = async (date1: string, date2: string, limit: number): Promise<RappelConso> => {
  const url = `${Config.rappelConsoUrl}?where=date_de_publication >= date'${date1}' and date_de_publication < date'${date2}'&order_by=date_de_publication DESC&limit=${limit}`
  console.log(`Generated RappelConso url: ${url}`)
  const response = await fetch(url)
  const body = await response.json()

  if (response.status >= 200 && response.status < 400) {
    return body
  } else {
    console.debug(`Request to ${Config.rappelConsoUrl} returned status ${response.status}`)
    return Promise.reject(new PageNotFoundException(Config.rappelConsoUrl))
  }
}
