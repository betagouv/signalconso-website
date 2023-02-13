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
    var ccrfCode = [...new Set(res.ccrfCode)]
    var reponseconsoCode = [...new Set(res.reponseconsoCode)]

    const ccrfCodeCodeQueryFragment = ccrfCode && ccrfCode.length > 0 ? ` SET ccrf_code =  '{${ccrfCode.join(',')}}'` : undefined

    const reponseConsoCodeQueryFragment =
      reponseconsoCode && reponseconsoCode.length > 0 ? ` SET reponseconso_code =  '{${reponseconsoCode.join(',')}}'` : undefined

    if (ccrfCodeCodeQueryFragment) {
      console.log(`UPDATE reports
                      ${ccrfCodeCodeQueryFragment}
                      WHERE category = $$${res.category}$$
                      AND subcategories = ARRAY[${res.subCategoryTree
                        .map(x => {
                          return `$$${x}$$`
                        })
                        .join(',')}]::varchar[]
                      AND creation_date > '2022-01-01'::timestamp
                      AND ccrf_code = '{}'
                      ;`)
    }

    if (reponseConsoCodeQueryFragment) {
      console.log(`UPDATE reports
                      ${reponseConsoCodeQueryFragment} 
                      WHERE category = $$${res.category}$$
                      AND subcategories = ARRAY[${res.subCategoryTree
                        .map(x => {
                          return `$$${x}$$`
                        })
                        .join(',')}]::varchar[]
                      AND creation_date > '2022-01-01'::timestamp
                      AND reponseconso_code = '{}'
                      ;`)
    }
  })
})
