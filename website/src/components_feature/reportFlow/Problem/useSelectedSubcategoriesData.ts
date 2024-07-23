import {Subcategory} from 'shared/anomalies/Anomaly'

export function computeSelectedSubcategoriesData(selectedSubCategories: Subcategory[]) {
  const lastSubcategories: Subcategory | undefined = selectedSubCategories[selectedSubCategories.length - 1]

  const isLastSubcategory = lastSubcategories && !lastSubcategories.subcategories

  const companyKindQuestion = [...selectedSubCategories].reverse().find(_ => !!_.companyKindQuestion)?.companyKindQuestion

  return {
    companyKindQuestion,
    lastSubcategory: lastSubcategories,
    isLastSubcategory,
  }
}
