import {AnalyticContextProps, useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {NextStepButton} from '@/components_feature/reportFlow/reportFlowStepper/NextStepButton'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {OpenFfWelcomeText, useOpenFfSetup, useOpenFfSetupLoaded as useHandleOpenFfSetupLoaded} from '@/feature/openFoodFacts'
import {RappelConsoWelcome, useHandleRcSetupLoaded, useRappelConsoSetup} from '@/feature/rappelConso'
import {getCompanyKind, hasStep0, hasStep1Full} from '@/feature/reportUtils'
import {initiateReport} from '@/feature/reportUtils2'
import {useI18n} from '@/i18n/I18n'
import {Step2Model} from '@/model/Step2Model'
import {useEffect} from 'react'
import {Anomaly} from 'shared/anomalies/Anomaly'
import {SendReportEvent, SetReport, useReportFlowContext} from '../ReportFlowContext'
import {ProblemCompanyKindOverride} from './ProblemCompanyKindOverride'
import {ProblemConsumerWish} from './ProblemConsumerWish'
import {ProblemEmployeeConsumer} from './ProblemEmployeeConsumer'
import {applySubcategoriesChange, ProblemSubcategories} from './ProblemSubcategories'

interface Props {
  anomaly: Anomaly
  isWebView: boolean
  stepNavigation: StepNavigation
  path?: number[]
}

export function Problem({anomaly, isWebView, stepNavigation, path}: Props) {
  const {report, setReport, resetReport} = useReportFlowContext()
  const {currentLang} = useI18n()
  const _analytic = useAnalyticContext()
  const isDraftInitialized = hasStep0(report) && anomaly.category === report.step0.category
  useEffect(() => {
    if (!isDraftInitialized) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      resetReport()
      setReport(_ => initiateReport(anomaly, currentLang))
    }
  }, [isDraftInitialized, setReport, anomaly, currentLang, _analytic, resetReport])
  if (!isDraftInitialized) {
    return null
  }
  return <ProblemInner {...{anomaly, isWebView, stepNavigation, path}} />
}

function ProblemInner({anomaly, isWebView, stepNavigation, path}: Props) {
  const _analytic = useAnalyticContext()
  const {report, setReport, sendReportEvent} = useReportFlowContext()
  if (!hasStep0(report)) {
    throw new Error('Report should have a lang and a category already (in Problem)')
  }
  const openFfSetup = useOpenFfSetup(anomaly)
  const rappelConsoSetup = useRappelConsoSetup(anomaly)
  useHandleOpenFfSetupLoaded(openFfSetup, setReport)
  useHandleRcSetupLoaded(rappelConsoSetup, setReport)
  useEffect(() => {
    if (setReport && path && path.length > 0) {
      setReport(report =>
        path.reduce(
          (newReport, subcategoryIndex, subcategoryDepthIndex) =>
            applySubcategoriesChange(newReport, subcategoryIndex, subcategoryDepthIndex),
          report,
        ),
      )
    }
  }, [path, setReport])
  const specialCategoriesNotLoading = openFfSetup.status !== 'loading' && rappelConsoSetup.status !== 'loading'
  const onNext = buildOnNext({sendReportEvent, setReport, stepNavigation, _analytic})
  return (
    <>
      <OpenFfWelcomeText setup={openFfSetup} />
      <RappelConsoWelcome setup={rappelConsoSetup} />
      {specialCategoriesNotLoading && (
        <ProblemSubcategories {...{isWebView}}>
          <ProblemEmployeeConsumer>
            <ProblemCompanyKindOverride>
              <ProblemConsumerWish>
                <NextStepButton {...{onNext, stepNavigation}} />
              </ProblemConsumerWish>
            </ProblemCompanyKindOverride>
          </ProblemEmployeeConsumer>
        </ProblemSubcategories>
      )}
    </>
  )
}

function buildOnNext({
  setReport: setReport,
  stepNavigation,
  sendReportEvent,
  _analytic,
}: {
  setReport: SetReport
  stepNavigation: StepNavigation
  sendReportEvent: SendReportEvent
  _analytic: AnalyticContextProps
}) {
  return function (next: () => void): void {
    setReport(draft => {
      if (!hasStep0(draft) || !hasStep1Full(draft)) {
        throw new Error(`Report is not ready to go to step2`)
      }
      _analytic.setTrackedCompanyKind(getCompanyKind(draft))
      // In the openFf scenario
      // Only if we got all the data, then we build the company/product from it.
      // If we only have partial data, then we will build it in step 2.
      const {openFf} = draft.step1
      const step2: Step2Model | undefined =
        openFf && openFf.product && openFf.company
          ? {
              kind: 'product',
              barcodeProduct: openFf.product,
              companyIdentification: {
                kind: 'companyFound',
                company: openFf.company,
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
