import {instanceOfSubcategoryInformation} from 'anomaly/Anomalies'
import {useMemo} from 'react'
import {Category, Subcategory} from '../../../anomaly/Anomaly'

export const useSelectedSubcategoriesUtils = (anomaly: Category, selectedSubCategories: Subcategory[]) => {
  const tagsFromSelected = useMemo(() => {
    return (selectedSubCategories ?? []).flatMap(_ => _.tags ?? [])
  }, [selectedSubCategories])

  const lastSubcategories: Subcategory | undefined = useMemo(() => {
    return selectedSubCategories[selectedSubCategories.length - 1]
  }, [selectedSubCategories])

  const isLastSubcategory = useMemo(() => {
    return lastSubcategories && !lastSubcategories.subcategories
  }, [lastSubcategories])

  const showEmployeeConsumer = useMemo(() => {
    return !instanceOfSubcategoryInformation(lastSubcategories)
  }, [isLastSubcategory])

  const companyKindFromSelected = useMemo(() => {
    return [...selectedSubCategories].reverse().find(_ => !!_.companyKind)?.companyKind
  }, [selectedSubCategories])

  return {
    companyKindFromSelected,
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
  }
}
