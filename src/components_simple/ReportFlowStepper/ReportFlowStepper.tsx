import {Anomaly} from 'anomalies/Anomaly'
import {Company} from 'components_feature/Report/Company/Company'
import {Confirmation} from 'components_feature/Report/Confirmation/Confirmation'
import {Consumer} from 'components_feature/Report/Consumer/Consumer'
import {Details} from 'components_feature/Report/Details/Details'
import {Problem} from 'components_feature/Report/Problem/Problem'
import {getNextStep, getPreviousStep, getStepIndex, ReportStep, ReportStepOrDone} from 'model/ReportStep'
import React, {useContext, useEffect, useState} from 'react'
import {scrollTop} from 'utils/utils'
import {ReportFlowStepperHeader} from './ReportFlowStepperHeader'

interface StepperProps {
  initialStep: ReportStep
  anomaly: Anomaly
  onStepChange: (step: ReportStepOrDone) => void
  renderDone: () => JSX.Element
}

interface ReportFlowStepperContext {
  currentStep: ReportStepOrDone
  goTo: (step: ReportStepOrDone) => void
  next: () => void
  prev: () => void
}

export const ReportFlowStepperContext = React.createContext<ReportFlowStepperContext>({} as ReportFlowStepperContext)

export const ReportFlowStepper = ({anomaly, initialStep, renderDone, onStepChange}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState<ReportStepOrDone>(initialStep)

  const steps: {
    component: () => JSX.Element
  }[] = [
    {
      component: () => <Problem anomaly={anomaly} />,
    },
    {
      component: () => <Details />,
    },
    {
      component: () => <Company />,
    },
    {
      component: () => <Consumer />,
    },
    {
      component: () => <Confirmation />,
    },
  ]

  const isDone = currentStep === 'Done'

  useEffect(() => {
    onStepChange(currentStep)
  }, [currentStep])

  const DisplayedStep: () => JSX.Element = isDone ? renderDone : steps[getStepIndex(currentStep)].component

  const context = {
    currentStep,
    goTo: (step: ReportStepOrDone) => {
      if (isDone) return
      setCurrentStep(step)
      scrollTop()
    },
    next: () => {
      if (isDone) return
      setCurrentStep(getNextStep(currentStep))
      scrollTop()
    },
    prev: () => {
      if (isDone) return
      setCurrentStep(getPreviousStep(currentStep))
      scrollTop()
    },
  }

  return (
    <ReportFlowStepperContext.Provider value={context}>
      <ReportFlowStepperHeader currentStep={currentStep} goTo={setCurrentStep} />
      <DisplayedStep />
    </ReportFlowStepperContext.Provider>
  )
}

export const useReportFlowStepperContext = () => {
  return useContext<ReportFlowStepperContext>(ReportFlowStepperContext)
}
