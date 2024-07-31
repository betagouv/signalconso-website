import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {
  getCompanyKind,
  getTags,
  hasEmployeeConsumer,
  hasStep0,
  hasSubcategoryIndexes,
  isTransmittableToProBeforePickingConsumerWish,
} from '@/feature/reportDraftUtils'
import {useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/ReportDraft'
import {ReactNode, useEffect} from 'react'
import {SetReportDraft, useReportFlowContext} from '../ReportFlowContext'
import {ProblemConsumerWishInformation} from './ProblemConsumerWishInformation'
import {ProblemSelect} from './ProblemSelect'

export function ProblemConsumerWish({children}: {children: () => ReactNode}) {
  const {m} = useI18n()
  const _analytic = useAnalyticContext()
  const {reportDraft: r, setReportDraft} = useReportFlowContext()
  if (!hasStep0(r) || !hasSubcategoryIndexes(r) || !hasEmployeeConsumer(r)) {
    throw new Error(`Report is not ready for asking consumer wish`)
  }
  const hasReponseConsoTag = getTags(r).includes('ReponseConso')
  const isTransmittable = isTransmittableToProBeforePickingConsumerWish(r)
  const companyKind = getCompanyKind(r)
  const predeterminedValue = !isTransmittable || companyKind === 'SOCIAL' ? 'companyImprovement' : undefined
  const skipQuestion = useApplyPredeterminedValue({predeterminedValue, setReportDraft})
  const isDone = !!r.consumerWish
  return (
    <>
      {!skipQuestion && (
        <>
          <ProblemSelect
            id="select-contractualDispute"
            title={m.whatsYourIntent}
            value={r.consumerWish}
            options={[
              {
                title: m.problemContractualDisputeFormYes,
                description: m.problemContractualDisputeFormDesc,
                value: 'fixContractualDispute',
              },
              {
                title: m.problemContractualDisputeFormNo,
                description: m.problemContractualDisputeFormNoDesc,
                value: 'companyImprovement',
              },
              ...(hasReponseConsoTag
                ? [
                    {
                      title: m.problemContractualDisputeFormReponseConso,
                      description: m.problemContractualDisputeFormReponseConsoExample,
                      value: 'getAnswer' as const,
                    },
                  ]
                : []),
            ]}
            onChange={(consumerWish: ConsumerWish) => {
              setReportDraft(report => {
                const updated = {...report, consumerWish}
                _analytic.trackEvent(EventCategories.report, ReportEventActions.consumerWish, updated.consumerWish)
                return updated
              })
            }}
          />
          {r.consumerWish && <ProblemConsumerWishInformation consumerWish={r.consumerWish} />}
        </>
      )}
      {isDone && children()}
    </>
  )
}

function useApplyPredeterminedValue({
  predeterminedValue,
  setReportDraft,
}: {
  predeterminedValue: ConsumerWish | undefined
  setReportDraft: SetReportDraft
}) {
  useEffect(() => {
    if (predeterminedValue !== undefined) {
      setReportDraft(_ => ({
        ..._,
        consumerWish: predeterminedValue,
      }))
    }
  }, [setReportDraft, predeterminedValue])
  const shouldSkipQuestion = predeterminedValue !== undefined
  return shouldSkipQuestion
}
