import {Box, useTheme} from '@mui/material'
import {useWindowWidth} from 'core/useWindowWidth'
import Image from 'next/image'
import {styleUtils} from '../../core/theme/theme'

interface IllustrationStepperStepProps {
  title: string
  image: StaticImageData | string
  alt?: string
}

interface IllustrationStepperProps {
  steps: IllustrationStepperStepProps[]
}

export const IllustrationStepper = ({steps}: IllustrationStepperProps) => {
  const {isSmOrLess} = useWindowWidth()
  return isSmOrLess ? (
    <div>
      {steps.map(step =>
        <IllustrationStepperStepMobile key={step.alt} {...step}/>
      )}
    </div>
  ) : (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {steps.map(step =>
        <IllustrationStepperStepLarge key={step.alt} {...step}/>
      )}
    </div>
  )
}

export const IllustrationStepperStepMobile = ({title, alt, image}: IllustrationStepperStepProps) => {
  const dotSize = 18
  const borderSize = 2
  const theme = useTheme()
  return (
    <Box>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{
          border: `${borderSize}px solid ${theme.palette.divider}`,
          height: dotSize,
          width: dotSize,
          borderRadius: dotSize * 2,
        }}/>
        <Box
          sx={{
            m: 2,
            ml: 2,
            flex: 1,
            fontSize: t => styleUtils(t).fontSize.normal,
            fontWeight: t => t.typography.fontWeightBold,
          }}
          component="h2"
          dangerouslySetInnerHTML={{__html: title}}
        />
      </Box>
      <Box sx={{
        ml: 2,
        position: 'relative',
        height: 160,
        ':before': {
          left: t => -(dotSize / 2 - 1),
          content: '" "',
          position: 'absolute',
          top: t => t.spacing(-1),
          bottom: t => t.spacing(-1),
          background: t => t.palette.divider,
          width: 2,
        },
      }}>
        <Image
          src={image} alt={alt}
          objectFit="contain"
          layout="fill"
        />
      </Box>
    </Box>
  )
}

export const IllustrationStepperStepLarge = ({title, alt, image}: IllustrationStepperStepProps) => {
  const {isMdOrLess, isLgOrLess} = useWindowWidth()
  const dotSize = 18
  const borderSize = 2
  const stepperMargin = 24
  const theme = useTheme()
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      flex: 1,
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
      <div style={{
        height: (() => {
          if (isMdOrLess) return 120
          if (isLgOrLess) return 180
          return 240
        })(),
        width: '100%',
        position: 'relative'
      }}>
        <Image
          src={image} alt={alt}
          objectFit="contain"
          layout="fill"
        />
      </div>
      {/*<div style={{*/}
      {/*  border: `3px solid ${theme.palette.divider}`,*/}
      {/*  borderRadius: 40,*/}
      {/*  height: 20,*/}
      {/*  width: 20,*/}
      {/*}}></div>*/}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          m: 0,
          fontSize: t => isMdOrLess ? styleUtils(t).fontSize.big : styleUtils(t).fontSize.normal,
          fontWeight: t => t.typography.fontWeightBold,
          maxWidth: 300,
          minHeight: 70,
        }}
        component="h2"
        dangerouslySetInnerHTML={{__html: title}}
      />
    </Box>
  )
}
