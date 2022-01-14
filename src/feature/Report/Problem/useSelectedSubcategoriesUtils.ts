import {useMemo} from 'react'
import {AnomalyClient, Category, Subcategory} from '@signal-conso/signalconso-api-sdk-js'

// const getSubcategory = (anomaly: Subcategory, path: string[]): Subcategory[] => {
//   const res = [anomaly]
//   const [current, ...nextPath] = path
//   if (current) {
//     const pickedCategory = anomaly.subcategories?.find(_ => _.title === current)
//     if (pickedCategory) {
//       res.push(...getSubcategory(pickedCategory, nextPath))
//     }
//   }
//   return res
// }

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
    return !AnomalyClient.instanceOfSubcategoryInformation(lastSubcategories)
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
