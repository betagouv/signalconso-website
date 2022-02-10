import {Box, useTheme} from '@mui/material'
import {ReactNode} from 'react'
import {useWindowWidth} from '../useWindowWidth'

interface IllustrationStepperProps {
  children: ReactNode
}

export const IllustrationStepper = ({children}: IllustrationStepperProps) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {children}
    </div>
  )
}

interface IllustrationStepperStepProps {
  title: string
  image: string
  alt?: string
}

export const IllustrationStepperStep = ({title, alt, image}: IllustrationStepperStepProps) => {
  const dotSize = 18
  const borderSize = 2
  const stepperMargin = 24
  const theme = useTheme()
  const {isMd} = useWindowWidth()
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      mb: 5,
      '&:before': {
        bottom: -stepperMargin - borderSize,
        content: `' '`,
        height: borderSize,
        background: theme.palette.divider,
        left: 0,
        right: 0,
        position: 'absolute',
      },
      '&:first-of-type:before': {
        left: '50%',
      },
      '&:last-of-type:before': {
        right: '50%',
      },
      '&:after': {
        boxShadow: `0px 0px 0px 4px ${theme.palette.background.paper}`,
        bottom: -stepperMargin - ((dotSize + borderSize) / 2),
        background: theme.palette.background.paper,
        content: `' '`,
        borderRadius: 50,
        border: `${borderSize}px solid ${theme.palette.divider}`,
        height: dotSize,
        width: dotSize,
        position: 'absolute',
        right: `calc(50% - ${(dotSize + borderSize) / 2}px)`,
      },
    }}>
      <img src={image} alt={alt}/>
      {/*<div style={{*/}
      {/*  border: `3px solid ${theme.palette.divider}`,*/}
      {/*  borderRadius: 40,*/}
      {/*  height: 20,*/}
      {/*  width: 20,*/}
      {/*}}></div>*/}
      <Box
        sx={{
          fontWeight: 'bold',
          mt: 2,
          maxWidth: 300,
        }}
        dangerouslySetInnerHTML={{__html: title}}
      />
    </Box>
  )
}
