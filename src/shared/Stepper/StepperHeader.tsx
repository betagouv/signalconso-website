import React from 'react'
import {StepProps} from './Stepper'
import {Box, Icon, Theme, useTheme} from '@mui/material'

interface StepperHeaderProps {
  steps: StepProps[]
  currentStep: number
}

const stepSize = 32
const stepMargin = 8

export const StepperHeader = ({steps, currentStep}: StepperHeaderProps) => {
  const t = useTheme()
  return (
    <Box sx={{
      display: 'flex',
      mb: 3,
      justifyContent: 'center',
    }}>
      {steps.map((step, i) =>
        <Box key={step.name} sx={{flex: 1}}>
          <Box sx={{
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
                top: stepSize / 2,
                left: `calc(-50% + ${stepSize / 2 + stepMargin}px)`,
                right: `calc(50% + ${stepSize / 2 + stepMargin}px)`,
                height: '2px',
                ...(currentStep >= i ? {
                  background: (t: Theme) => t.palette.success.light,
                } : {
                  background: (t: Theme) => t.palette.divider,
                })
              }}/>
            )}
            <Box sx={{
              height: stepSize,
              width: stepSize,
              borderRadius: stepSize,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500,
              justifyContent: 'center',
              mr: 1,
              ml: 1,
              ...(currentStep > i ? {
                background: t.palette.success.light,
                color: t.palette.success.contrastText,
              } : currentStep === i ? {
                color: t.palette.primary.contrastText,
                bgcolor: 'primary.main',
              } : {
                bgcolor: 'divider',
                color: 'text.secondary',
              })
            }}>
              {currentStep > i ? (
                <Icon fontSize="small">check</Icon>
              ) : (
                i + 1
              )}
            </Box>
            <Box sx={{fontWeight: t.typography.fontWeightBold, mt: 1,}}>
              {step.label}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
