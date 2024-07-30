import {instanceOfSubcategoryWithInfoWall} from '@/anomalies/Anomalies'
import {lastFromArray, notUndefined} from '@/utils/utils'
import {Anomaly, Subcategory} from '../../../anomalies/Anomaly'

export function computeSelectedSubcategoriesData(anomaly: Anomaly, selectedSubCategories: Subcategory[]) {
  const tagsFromSelected = selectedSubCategories.flatMap(_ => _.tags ?? [])

  // 2023-12 ReponseConso says we should not send them multiple reponseConso codes, it breaks something for them
  // We should send only one code maximum, and it doesn't really matter which one
  const reponseconsoCode = lastFromArray(selectedSubCategories.map(_ => _.reponseconsoCode).filter(notUndefined))

  const ccrfCode = selectedSubCategories.flatMap(_ => _.ccrfCode ?? [])

  const lastSubcategories: Subcategory | undefined = selectedSubCategories[selectedSubCategories.length - 1]

  const isLastSubcategory = lastSubcategories && !lastSubcategories.subcategories

  const showEmployeeConsumer = !instanceOfSubcategoryWithInfoWall(lastSubcategories)

  const companyKindQuestion = [...selectedSubCategories].reverse().find(_ => !!_.companyKindQuestion)?.companyKindQuestion

  const categoryOverride = [...selectedSubCategories].reverse().find(_ => !!_.categoryOverride)?.categoryOverride

  return {
    companyKindQuestion,
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
    reponseconsoCode,
    ccrfCode,
    categoryOverride,
  }
}
