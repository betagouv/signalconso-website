import {appConfig} from 'core/appConfig'
import {Anomaly, Category, BaseAnomaly, SubcategoryInformation, SubcategoryInput} from './Anomaly'
import anomaliesJSON from './yml/anomalies.json'

export const allAnomalies = anomaliesJSON.list as BaseAnomaly[]

export const allVisibleCategories = () =>
  allAnomalies.filter(_ => !_.hidden && (!_.isHiddenDemoCategory || appConfig.showDemoCategory))
