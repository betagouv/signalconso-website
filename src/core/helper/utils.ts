import {config} from '../../conf/config'
import classNames from 'classnames'

export const serialiseJsonForStupidNextJs = <T extends object>(t: T): T => {
  return config.isDev ? JSON.parse(JSON.stringify(t)) : JSON.parse(JSON.stringify(t))
}

// Because default imports are very very annoying since they break autocomplete
export const classes = classNames

const capitalize = (_: string) => {
  return _.charAt(0).toUpperCase() + _.slice(1)
}
