import {appConfig} from 'core/appConfig'
import {Anomaly, Subcategory, SubcategoryWithInfoWall, StandardSubcategory, DetailInput} from './Anomaly'
import anomaliesJSON from './yml/anomalies.json'
import Fuse from 'fuse.js'

export const allAnomalies = anomaliesJSON as Anomaly[]

const options: Fuse.IFuseOptions<Anomaly> = {
  keys: ['title', 'description'],
  threshold: 0.2,
  minMatchCharLength: 4,
  distance: 100,
  useExtendedSearch: true,
  ignoreLocation: true,
}

export const fuseA = new Fuse(allAnomalies, options)

export const allVisibleAnomalies = () =>
  allAnomalies
    .filter(_ => !_.hidden && (!_.isHiddenDemoCategory || appConfig.showDemoCategory))
    .sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id)
    })

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
