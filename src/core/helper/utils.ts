import {config} from '../../conf/config'

export const serialiseJsonForStupidNextJs = <T extends object>(t: T): T => {
  return config.isDev ? JSON.parse(JSON.stringify(t)) : JSON.parse(JSON.stringify(t))
}
