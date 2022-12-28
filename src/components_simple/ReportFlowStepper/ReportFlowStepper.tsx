import {scrollTop} from 'utils/utils'
import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react'
import {ReportFlowStepperHeader} from './ReportFlowStepperHeader'
import {ReportStep} from 'model/ReportStep'

interface StepperProps {
  initialStep: number
  steps: {
    name: ReportStep
    label: string
    component: () => JSX.Element
  }[]
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

// the react.memo is probably useless ?
export const ReportFlowStepper = React.memo(({steps, initialStep, renderDone, onStepChange}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const maxStep = steps.length + 1
  const isDone = currentStep >= steps.length

  useEffect(() => {
    onStepChange(currentStep)
  }, [currentStep])

  const DisplayedStep: () => JSX.Element = currentStep > steps.length - 1 ? renderDone : steps[currentStep].component

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
})

export const useReportFlowStepperContext = () => {
  return useContext<ReportFlowStepperContext>(ReportFlowStepperContext)
}
