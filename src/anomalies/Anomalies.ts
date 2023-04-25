import {appConfig} from 'core/appConfig'
import {Anomaly, Subcategory, SubcategoryWithInfoWall, StandardSubcategory, DetailInput} from './Anomaly'
import anomaliesJSON from './yml/anomalies.json'

export const allAnomalies = anomaliesJSON as Anomaly[]

export const allVisibleAnomalies = () =>
  allAnomalies
    .filter(_ => !_.hidden && (!_.isHiddenDemoCategory || appConfig.showDemoCategory))
    .sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id)
    })

export type AnomalyIndex = {
  root: Anomaly
  id: string
  title: string
  description?: string
  subcategories: Subcategory[]
}

export function createFuseIndex(anomalies: Anomaly[]) {
  const res: AnomalyIndex[] = []

  allVisibleAnomalies().map(anomaly => {
    // res.push({root: anomaly, id: anomaly.id, title: anomaly.title, description: anomaly.description, subcategories: []})
    const subcategories = anomaly.subcategories
    const SubcategoryAnomalies = aggregateCategories(anomaly, [], subcategories)
    res.push(...SubcategoryAnomalies)
  })

  return res
}

function aggregateCategories(anomaly: Anomaly, acc: Subcategory[], subcategories: Subcategory[]) {
  const res: AnomalyIndex[] = []
  subcategories.forEach(subcategory => {
    const newAcc = acc.concat(subcategory)
    res.push({
      root: anomaly,
      id: subcategory.id,
      title: subcategory.title,
      description: subcategory.desc,
      subcategories: newAcc,
    })
    const cat = subcategory.subcategories ? aggregateCategories(anomaly, newAcc, subcategory.subcategories) : []
    res.push(...cat)
  })

  return res
}

export const instanceOfSubcategoryWithInputs = (
  _?: Anomaly | Subcategory,
): _ is StandardSubcategory & {detailInputs: DetailInput[]} => {
  return !!(_ as StandardSubcategory)?.detailInputs
}

export const instanceOfSubcategoryWithInfoWall = (_?: Anomaly | Subcategory): _ is SubcategoryWithInfoWall => {
  return !!(_ as SubcategoryWithInfoWall)?.blockingInfo
}

export const instanceOfAnomaly = (_?: Anomaly | Subcategory): _ is Anomaly => {
  return !!(_ as Anomaly)?.category
}

export function findAnomaly(category: string): Anomaly {
  const res = allAnomalies.find(_ => _.category === category)
  if (!res) {
    throw new Error(`Can't find anomaly "${category}"`)
  }
  return res
}
