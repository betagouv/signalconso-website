import {appConfig} from '../core/appConfig'
import {AppLang, AppLangs} from '../i18n/localization/AppLangs'
import {Anomaly, CategoryNode, DetailInput, StandardSubcategory, Subcategory, SubcategoryWithInfoWall} from './Anomaly'
import anomaliesJSONEn from './json/anomalies_en.json'
import anomaliesJSONFr from './json/anomalies_fr.json'

export const allAnomalies = (lang: AppLang) => {
  return ((lang === AppLangs.en ? anomaliesJSONEn : anomaliesJSONFr) as Anomaly[]).filter(notUndefined)
}
export const allVisibleAnomalies = (lang: AppLang) =>
  allAnomalies(lang)
    .filter(_ => !_.hidden && (!_.isHiddenDemoCategory || appConfig.showDemoCategory))
    .sort((a, b) => {
      return parseInt(a.id, 10) - parseInt(b.id, 10)
    })

export const allAnomaliesForHomepage = (lang: AppLang) => allVisibleAnomalies(lang).filter(_ => !_.isSpecialOpenFoodFactsCategory)

export type AnomalyIndex = {
  root: Anomaly
  id: string
  title: string
  description?: string
  subcategories: Subcategory[]
}

export const instanceOfSubcategoryWithInputs = (_?: CategoryNode): _ is StandardSubcategory & {detailInputs: DetailInput[]} => {
  return !!(_ as StandardSubcategory)?.detailInputs
}

export const instanceOfSubcategoryWithInfoWall = (_?: CategoryNode): _ is SubcategoryWithInfoWall => {
  return !!(_ as SubcategoryWithInfoWall)?.blockingInfo
}

export const instanceOfAnomaly = (_?: CategoryNode): _ is Anomaly => {
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

function notUndefined<A>(a: A | undefined): a is A {
  return a !== undefined
}
