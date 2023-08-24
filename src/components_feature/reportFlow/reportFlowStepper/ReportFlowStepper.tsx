import {useAnalyticContext} from 'analytic/AnalyticContext'
import {Anomaly} from 'anomalies/Anomaly'
import {Acknowledgement} from 'components_feature/reportFlow/Acknowledgement/Acknowledgement'
import {Company} from 'components_feature/reportFlow/Company/Company'
import {Confirmation} from 'components_feature/reportFlow/Confirmation/Confirmation'
import {Consumer} from 'components_feature/reportFlow/Consumer/Consumer'
import {Details} from 'components_feature/reportFlow/Details/Details'
import {Problem} from 'components_feature/reportFlow/Problem/Problem'
import {useReportFlowContext} from 'components_feature/reportFlow/ReportFlowContext'
import {useReportCreateContext} from 'components_feature/reportFlow/ReportCreateContext'
import {
  findCurrentStepForReport,
  firstReportStep,
  getAnalyticsForStep,
  getIndexForStep,
  getIndexForStepOrDone,
  getNextStep,
  getPreviousStep,
  indexToStepOrDone,
  isStepBeforeOrEqual,
  ReportStepOrDone,
} from 'model/ReportStep'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {scrollTop} from 'utils/utils'
import {buildLinkStartReport} from 'core/pagesDefinitions'
import {NewReportFlowStepperHeader, ReportFlowStepperHeader} from './ReportFlowStepperHeader'
import {useSearchParams} from 'next/navigation'
import dynamic from 'next/dynamic'
import {useI18n} from '../../../i18n/I18n'
import {AppLang} from '../../../i18n/localization/AppLangs'

interface StepperProps {
  anomaly: Anomaly
  isWebView: boolean
}

export interface StepNavigation {
  currentStep: ReportStepOrDone
  goTo: (step: ReportStepOrDone) => void
  next: () => void
  prev: () => void
}

function useStepChangeTracking(anomaly: Anomaly, currentStep: ReportStepOrDone, isWebView: boolean) {
  const _analytics = useAnalyticContext()
  useEffect(() => {
    const {path, title} = getAnalyticsForStep(currentStep)
    isWebView && window.ReactNativeWebView?.postMessage('step=' + getIndexForStepOrDone(currentStep) + 1)
    _analytics.trackPage(`/${anomaly.path}/${path}`, title)
  }, [currentStep])
}

function parseStepFromQueryString(stepParamRaw: string | string[] | undefined | null): ReportStepOrDone | null {
  try {
    if (typeof stepParamRaw === 'string') {
      return indexToStepOrDone(parseInt(stepParamRaw, 10))
    }
  } catch (err) {
    console.error(err)
  }
  return null
}

export function buildPathForStep(anomaly: Pick<Anomaly, 'path'>, lang: AppLang, step: ReportStepOrDone, isWebView: boolean) {
  const queryString = step === firstReportStep ? '' : `?step=${getIndexForStepOrDone(step)}`
  return `${buildLinkStartReport(anomaly, lang, {isWebView})}${queryString}`
}

function useStepFromRouter(anomaly: Anomaly, isWebView: boolean) {
  const query = useSearchParams()
  const router = useRouter()
  const {currentLang} = useI18n()
  const step = (query && parseStepFromQueryString(query.get('step'))) ?? firstReportStep

  function setStep(newStep: ReportStepOrDone) {
    const url = buildPathForStep(anomaly, currentLang, newStep, isWebView)
    router.push(url)
    scrollTop()
  }

  return [step, setStep] as const
}

function useIsStepInvalid(anomaly: Anomaly, step: ReportStepOrDone): boolean {
  const _reportFlow = useReportFlowContext()
  const _reportCreate = useReportCreateContext()
  const {reportDraft} = _reportFlow
  if (step !== firstReportStep) {
    if (step === 'Done') {
      if (!_reportCreate.createReportMutation.data) {
        // No report that was created
        // the user probably jumped directly to ?step=6
        return true
      }
    } else if (!isStepBeforeOrEqual(step, findCurrentStepForReport(reportDraft))) {
      // the draft is not ready for this step
      // the user probably jumped directly to an URL like ?step=5
      return true
    } else if (reportDraft.category !== anomaly.category) {
      // the draft is not for this category
      // not sure this could happen. Can't hurt to check
      return true
    }
  }
  return false
}

export const ReportFlowStepper = ({anomaly, isWebView}: StepperProps) => {
  const [step, setStep] = useStepFromRouter(anomaly, isWebView)
  const isStepInvalid = useIsStepInvalid(anomaly, step)
  useStepChangeTracking(anomaly, step, isWebView)
  useEffect(() => {
    if (isStepInvalid) {
      console.warn(`Invalid step for the current state. Redirecting to first step`)
      setStep(firstReportStep)
    }
  }, [isStepInvalid, setStep])

  const isDone = step === 'Done'

  const stepNavigation: StepNavigation = {
    currentStep: step,
    goTo: setStep,
    next: () => {
      if (!isDone) {
        setStep(getNextStep(step))
      }
    },
    prev: () => {
      if (!isDone) {
        setStep(getPreviousStep(step))
      }
    },
  }

  if (isStepInvalid) {
    // Il va y avoir un redirect, évitons de render
    return null
  }

  return (
    <>
      {/* <NewReportFlowStepperHeader currentStep={step} /> */}
      <ReportFlowStepperHeader currentStep={step} goTo={setStep} />
      {step === 'BuildingProblem' && <Problem {...{isWebView, anomaly, stepNavigation}} />}
      {step === 'BuildingDetails' && <Details {...{stepNavigation}} />}
      {step === 'BuildingCompany' && <Company {...{stepNavigation}} />}
      {step === 'BuildingConsumer' && <Consumer {...{stepNavigation}} />}
      {step === 'Confirmation' && <Confirmation {...{isWebView, stepNavigation}} />}
      {step === 'Done' && <Acknowledgement {...{isWebView}} />}
    </>
  )
}