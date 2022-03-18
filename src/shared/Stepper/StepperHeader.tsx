import React from 'react'
import {StepProps} from './Stepper'
import {alpha, Box, Icon, Theme, useTheme} from '@mui/material'
import {useWindowWidth} from '../../core/useWindowWidth'

interface StepperHeaderProps {
  steps: StepProps[]
  currentStep: number
  goTo: (index: number) => void
}

const stepSize = 32
const stepMargin = 8

export const StepperHeader = ({steps, currentStep, goTo}: StepperHeaderProps) => {
  const t = useTheme()
  const isDone = currentStep >= steps.length
  const {isMobileWidthMax} = useWindowWidth()
  return (
    <Box sx={{
      display: 'flex',
      mb: 4,
      justifyContent: 'center',
    }}>
      {steps.map((step, i) =>
        <Box key={step.name} sx={{flex: 1}} onClick={() => i < currentStep && !isDone && goTo(i)}>
          <Box sx={{
            cursor: i < currentStep && !isDone ? 'pointer' : 'not-allowed',
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            {i > 0 && (
              <Box sx={{
                display: 'block',
                position: 'absolute',
                top: stepSize / 2 - 1,
                left: `calc(-50% + ${stepSize / 2 + stepMargin}px)`,
                right: `calc(50% + ${stepSize / 2 + stepMargin}px)`,
                ...(currentStep >= i ? {
                  borderTop: (t: Theme) => '2px solid ' + t.palette.success.light,
                } : {
                  borderTop: (t: Theme) => '2px solid ' + t.palette.divider,
                })
              }}/>
            )}
            <Box sx={{
              height: stepSize,
              width: stepSize,
              borderRadius: stepSize,
              display: 'flex',
              alignItems: 'center',
              fontWeight: t => t.typography.fontWeightBold,
              justifyContent: 'center',
              transition: t => t.transitions.create('all'),
              mr: 1,
              ml: 1,
              ...(currentStep > i ? {
                background: t.palette.success.light,
                color: t.palette.success.contrastText,
              } : currentStep === i ? {
                // border: t => `2px solid ${alpha(t.palette.primary.main, .5)}`,
                boxShadow: t => `0px 0px 0px 4px ${alpha(t.palette.primary.main, .3)}`,
                color: t.palette.primary.contrastText,
                bgcolor: 'primary.main',
              } : {
                border: t => `2px solid ${t.palette.divider}`,
                color: t => t.palette.text.disabled,
              }),
            }}>
              {currentStep > i ? (
                <Icon fontSize="small">check</Icon>
              ) : (
                i + 1
              )}
            </Box>
            <Box sx={{
              mt: 1,
              textAlign: 'center',
              ...(currentStep > i ? {
              } : currentStep === i ? {
                fontWeight: t => t.typography.fontWeightBold,
              } : {
                color: t => t.palette.text.disabled,
              })
            }}>
              {currentStep === i || !isMobileWidthMax ? step.label : ''}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
