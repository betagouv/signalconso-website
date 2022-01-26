import React, {ReactNode, useContext, useMemo, useState} from 'react'
import {StepperHeader} from './StepperHeader'
import {Page} from 'mui-extension/lib'

export interface StepProps {
  name: string
  label: string
  component: ReactNode
}

interface StepperProps {
  steps: StepProps[]
  initialStep?: number
}

interface StepperContext {
  currentStep: number
  next: () => void
  prev: () => void
}

const StepperContext = React.createContext<StepperContext>({
  currentStep: 0
} as StepperContext)

export const Stepper = React.memo(({steps, initialStep}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 0)
  const maxStep = useMemo(() => steps.length, [steps])
  const scrollTop = () => window.scrollTo(0, 0)
  return (
    <StepperContext.Provider value={{
      currentStep,
      next: () => {
        setCurrentStep(_ => Math.min(_ + 1, maxStep))
        scrollTop()
      },
      prev: () => {
        setCurrentStep(_ => Math.max(_ - 1, 0))
        scrollTop()
      },
    }}>
      <Page width={600}>
        <StepperHeader steps={steps} currentStep={currentStep} goTo={setCurrentStep}/>
        {(() => {
          const XX: any = steps[currentStep].component
          return (
            <XX/>
          )
        })()}
      </Page>
    </StepperContext.Provider>
  )
})

export const useStepperContext = () => {
  return useContext<StepperContext>(StepperContext)
}
