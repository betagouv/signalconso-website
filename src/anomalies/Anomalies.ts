import {appConfig} from 'core/appConfig'
import {Anomaly, SubcategoryBase, SubcategoryInformation, SubcategoryInput} from './Anomaly'
import anomaliesJSON from './yml/anomalies.json'

export const allAnomalies = anomaliesJSON.list as Anomaly[]

export const allVisibleAnomalies = () =>
  allAnomalies
    .filter(_ => !_.hidden && (!_.isHiddenDemoCategory || appConfig.showDemoCategory))
    .sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id)
    })

export const instanceOfSubcategoryInput = (_?: Anomaly | SubcategoryBase): _ is SubcategoryInput => {
  return !!(_ as SubcategoryInput)?.detailInputs
}

export const instanceOfSubcategoryInformation = (_?: Anomaly | SubcategoryBase): _ is SubcategoryInformation => {
  return !!(_ as SubcategoryInformation)?.information
}

export const instanceOfAnomaly = (_?: Anomaly | SubcategoryBase): _ is Anomaly => {
  return !!(_ as Anomaly)?.category
}
