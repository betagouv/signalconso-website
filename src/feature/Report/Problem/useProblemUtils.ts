import {useMemo} from 'react'
import {AnomalyClient, Category, Subcategory} from '@signal-conso/signalconso-api-sdk-js'

const getSubcategory = (anomaly: Subcategory, path: string[]): Subcategory[] => {
  const res = [anomaly]
  const [current, ...nextPath] = path
  if (current) {
    const pickedCategory = anomaly.subcategories?.find(_ => _.title === current)
    if (pickedCategory) {
      res.push(...getSubcategory(pickedCategory, nextPath))
    }
  }
  return res
}

export const useProblemUtils = (anomaly: Category, selectedTitle: string[]) => {
  const selectedSubCategories = useMemo(() => {
    return getSubcategory(anomaly as Subcategory, selectedTitle)
  }, [selectedTitle])

  const tagsFromSelected = useMemo(() => {
    return (selectedSubCategories ?? []).flatMap(_ => _.tags ?? [])
  }, [selectedSubCategories])

  const lastSubcategories = useMemo(() => {
    return selectedSubCategories.slice(-1)[0]
  }, [selectedSubCategories])

  const isLastSubcategory = useMemo(() => {
    return !!lastSubcategories.subcategories
  }, [lastSubcategories])

  const showEmployeeConsumer = useMemo(() => {
    return isLastSubcategory && AnomalyClient.instanceOfSubcategoryInformation(lastSubcategories)
  }, [isLastSubcategory])

  return {
    selectedSubCategories,
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
  }
}
