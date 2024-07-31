import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {NextStepButton} from '@/components_feature/reportFlow/reportFlowStepper/NextStepButton'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {OpenFfWelcomeText, useOpenFfSetupLoaded as useHandleOpenFfSetupLoaded, useOpenFfSetup} from '@/feature/openFoodFacts'
import {RappelConsoWelcome, useHandleRcSetupLoaded, useRappelConsoSetup} from '@/feature/rappelConso'
import {hasStep0} from '@/feature/reportUtils'
import {initiateReport} from '@/feature/reportUtils2'
import {useI18n} from '@/i18n/I18n'
import {Step2Model} from '@/model/Step2Model'
import {useEffect} from 'react'
import {Anomaly} from '../../../anomalies/Anomaly'
import {SendReportEvent, SetReport, useReportFlowContext} from '../ReportFlowContext'
import {ProblemCompanyKindOverride} from './ProblemCompanyKindOverride'
import {ProblemConsumerWish} from './ProblemConsumerWish'
import {ProblemEmployeeConsumer} from './ProblemEmployeeConsumer'
import {ProblemSubcategories} from './ProblemSubcategories'

interface Props {
  anomaly: Anomaly
  isWebView: boolean
  stepNavigation: StepNavigation
}

export function Problem({anomaly, isWebView, stepNavigation}: Props) {
  const {report: report, setReport: setReport, resetFlow} = useReportFlowContext()
  const {currentLang} = useI18n()
  const _analytic = useAnalyticContext()
  const isDraftInitialized = hasStep0(report) && anomaly.category === report.step0.category
  useEffect(() => {
    if (!isDraftInitialized) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      resetFlow()
      setReport(_ => initiateReport(anomaly, currentLang))
    }
  }, [isDraftInitialized, setReport, anomaly, currentLang, _analytic, resetFlow])
  if (!isDraftInitialized) {
    return null
  }
  return <ProblemInner {...{anomaly, isWebView, stepNavigation}} />
}

function ProblemInner({anomaly, isWebView, stepNavigation}: Props) {
  const {report: report, setReport: setReport, sendReportEvent} = useReportFlowContext()
  if (!hasStep0(report)) {
    throw new Error('Report should have a lang and a category already (in Problem)')
  }
  const openFfSetup = useOpenFfSetup(anomaly)
  const rappelConsoSetup = useRappelConsoSetup(anomaly)
  useHandleOpenFfSetupLoaded(openFfSetup, setReport)
  useHandleRcSetupLoaded(rappelConsoSetup, setReport)
  const specialCategoriesNotLoading = openFfSetup.status !== 'loading' && rappelConsoSetup.status !== 'loading'
  const onNext = buildOnNext({sendReportEvent, setReport: setReport, stepNavigation})
  return (
    <>
      <OpenFfWelcomeText setup={openFfSetup} />
      <RappelConsoWelcome setup={rappelConsoSetup} />
      {specialCategoriesNotLoading && (
        <ProblemSubcategories {...{isWebView}}>
          {() => (
            <ProblemEmployeeConsumer>
              {() => (
                <ProblemCompanyKindOverride>
                  {() => {
                    return <ProblemConsumerWish>{() => <NextStepButton {...{onNext, stepNavigation}} />}</ProblemConsumerWish>
                  }}
                </ProblemCompanyKindOverride>
              )}
            </ProblemEmployeeConsumer>
          )}
        </ProblemSubcategories>
      )}
    </>
  )
}

function buildOnNext({
  setReport: setReport,
  stepNavigation,
  sendReportEvent,
}: {
  setReport: SetReport
  stepNavigation: StepNavigation
  sendReportEvent: SendReportEvent
}) {
  return function onNext(next: () => void): void {
    setReport(draft => {
      // In the openFf scenario
      // Only if we got all the data, then we build the company/product from it.
      // If we only have partial data, then we will build it in step 2.
      const step2: Step2Model | undefined =
        draft.openFf && draft.openFf.product && draft.openFf.company
          ? {
              kind: 'product',
              barcodeProduct: draft.openFf.product,
              companyIdentification: {
                kind: 'companyFound',
                company: draft.openFf.company,
              },
            }
          : draft.step2
      return {
        ...draft,
        step2,
      }
    })
    sendReportEvent(stepNavigation.currentStep)
    next()
  }
}
