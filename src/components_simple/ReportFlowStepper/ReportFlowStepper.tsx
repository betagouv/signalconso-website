import {Anomaly} from 'anomalies/Anomaly'
import {Acknowledgement} from 'components_feature/Report/Acknowledgement/Acknowledgement'
import {Company} from 'components_feature/Report/Company/Company'
import {Confirmation} from 'components_feature/Report/Confirmation/Confirmation'
import {Consumer} from 'components_feature/Report/Consumer/Consumer'
import {Details} from 'components_feature/Report/Details/Details'
import {Problem} from 'components_feature/Report/Problem/Problem'
import {getNextStep, getPreviousStep, ReportStep, ReportStepOrDone} from 'model/ReportStep'
import {useEffect, useState} from 'react'
import {scrollTop} from 'utils/utils'
import {ReportFlowStepperHeader} from './ReportFlowStepperHeader'

interface StepperProps {
  initialStep: ReportStep
  anomaly: Anomaly
  onStepChange: (step: ReportStepOrDone) => void
  isWebView: boolean
}

export interface StepNavigation {
  currentStep: ReportStepOrDone
  goTo: (step: ReportStepOrDone) => void
  next: () => void
  prev: () => void
}

export const ReportFlowStepper = ({anomaly, initialStep, onStepChange, isWebView}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState<ReportStepOrDone>(initialStep)

  const isDone = currentStep === 'Done'

  useEffect(() => {
    onStepChange(currentStep)
  }, [currentStep])

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
