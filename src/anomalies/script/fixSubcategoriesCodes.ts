import {Anomaly, Subcategory} from '../Anomaly'

import anomaliesJSON from '../yml/anomalies.json'

interface CategoryPath {
  category: String
  ccrfCode: Array<String>
  reponseconsoCode: Array<String>
  subCategoryTree: Array<String>
}

export const allAnomalies = anomaliesJSON.list as Anomaly[]

const allVisibleAnomalies = () => allAnomalies.filter(_ => !_.hidden && (!_.isHiddenDemoCategory || false))

const handleSubcategories = (result: CategoryPath[], acc: CategoryPath, subcategories?: Subcategory[]) => {
  if (subcategories && subcategories.length > 0) {
    subcategories.map(subcategory => {
      const newAcc = {
        category: acc.category,
        ccrfCode: subcategory.ccrfCode ? acc.ccrfCode.concat(subcategory.ccrfCode) : acc.ccrfCode,
        reponseconsoCode: subcategory.reponseconsoCode
          ? acc.reponseconsoCode.concat(subcategory.reponseconsoCode)
          : acc.reponseconsoCode,
        subCategoryTree: acc.subCategoryTree.concat([subcategory.title]),
      }
      handleSubcategories(result, newAcc, subcategory.subcategories)
    })
  } else {
    result.push(acc)
  }
}

allVisibleAnomalies().forEach(anomaly => {
  let result: CategoryPath[] = []
  handleSubcategories(
    result,
    {
      category: anomaly.category,
      ccrfCode: [],
      reponseconsoCode: [],
      subCategoryTree: [],
    },
    anomaly.subcategories,
  )

  result.forEach(res => {
    const ccrfCodeCodeQueryFragment =
      res.ccrfCode && res.ccrfCode.length > 0 ? ` SET ccrf_code =  '{${res.ccrfCode.join(',')}}'` : undefined

    const reponseConsoCodeQueryFragment =
      res.reponseconsoCode && res.reponseconsoCode.length > 0
        ? ` SET reponseconso_code =  '{${res.reponseconsoCode.join(',')}}'`
        : undefined

    if (ccrfCodeCodeQueryFragment || reponseConsoCodeQueryFragment) {
      console.log(`UPDATE reports
                      ${reponseConsoCodeQueryFragment}
                      ${ccrfCodeCodeQueryFragment}
                      WHERE category = '${res.category}'
                      AND subcategories = '{${res.subCategoryTree.join(',')}}'
                      ;`)
    }
  })
})
