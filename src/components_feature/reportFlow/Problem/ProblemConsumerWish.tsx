import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/ReportDraft'
import {ReactNode} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemConsumerWishInformation} from './ProblemConsumerWishInformation'
import {ProblemSelect} from './ProblemSelect'

export function ProblemConsumerWish({
  children,
  askConsumerWish,
  hasReponseConsoTag,
}: {
  children: () => ReactNode
  askConsumerWish: boolean
  hasReponseConsoTag: boolean
}) {
  const {m} = useI18n()
  const _analytic = useAnalyticContext()
  const {reportDraft, setReportDraft} = useReportFlowContext()
  const hidden = !askConsumerWish
  const isDone = hidden || !!reportDraft.consumerWish
  return (
    <>
      {!hidden && (
        <>
          <ProblemSelect
            id="select-contractualDispute"
            title={m.whatsYourIntent}
            value={reportDraft.consumerWish}
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
          {reportDraft.consumerWish && <ProblemConsumerWishInformation consumerWish={reportDraft.consumerWish} />}
        </>
      )}

      {isDone && children()}
    </>
  )
}
