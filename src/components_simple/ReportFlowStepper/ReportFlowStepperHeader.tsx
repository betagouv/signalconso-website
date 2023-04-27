import {alpha, Box, BoxProps, Theme} from '@mui/material'
import {SxProps} from '@mui/system'
import {styleUtils} from 'core/theme'
import {useI18n} from 'i18n/I18n'
import {getIndexForStep, ReportStep, ReportStepOrDone, reportSteps} from 'model/ReportStep'
import {fnSwitch} from '../../utils/FnSwitch'
import {Stepper as DsfrStepper} from '@codegouvfr/react-dsfr/Stepper'
import {getNextStep} from 'model/ReportStep'
import {useColors} from '@codegouvfr/react-dsfr/useColors'

interface StepperHeaderProps extends BoxProps {
  currentStep: ReportStepOrDone
  goTo?: (step: ReportStepOrDone) => void
  stepSize?: number
  stepMargin?: number
  hideLabel?: boolean
}

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

export const ReportFlowStepperHeader = ({
  sx,
  currentStep,
  goTo,
  stepSize = 32,
  stepMargin = 8,
  hideLabel,
}: StepperHeaderProps) => {
  const {m} = useI18n()
  const dsfrTheme = useColors()

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
    <>
      <Box
        sx={{
          display: 'flex',
          mb: 4,
          justifyContent: 'center',
          ...sx,
        }}
      >
        {reportSteps.map((step, stepIndex) => {
          const stepLabel = getStepLabel(step)
          const stepStatus = getStepStatus(step)
          const onClick = goTo && stepStatus === 'pastStep' && !isDone ? () => goTo(step) : undefined
          return (
            <Box key={stepLabel} sx={{flex: 1}} onClick={onClick}>
              <Box
                sx={{
                  ...(goTo && {
                    cursor: stepStatus === 'futureStep' || isDone ? 'not-allowed' : 'pointer',
                  }),
                  display: 'flex',
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                {stepIndex > 0 && (
                  <Box
                    sx={{
                      display: 'block',
                      position: 'absolute',
                      top: stepSize / 2 - 1,
                      left: `calc(-50% + ${stepSize / 2 + stepMargin}px)`,
                      right: `calc(50% + ${stepSize / 2 + stepMargin}px)`,
                      ...(stepStatus === 'futureStep'
                        ? {
                            borderTop: (t: Theme) => '2px solid ' + t.palette.divider,
                          }
                        : {
                            borderTop: '2px solid ' + dsfrTheme.decisions.background.actionHigh.blueFrance.default,
                          }),
                    }}
                  />
                )}
                <Box
                  sx={{
                    height: stepSize,
                    width: stepSize,
                    borderRadius: stepSize,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: t => t.typography.fontWeightBold,
                    ...(stepSize <= 30 && {
                      fontSize: t => styleUtils(t).fontSize.small,
                    }),
                    justifyContent: 'center',
                    transition: t => t.transitions.create('all'),
                    mr: 1,
                    ml: 1,
                    ...fnSwitch<StepStatus, SxProps<Theme>>(stepStatus, {
                      pastStep: {
                        background: dsfrTheme.decisions.background.actionLow.blueFrance.default,
                        color: dsfrTheme.decisions.text.actionHigh.blueFrance.default,
                      },
                      currentStep: {
                        boxShadow: t => `0px 0px 0px ${stepSize > 30 ? 4 : 2}px ${alpha(t.palette.primary.main, 0.3)}`,
                        color: t => t.palette.primary.contrastText,
                        bgcolor: 'primary.main',
                      },
                      futureStep: {
                        border: t => `2px solid ${t.palette.divider}`,
                        color: t => t.palette.text.disabled,
                      },
                    }),
                  }}
                >
                  {stepIndex + 1}
                </Box>
                {!hideLabel && (
                  <div
                    className={`mt-2 hidden lg:block text-center ${
                      stepStatus === 'currentStep' ? 'font-medium' : stepStatus === 'futureStep' ? 'text-gray-500' : ''
                    }`}
                  >
                    {stepLabel}
                  </div>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
