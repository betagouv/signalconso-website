import {Anomaly} from 'anomalies/Anomaly'
import {Company} from 'components_feature/Report/Company/Company'
import {Confirmation} from 'components_feature/Report/Confirmation/Confirmation'
import {Consumer} from 'components_feature/Report/Consumer/Consumer'
import {Details} from 'components_feature/Report/Details/Details'
import {Problem} from 'components_feature/Report/Problem/Problem'
import {useI18n} from 'i18n/I18n'
import {
  firstReportStep,
  getStepIndex,
  indexToStepOrDone,
  lastReportStep,
  ReportStep,
  ReportStepOrDone,
  reportSteps,
  stepToIndex,
} from 'model/ReportStep'
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
  const {m} = useI18n()

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
      const newStep = currentStep === lastReportStep ? 'Done' : reportSteps[getStepIndex(currentStep) + 1]
      setCurrentStep(newStep)
      scrollTop()
    },
    prev: () => {
      if (isDone) return
      const newStep = currentStep === firstReportStep ? firstReportStep : reportSteps[getStepIndex(currentStep) - 1]
      setCurrentStep(newStep)
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
