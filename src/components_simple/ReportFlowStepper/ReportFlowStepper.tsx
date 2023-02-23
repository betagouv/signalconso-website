import {useAnalyticContext} from 'analytic/AnalyticContext'
import {Anomaly} from 'anomalies/Anomaly'
import {Acknowledgement} from 'components_feature/Report/Acknowledgement/Acknowledgement'
import {Company} from 'components_feature/Report/Company/Company'
import {Confirmation} from 'components_feature/Report/Confirmation/Confirmation'
import {Consumer} from 'components_feature/Report/Consumer/Consumer'
import {Details} from 'components_feature/Report/Details/Details'
import {Problem} from 'components_feature/Report/Problem/Problem'
import {useReportFlowContext} from 'components_feature/Report/ReportFlowContext'
import {
  findCurrentStepForReport,
  firstReportStep,
  getAnalyticsForStep,
  getNextStep,
  getPreviousStep,
  ReportStepOrDone,
} from 'model/ReportStep'
import {useEffect, useState} from 'react'
import {scrollTop} from 'utils/utils'
import {ReportFlowStepperHeader} from './ReportFlowStepperHeader'

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

function useStepChangeTracking(anomaly: Anomaly, currentStep: ReportStepOrDone) {
  const _analytics = useAnalyticContext()
  useEffect(() => {
    const {path, title} = getAnalyticsForStep(currentStep)
    _analytics.trackPage(`/${anomaly.path}/${path}`, title)
  }, [currentStep])
}

export const ReportFlowStepper = ({anomaly, isWebView}: StepperProps) => {
  const _reportFlow = useReportFlowContext()
  const initialStep =
    anomaly.category === _reportFlow.reportDraft.category ? findCurrentStepForReport(_reportFlow.reportDraft) : firstReportStep
  const [currentStep, setCurrentStep] = useState<ReportStepOrDone>(initialStep)
  useStepChangeTracking(anomaly, currentStep)

  const isDone = currentStep === 'Done'

  const goToNextStep = () => {
    if (isDone) return
    setCurrentStep(getNextStep(currentStep))
    scrollTop()
  }
  const goToStep = (step: ReportStepOrDone) => {
    if (isDone) return
    setCurrentStep(step)
    scrollTop()
  }

  const stepNavigation: StepNavigation = {
    currentStep,
    goTo: goToStep,
    next: goToNextStep,
    prev: () => {
      if (isDone) return
      setCurrentStep(getPreviousStep(currentStep))
      scrollTop()
    },
  }

  return (
    <>
      <ReportFlowStepperHeader currentStep={currentStep} goTo={setCurrentStep} />
      {currentStep === 'BuildingProblem' && <Problem {...{isWebView, anomaly, stepNavigation}} />}
      {currentStep === 'BuildingDetails' && <Details {...{stepNavigation}} />}
      {currentStep === 'BuildingCompany' && <Company {...{stepNavigation}} />}
      {currentStep === 'BuildingConsumer' && <Consumer {...{stepNavigation}} />}
      {currentStep === 'Confirmation' && <Confirmation {...{stepNavigation}} />}
      {currentStep === 'Done' && <Acknowledgement {...{isWebView}} />}
    </>
  )
}
