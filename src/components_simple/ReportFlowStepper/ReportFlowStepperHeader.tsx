import React from 'react'
import {alpha, Box, BoxProps, Theme} from '@mui/material'
import {useWindowWidth} from 'hooks/useWindowWidth'
import {styleUtils} from 'core/theme'
import {fnSwitch} from '../../utils/FnSwitch'
import {SxProps} from '@mui/system'
import {indexToStepOrDone, ReportStepOrDone, reportSteps, stepToIndex} from 'model/ReportStep'
import {useI18n} from 'i18n/I18n'

interface StepperHeaderProps extends BoxProps {
  currentStep: ReportStepOrDone
  goTo?: (step: ReportStepOrDone) => void
  stepSize?: number
  stepMargin?: number
  hideLabel?: boolean
}

type StepStatus = 'pastStep' | 'currentStep' | 'futureStep'

export const ReportFlowStepperHeader = ({
  sx,
  currentStep,
  goTo,
  stepSize = 32,
  stepMargin = 8,
  hideLabel,
}: StepperHeaderProps) => {
  const {m} = useI18n()
  // TODO virer l'usage des indexes

  const stepsLabels = [m.step_problem, m.step_description, m.step_company, m.step_consumer, m.step_confirm]
  const isDone = currentStep === 'Done'
  const {isMobileWidthMax} = useWindowWidth()
  const currentStepIndex = stepToIndex(currentStep)
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 4,
        justifyContent: 'center',
        ...sx,
      }}
    >
      {reportSteps.map((step, i) => {
        const stepLabel = stepsLabels[i]
        const stepStatus: StepStatus = currentStepIndex > i ? 'pastStep' : currentStepIndex === i ? 'currentStep' : 'futureStep'
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
              {i > 0 && (
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
                          borderTop: (t: Theme) => '2px solid ' + t.palette.success.light,
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
                      background: t => t.palette.success.light,
                      color: t => t.palette.success.contrastText,
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
                {i + 1}
              </Box>
              {!hideLabel && !isMobileWidthMax && (
                <Box
                  sx={{
                    mt: 1,
                    textAlign: 'center',
                    ...fnSwitch<StepStatus, SxProps<Theme>>(
                      stepStatus,
                      {
                        currentStep: {
                          fontWeight: t => t.typography.fontWeightBold,
                        },
                        futureStep: {
                          color: t => t.palette.text.disabled,
                        },
                      },
                      () => ({}),
                    ),
                  }}
                >
                  {stepLabel}
                </Box>
              )}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
