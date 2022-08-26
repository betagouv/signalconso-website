import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react'
import {StepperHeader} from './StepperHeader'

export interface StepProps {
  name: string
  label: string
  component: () => ReactNode
}

interface StepperProps {
  renderDone?: () => ReactNode
  steps: StepProps[]
  initialStep?: number
  onStepChange?: (props: StepProps, index: number) => void
}

interface StepperContext {
  currentStep: number
  goTo: (i: number) => void
  next: () => void
  prev: () => void
}

export const StepperContext = React.createContext<StepperContext>({
  currentStep: 0,
} as StepperContext)

export const Stepper = React.memo(({steps, initialStep, renderDone, onStepChange}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 0)
  const maxStep = useMemo(() => steps.length + (renderDone ? 1 : 0), [steps])
  const scrollTop = () => window.scrollTo(0, 0)
  const isDone = currentStep >= steps.length

  useEffect(() => {
    onStepChange?.(steps[currentStep], currentStep)
  }, [currentStep])

  return (
    <StepperContext.Provider
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
      <StepperHeader steps={steps.map(_ => _.label)} currentStep={currentStep} goTo={setCurrentStep} />
      {(() => {
        const Step: any = currentStep > steps.length - 1 ? renderDone : steps[currentStep].component
        return <Step />
      })()}
    </StepperContext.Provider>
  )
})

export const useStepperContext = () => {
  return useContext<StepperContext>(StepperContext)
}
