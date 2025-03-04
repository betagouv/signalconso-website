import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {getCompanyKind, getTags, hasEmployeeConsumer, hasStep0, hasSubcategoryIndexes} from '@/feature/reportUtils'
import {getEarlyTransmissionStatus} from '@/feature/transmissionStatus'
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
  const tags = getTags(r)
  const hasTelecomTag = tags.includes('Telecom')
  const hasReponseConsoTag = tags.includes('ReponseConso')
  const transmissionStatus = getEarlyTransmissionStatus(r)
  const isTransmittable = transmissionStatus.kind !== 'NOT_TRANSMITTABLE'
  const companyKind = getCompanyKind(r)
  const predeterminedValue = !isTransmittable || companyKind === 'SOCIAL' || !hasReponseConsoTag ? 'reportSomething' : undefined
  const skipQuestion = useApplyPredeterminedValue({predeterminedValue, setConsumerWish})
  const isDone = !!r.step1.consumerWish
  return (
    <>
      {!skipQuestion && (
        <>
          <ProblemSelect
            id="select-contractualDispute"
            title={m.whatsYourIntent}
            value={r.step1.consumerWish}
            options={[
              {
                title: m.reportAProblem,
                description: m.reportAProblemExample,
                value: 'reportSomething',
              },
              {
                title: m.askQuestionToReponseConso,
                description: m.askQuestionToReponseConsoExample,
                value: 'getAnswer' as const,
              },
            ]}
            onChange={(consumerWish: ConsumerWish) => {
              _analytic.trackEvent(EventCategories.report, ReportEventActions.consumerWish, consumerWish)
              setConsumerWish(consumerWish)
            }}
          />
          {r.step1.consumerWish && <ProblemConsumerWishInformation consumerWish={r.step1.consumerWish} {...{hasTelecomTag}} />}
        </>
      )}
      {(() => {
        const {kind} = transmissionStatus
        switch (kind) {
          case 'NOT_TRANSMITTABLE':
            const {reason} = transmissionStatus
            switch (reason) {
              case 'employeeConsumer':
                return (
                  <FriendlyHelpText>
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: m.employeeConsumerInformation}} />
                  </FriendlyHelpText>
                )
              default:
                return (
                  <FriendlyHelpText>
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: m.notTransmittableToProConsumerInformation}} />
                  </FriendlyHelpText>
                )
            }
          case 'SO_FAR_SO_GOOD':
            return predeterminedValue ? (
              <ProblemConsumerWishInformation consumerWish={predeterminedValue} {...{hasTelecomTag}} />
            ) : null
          default:
            return kind satisfies never
        }
      })()}
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
