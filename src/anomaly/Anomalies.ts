import {appConfig} from 'conf/appConfig'
import {Anomaly, Category, SubcategoryInformation, SubcategoryInput} from './Anomaly'
import anomaliesJSON from './yml/anomalies.json'

export const allAnomalies = anomaliesJSON.list as Anomaly[]

export const allVisibleAnomalies = () =>
  allAnomalies.filter(_ => !_.hidden && (!_.isHiddenDemoCategory || appConfig.showDemoCategory))

export const instanceOfSubcategoryInput = (_?: Category): _ is SubcategoryInput => {
  return !!(_ as SubcategoryInput)?.detailInputs
}

export const instanceOfSubcategoryInformation = (_?: Category): _ is SubcategoryInformation => {
  return !!(_ as SubcategoryInformation)?.information
}

export const instanceOfAnomaly = (_?: Category): _ is Anomaly => {
  return !!(_ as Anomaly)?.category
}
