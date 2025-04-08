import {instanceOfSubcategoryWithInfoWall} from '@/anomalies/Anomalies'
import {getAnomaly, getSubcategories, hasStep0, hasSubcategoryIndexes} from '@/feature/reportUtils'
import {ReactNode} from 'react'
import {PartialReport, useReportFlowContext} from '../ReportFlowContext'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'
import {usePathname, useSearchParams} from 'next/navigation'

export function ProblemSubcategories({children, isWebView}: {children: ReactNode; isWebView: boolean}) {
  const {report: r, setReport} = useReportFlowContext()
  if (!hasStep0(r)) {
    throw new Error('Draft is not ready to ask for subcategories')
  }

  const searchParams = useSearchParams()
  const pathname = usePathname()

  const anomaly = getAnomaly(r)
  const subcategories = hasSubcategoryIndexes(r) ? getSubcategories(r) : []
  const {lastSubcategory, isLastSubcategory} = computeSelectedSubcategoriesData(subcategories)
  const handleSubcategoriesChange = (subcategoryIndex: number, subcategoryDepthIndex: number) => {
    // To clean the URL from subcategories once the use chose his path.
    const params = new URLSearchParams(searchParams)
    if (params.get('subcategories')) {
      params.delete('subcategories')
      const newUrl = `${pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)
    }

    setReport(report => {
      return applySubcategoriesChange(report, subcategoryIndex, subcategoryDepthIndex)
    })
  }
  return (
    <>
      {[anomaly, ...subcategories].map(
        (category, subcategoryDepthIdx) =>
          category.subcategories && (
            <ProblemSelect
              autoScrollTo={subcategoryDepthIdx !== 0}
              key={category.id}
              title={category.subcategoriesTitle}
              value={subcategories[subcategoryDepthIdx]?.id}
              onChange={id =>
                handleSubcategoriesChange(category.subcategories?.findIndex(_ => _.id === id)!, subcategoryDepthIdx)
              }
              options={(category.subcategories ?? []).map((_, i) => ({
                title: _.title,
                description: _.desc,
                value: _.id,
              }))}
            />
          ),
      )}
      {isLastSubcategory &&
        (instanceOfSubcategoryWithInfoWall(lastSubcategory) ? (
          <ProblemInformation
            anomaly={anomaly}
            subcategories={subcategories}
            information={lastSubcategory.blockingInfo}
            {...{isWebView}}
          />
        ) : (
          children
        ))}
    </>
  )
}

export function applySubcategoriesChange(
  report: PartialReport,
  subcategoryIndex: number,
  subcategoryDepthIndex: number,
): PartialReport {
  if (!hasStep0(report)) {
    throw new Error('Report should have a lang and a category already')
  }
  const newSubcategoriesIndexes = [
    ...(report.step1?.subcategoriesIndexes ?? []).slice(0, subcategoryDepthIndex),
    subcategoryIndex,
  ]

  return {
    ...report,
    step1: {
      ...report.step1,
      subcategoriesIndexes: newSubcategoriesIndexes,
      // Subcategory has changed, we clear consumerWish & employeeConsumer because :
      // - Some subcats have "getAnswer" (that is not available for all subcats so we have to clean up those properties)
      // - Some subcats set default values for these properties (CompanyKind SOCIAL)
      consumerWish: undefined,
      employeeConsumer: undefined,
      companyKindOverride: undefined,
    },
    step2: undefined,
  }
}
