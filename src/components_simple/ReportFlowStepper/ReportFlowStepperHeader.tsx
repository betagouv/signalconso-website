import {Stepper as DsfrStepper} from '@codegouvfr/react-dsfr/Stepper'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {alpha, Box, BoxProps} from '@mui/material'
import {COLOR_BLUE_FRANCE} from 'core/theme'
import {useI18n} from 'i18n/I18n'
import {getIndexForStep, getNextStep, ReportStep, ReportStepOrDone, reportSteps} from 'model/ReportStep'

interface StepperHeaderProps extends BoxProps {
  variant?: Variant
  currentStep: ReportStepOrDone
  goTo?: (step: ReportStepOrDone) => void
}

type Variant = 'report-started-alert' | 'standard'

type StepStatus = 'pastStep' | 'currentStep' | 'futureStep'

export function NewReportFlowStepperHeader({currentStep}: {currentStep: ReportStepOrDone}) {
  const {m} = useI18n()

  function getStepLabel(step: ReportStep) {
    const stepsLabels = [m.step_problem, m.step_description, m.step_company, m.step_consumer, m.step_confirm]
    return stepsLabels[getIndexForStep(step) - 1]
  }

  if (currentStep !== 'Done') {
    const currentStepIndex = getIndexForStep(currentStep)
    const title = getStepLabel(currentStep)
    const nextStep = getNextStep(currentStep)
    const nextTitle = nextStep !== 'Done' ? getStepLabel(nextStep) : undefined

    return <DsfrStepper currentStep={currentStepIndex} {...{nextTitle, title}} stepCount={reportSteps.length} />
  }
  return null
}

export const ReportFlowStepperHeader = ({currentStep, goTo, variant = 'standard'}: StepperHeaderProps) => {
  const {m} = useI18n()
  const hideLabel = variant === 'report-started-alert'
  const stepSize = variant === 'report-started-alert' ? 26 : 32
  const isDone = currentStep === 'Done'

  function getStepStatus(step: ReportStep): StepStatus {
    if (step === currentStep) {
      return 'currentStep'
    }
    if (currentStep === 'Done' || getIndexForStep(step) < getIndexForStep(currentStep)) {
      return 'pastStep'
    }
    return 'futureStep'
  }

  function getStepLabel(step: ReportStep) {
    const stepsLabels = [m.step_problem, m.step_description, m.step_company, m.step_consumer, m.step_confirm]
    return stepsLabels[getIndexForStep(step) - 1]
  }

  return (
    <ol className={`flex mb-4 justify-center ${variant === 'report-started-alert' ? 'mt-4' : ''}`}>
      {reportSteps.map((step, stepIndex) => {
        const stepLabel = getStepLabel(step)
        const stepStatus = getStepStatus(step)
        const onClick = goTo && stepStatus === 'pastStep' && !isDone ? () => goTo(step) : undefined
        return (
          <li
            className="outline-0 outline-green-500 outline-dashed flex flex-grow basis-0"
            key={stepLabel}
            onClick={onClick}
            aria-current={stepStatus === 'currentStep' ? 'step' : undefined}
          >
            <div
              className={`flex flex-col relative items-center justify-center w-full ${
                onClick ? 'cursor-pointer' : stepStatus === 'currentStep' ? 'cursor-default' : 'cursor-not-allowed'
              }`}
            >
              {stepIndex > 0 && <StepSeparator {...{stepStatus, stepSize, variant}} />}
              <StepNumberInCircle {...{stepIndex, stepStatus, stepSize}} />
              {!hideLabel && <StepLabel {...{stepStatus, stepLabel}} />}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function StepNumberInCircle({stepIndex, stepStatus, stepSize}: {stepIndex: number; stepStatus: StepStatus; stepSize: number}) {
  return (
    <div
      className={`flex mx-4 transition-all items-center justify-center font-bold ${
        stepStatus === 'pastStep'
          ? 'bg-sclightpurple text-scbluefrance'
          : stepStatus === 'currentStep'
          ? 'bg-scbluefrance text-white'
          : 'border-2 border-solid border-gray-300 text-gray-400'
      }`}
      style={{
        height: stepSize,
        width: stepSize,
        borderRadius: stepSize,
        ...(stepStatus === 'currentStep'
          ? {
              boxShadow: `0px 0px 0px 4px ${alpha(COLOR_BLUE_FRANCE, 0.3)}`,
            }
          : {}),
      }}
    >
      {stepIndex + 1}
    </div>
  )
}

function StepLabel({stepStatus, stepLabel}: {stepStatus: StepStatus; stepLabel: string}) {
  return (
    <div
      className={`mt-2 hidden lg:block text-center ${
        stepStatus === 'currentStep' ? 'font-medium' : stepStatus === 'futureStep' ? 'text-gray-500' : ''
      }`}
    >
      {stepLabel}
    </div>
  )
}

function StepSeparator({stepStatus, stepSize, variant}: {stepStatus: StepStatus; stepSize: number; variant: Variant}) {
  const stepMargin = variant === 'report-started-alert' ? 4 : 8
  return (
    <div
      className={`block absolute border-0 border-t-2 border-solid ${
        stepStatus === 'futureStep' ? 'border-gray-300' : 'border-scbluefrance'
      }`}
      style={{
        top: stepSize / 2 - 1,
        // left: variant === 'report-started-alert' ? `-13px` : `-55px`,
        // right: variant === 'report-started-alert' ? `47px` : '105px',
        left: `calc(-50% + ${stepSize / 2 + stepMargin}px)`,
        right: `calc(50% + ${stepSize / 2 + stepMargin}px)`,
      }}
    />
  )
}
