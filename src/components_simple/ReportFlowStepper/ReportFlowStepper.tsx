import {useAnalyticContext} from 'analytic/AnalyticContext'
import {Anomaly} from 'anomalies/Anomaly'
import {Acknowledgement} from 'components_feature/Report/Acknowledgement/Acknowledgement'
import {Company} from 'components_feature/Report/Company/Company'
import {Confirmation} from 'components_feature/Report/Confirmation/Confirmation'
import {Consumer} from 'components_feature/Report/Consumer/Consumer'
import {Details} from 'components_feature/Report/Details/Details'
import {Problem} from 'components_feature/Report/Problem/Problem'
import {useReportFlowContext} from 'components_feature/Report/ReportFlowContext'
import {useReportCreateContext} from 'components_feature/Report/ReportCreateContext'
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
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {scrollTop} from 'utils/utils'
import {buildLinkStartReport} from 'core/siteMap'
import {NewReportFlowStepperHeader, ReportFlowStepperHeader} from './ReportFlowStepperHeader'

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
    console.log('step=' + getIndexForStepOrDone(currentStep))
    isWebView && window.ReactNativeWebView?.postMessage('step=' + getIndexForStepOrDone(currentStep) + 1)
    _analytics.trackPage(`/${anomaly.path}/${path}`, title)
  }, [currentStep])
}

function parseStepFromQueryString(stepParamRaw: string | string[] | undefined): ReportStepOrDone | null {
  try {
    if (typeof stepParamRaw === 'string') {
      return indexToStepOrDone(parseInt(stepParamRaw, 10))
    }
  } catch (err) {
    console.error(err)
  }
  return null
}

export function buildPathForStep(anomaly: Pick<Anomaly, 'path'>, step: ReportStepOrDone, isWebView: boolean) {
  const queryString = step === firstReportStep ? '' : `?step=${getIndexForStepOrDone(step)}`
  return `${buildLinkStartReport(anomaly, {isWebView})}${queryString}`
}

function useStepFromRouter(anomaly: Anomaly, isWebView: boolean) {
  const router = useRouter()
  const step = parseStepFromQueryString(router.query.step) ?? firstReportStep
  function setStep(newStep: ReportStepOrDone) {
    const url = buildPathForStep(anomaly, newStep, isWebView)
    router.push(url, undefined, {shallow: true})
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
      if (!_reportCreate.createReport.entity) {
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
      {step === 'Confirmation' && <Confirmation {...{stepNavigation}} />}
      {step === 'Done' && <Acknowledgement {...{isWebView}} />}
    </>
  )
}
