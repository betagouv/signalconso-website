import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {
  getCompanyKind,
  getTags,
  hasEmployeeConsumer,
  hasStep0,
  hasSubcategoryIndexes,
  isTransmittableToProBeforePickingConsumerWish,
} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/Report'
import {ReactNode, useEffect} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemConsumerWishInformation} from './ProblemConsumerWishInformation'
import {ProblemSelect} from './ProblemSelect'

export function ProblemConsumerWish({children}: {children: ReactNode}) {
  const {m} = useI18n()
  const _analytic = useAnalyticContext()
  const {report: r, setConsumerWish} = useReportFlowContext()
  if (!hasStep0(r) || !hasSubcategoryIndexes(r) || !hasEmployeeConsumer(r)) {
    throw new Error(`Report is not ready for asking consumer wish`)
  }
  const hasReponseConsoTag = getTags(r).includes('ReponseConso')
  const isTransmittable = isTransmittableToProBeforePickingConsumerWish(r)
  const companyKind = getCompanyKind(r)
  const predeterminedValue = !isTransmittable || companyKind === 'SOCIAL' ? 'companyImprovement' : undefined
  const skipQuestion = useApplyPredeterminedValue({predeterminedValue, setConsumerWish})
  const isDone = !!r.step1.consumerWish
  return (
    <>
      {skipQuestion && !r.step1?.employeeConsumer && (
        <FriendlyHelpText>
          <p className="mb-0" dangerouslySetInnerHTML={{__html: m.notTransmittableToProConsumerInformation}} />
        </FriendlyHelpText>
      )}
      {!skipQuestion && (
        <>
          <ProblemSelect
            id="select-contractualDispute"
            title={m.whatsYourIntent}
            value={r.step1.consumerWish}
            options={[
              {
                title: m.problemContractualDisputeFormNo,
                description: m.problemContractualDisputeFormNoExample,
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
              _analytic.trackEvent(EventCategories.report, ReportEventActions.consumerWish, consumerWish)
              setConsumerWish(consumerWish)
            }}
          />
          {r.step1.consumerWish && <ProblemConsumerWishInformation consumerWish={r.step1.consumerWish} />}
        </>
      )}
      {isDone && children}
    </>
  )
}

function useApplyPredeterminedValue({
  predeterminedValue,
  setConsumerWish,
}: {
  predeterminedValue: ConsumerWish | undefined
  setConsumerWish: (_: ConsumerWish) => void
}) {
  useEffect(() => {
    if (predeterminedValue !== undefined) {
      setConsumerWish(predeterminedValue)
    }
  }, [setConsumerWish, predeterminedValue])
  const shouldSkipQuestion = predeterminedValue !== undefined
  return shouldSkipQuestion
}
