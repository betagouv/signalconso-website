import {appConfig} from '../core/appConfig'
import {Anomaly, Subcategory, SubcategoryWithInfoWall, StandardSubcategory, DetailInput} from './Anomaly'
import anomaliesJSONFr from './json/anomalies_fr.json'
import anomaliesJSONEn from './json/anomalies_en.json'
import {AppLang, AppLangs} from '../i18n/localization/AppLangs'

export const allAnomalies = (lang: AppLang) => (lang === AppLangs.en ? anomaliesJSONEn : anomaliesJSONFr) as Anomaly[]

export const allVisibleAnomalies = (lang: AppLang) =>
  allAnomalies(lang)
    .filter(_ => !_.hidden && (!_.isHiddenDemoCategory || appConfig.showDemoCategory))
    .sort((a, b) => {
      return parseInt(a.id, 10) - parseInt(b.id, 10)
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

  anomalies.map(anomaly => {
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

export function findAnomaly(category: string, lang: AppLang): Anomaly {
  const res = allAnomalies(lang).find(_ => _.category === category)
  if (!res) {
    throw new Error(`Can't find anomaly "${category}"`)
  }
  return res
}

export function findAnomalyByPath(categoryPath: string, lang: AppLang): Anomaly {
  const res = allAnomalies(lang).find(_ => _.path === categoryPath)
  if (!res) {
    throw new Error(`Can't find anomaly "${categoryPath}"`)
  }
  return res
}
