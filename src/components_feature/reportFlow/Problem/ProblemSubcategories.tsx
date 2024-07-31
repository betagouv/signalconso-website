import {instanceOfSubcategoryWithInfoWall} from '@/anomalies/Anomalies'
import {getAnomaly, getSubcategories, hasStep0, hasSubcategoryIndexes} from '@/feature/reportUtils'
import {ReactNode} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'

export function ProblemSubcategories({children, isWebView}: {children: () => ReactNode; isWebView: boolean}) {
  const {report: r, setReport: setReport} = useReportFlowContext()
  if (!hasStep0(r)) {
    throw new Error('Draft is not ready to ask for subcategories')
  }
  const anomaly = getAnomaly(r)
  const subcategories = hasSubcategoryIndexes(r) ? getSubcategories(r) : []
  const {lastSubcategory, isLastSubcategory} = computeSelectedSubcategoriesData(subcategories)
  const handleSubcategoriesChange = (subcategoryIndex: number, subcategoryDepthIndex: number) => {
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
          children()
        ))}
    </>
  )
}

function applySubcategoriesChange(report: ReportWip, subcategoryIndex: number, subcategoryDepthIndex: number): ReportWip {
  if (!hasStep0(report)) {
    throw new Error('Report should have a lang and a category already')
  }
  const newSubcategoriesIndexes = [...(report.subcategoriesIndexes ?? []).slice(0, subcategoryDepthIndex), subcategoryIndex]
  return {
    ...report,
    subcategoriesIndexes: newSubcategoriesIndexes,
    step2: undefined,
    // Subcategory has changed, we clear consumerWish & employeeConsumer because :
    // - Some subcats have "getAnswer" (that is not available for all subcats so we have to clean up those properties)
    // - Some subcats set default values for these properties (CompanyKind SOCIAL)
    consumerWish: undefined,
    employeeConsumer: undefined,
    companyKindOverride: undefined,
  }
}
