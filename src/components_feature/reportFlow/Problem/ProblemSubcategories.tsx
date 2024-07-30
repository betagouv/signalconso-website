import {instanceOfSubcategoryWithInfoWall} from '@/anomalies/Anomalies'
import {Anomaly, Subcategory} from '@/anomalies/Anomaly'
import {hasStep0} from '@/feature/reportDraftUtils'
import {ReportDraft2} from '@/model/ReportDraft2'
import {ReactNode} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'

export function ProblemSubcategories({
  children,
  anomaly,
  subcategories,
  isLastSubcategory,
  lastSubcategories,
  isWebView,
}: {
  children: () => ReactNode
  anomaly: Anomaly
  subcategories: Subcategory[]
  isLastSubcategory: boolean
  lastSubcategories: Subcategory
  isWebView: boolean
}) {
  const {setReportDraft} = useReportFlowContext()
  const handleSubcategoriesChange = (subcategoryIndex: number, subcategoryDepthIndex: number) => {
    setReportDraft(report => {
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
        (instanceOfSubcategoryWithInfoWall(lastSubcategories) ? (
          <ProblemInformation
            anomaly={anomaly}
            subcategories={subcategories}
            information={lastSubcategories.blockingInfo}
            {...{isWebView}}
          />
        ) : (
          children()
        ))}
    </>
  )
}

function applySubcategoriesChange(
  report: Partial<ReportDraft2>,
  subcategoryIndex: number,
  subcategoryDepthIndex: number,
): Partial<ReportDraft2> {
  if (!hasStep0(report)) {
    throw new Error('ReportDraft should have a lang and a category already')
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
