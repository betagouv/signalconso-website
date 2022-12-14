import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react'
import {ReportFlowStepperHeader} from './ReportFlowStepperHeader'

interface StepProps {
  name: string
  label: string
  component: () => JSX.Element
}

interface StepperProps {
  renderDone: () => JSX.Element
  steps: StepProps[]
  initialStep?: number
  onStepChange?: (props: StepProps, index: number) => void
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

export const ReportFlowStepper = React.memo(({steps, initialStep, renderDone, onStepChange}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 0)
  const maxStep = useMemo(() => steps.length + 1, [steps])
  const scrollTop = () => window.scrollTo(0, 0)
  const isDone = currentStep >= steps.length

  useEffect(() => {
    onStepChange?.(steps[currentStep], currentStep)
  }, [currentStep])

  const Step: () => JSX.Element = currentStep > steps.length - 1 ? renderDone : steps[currentStep].component

  return (
    <ReportFlowStepperContext.Provider
      value={{
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
      }}
    >
      <ReportFlowStepperHeader steps={steps.map(_ => _.label)} currentStep={currentStep} goTo={setCurrentStep} />
      <Step />
    </ReportFlowStepperContext.Provider>
  )
})

export const useReportFlowStepperContext = () => {
  return useContext<ReportFlowStepperContext>(ReportFlowStepperContext)
}
