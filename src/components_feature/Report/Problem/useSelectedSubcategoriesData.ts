import {instanceOfSubcategoryInformation} from 'anomalies/Anomalies'
import {Subcategory} from '../../../anomalies/Anomaly'

export function computeSelectedSubcategoriesData(selectedSubCategories: Subcategory[]) {
  const tagsFromSelected = selectedSubCategories.flatMap(_ => _.tags ?? [])

  const lastSubcategories: Subcategory | undefined = selectedSubCategories[selectedSubCategories.length - 1]

  const isLastSubcategory = lastSubcategories && !lastSubcategories.subcategories

  const showEmployeeConsumer = !instanceOfSubcategoryInformation(lastSubcategories)

  const companyKindFromSelected = [...selectedSubCategories].reverse().find(_ => !!_.companyKind)?.companyKind

  return {
    companyKindFromSelected,
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
  }
}
