import {Anomaly} from 'anomalies/Anomaly'
import {Company} from 'components_feature/Report/Company/Company'
import {Confirmation} from 'components_feature/Report/Confirmation/Confirmation'
import {Consumer} from 'components_feature/Report/Consumer/Consumer'
import {Details} from 'components_feature/Report/Details/Details'
import {Problem} from 'components_feature/Report/Problem/Problem'
import {useI18n} from 'i18n/I18n'
import React, {useContext, useEffect, useState} from 'react'
import {scrollTop} from 'utils/utils'
import {ReportFlowStepperHeader} from './ReportFlowStepperHeader'

interface StepperProps {
  initialStep: number
  anomaly: Anomaly
  onStepChange: (index: number) => void
  renderDone: () => JSX.Element
}

interface ReportFlowStepperContext {
  currentStep: number
  goTo: (i: number) => void
  next: () => void
  prev: () => void
}

export const ReportFlowStepperContext = React.createContext<ReportFlowStepperContext>({
  currentStep: 0,
} as ReportFlowStepperContext)

export const ReportFlowStepper = ({anomaly, initialStep, renderDone, onStepChange}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const {m} = useI18n()

  const steps: {
    label: string
    component: () => JSX.Element
  }[] = [
    {
      label: m.step_problem,
      component: () => <Problem anomaly={anomaly} />,
    },
    {
      label: m.step_description,
      component: () => <Details />,
    },
    {
      label: m.step_company,
      component: () => <Company />,
    },
    {
      label: m.step_consumer,
      component: () => <Consumer />,
    },
    {
      label: m.step_confirm,
      component: () => <Confirmation />,
    },
  ]

  const maxStep = steps.length + 1
  const isDone = currentStep >= steps.length

  useEffect(() => {
    onStepChange(currentStep)
  }, [currentStep])

  const DisplayedStep: () => JSX.Element = isDone ? renderDone : steps[currentStep].component

  const context = {
    currentStep,
    goTo: (i: number) => {
      if (isDone) return
      setCurrentStep(_ => Math.max(Math.min(i, maxStep), 0))
      scrollTop()
    },
    next: () => {
      if (isDone) return
      setCurrentStep(_ => Math.min(_ + 1, maxStep))
      scrollTop()
    },
    prev: () => {
      if (isDone) return
      setCurrentStep(_ => Math.max(_ - 1, 0))
      scrollTop()
    },
  }
  return (
    <ReportFlowStepperContext.Provider value={context}>
      <ReportFlowStepperHeader stepsLabels={steps.map(_ => _.label)} currentStep={currentStep} goTo={setCurrentStep} />
      <DisplayedStep />
    </ReportFlowStepperContext.Provider>
  )
}

export const useReportFlowStepperContext = () => {
  return useContext<ReportFlowStepperContext>(ReportFlowStepperContext)
}
