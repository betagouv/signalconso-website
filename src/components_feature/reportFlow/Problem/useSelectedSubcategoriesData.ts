import {instanceOfSubcategoryWithInfoWall} from '@/anomalies/Anomalies'
import {lastFromArray, notUndefined} from '@/utils/utils'
import {Anomaly, Subcategory} from '../../../anomalies/Anomaly'

export function computeSelectedSubcategoriesData(anomaly: Anomaly, selectedSubCategories: Subcategory[]) {
  const tagsFromSelected = selectedSubCategories.flatMap(_ => _.tags ?? [])

  // 2023-12 ReponseConso says we should not send them multiple reponseConso codes, it breaks something for them
  // We should send only one code maximum, and it doesn't really matter which one
  const responseconsoCodeFromSelected = lastFromArray(selectedSubCategories.map(_ => _.reponseconsoCode).filter(notUndefined))

  const ccrfCodeFromSelected = selectedSubCategories.flatMap(_ => _.ccrfCode ?? [])

  const lastSubcategories: Subcategory | undefined = selectedSubCategories[selectedSubCategories.length - 1]

  const isLastSubcategory = lastSubcategories && !lastSubcategories.subcategories

  const showEmployeeConsumer = !instanceOfSubcategoryWithInfoWall(lastSubcategories)

  const companyKindFromSelected =
    anomaly.specialCategory === 'OpenFoodFacts'
      ? 'PRODUCT_OPENFF'
      : anomaly.specialCategory === 'RappelConso'
        ? 'PRODUCT_RAPPEL_CONSO'
        : [...selectedSubCategories].reverse().find(_ => !!_.companyKind)?.companyKind

  const companyKindQuestionFromSelected = [...selectedSubCategories]
    .reverse()
    .find(_ => !!_.companyKindQuestion)?.companyKindQuestion

  const categoryOverrideFromSelected = [...selectedSubCategories].reverse().find(_ => !!_.categoryOverride)?.categoryOverride

  return {
    companyKindFromSelected,
    companyKindQuestionFromSelected,
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
    responseconsoCodeFromSelected,
    ccrfCodeFromSelected,
    categoryOverrideFromSelected,
  }
}
