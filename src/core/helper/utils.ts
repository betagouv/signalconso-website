import {appConfig} from '../../conf/appConfig'
import classNames from 'classnames'

export const serializeJsonForStupidNextJs = <T extends object>(t: T): T => {
  return appConfig.isDev ? JSON.parse(JSON.stringify(t)) : JSON.parse(JSON.stringify(t))
}

// Because default imports are very very annoying since they break autocomplete
export const classes = classNames

const capitalize = (_: string) => {
  return _.charAt(0).toUpperCase() + _.slice(1)
}

export const map = <T, R>(t: T | undefined, fn: (t: T) => R): R | undefined => {
  return t !== undefined ? fn(t) : undefined
}
