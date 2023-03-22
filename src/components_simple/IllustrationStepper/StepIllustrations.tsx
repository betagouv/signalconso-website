import {alpha, Box, useTheme} from '@mui/material'
import Image, {StaticImageData} from 'next/image'
import {styleUtils} from 'core/theme'
import SwipeableViews from 'react-swipeable-views'
import {useState} from 'react'
import {IconBtn} from '../../alexlibs/mui-extension/IconBtn/IconBtn'

interface IllustrationStepperStepProps {
  title: string
  image: StaticImageData | string
  alt?: string
}

interface IllustrationStepperProps {
  steps: IllustrationStepperStepProps[]
}

export const carouselCss = {}

export const IllustrationStepper = ({steps}: IllustrationStepperProps) => {
  return (
    <>
      <IllustrationStepperMobile steps={steps} />
      <IllustrationStepperLarge steps={steps} />
    </>
  )
}
//
export const IllustrationStepperMobile = ({steps}: IllustrationStepperProps) => {
  const [index, setIndex] = useState(0)
  return (
    <div className="lg:hidden">
      <SwipeableViews enableMouseEvents index={index} onChangeIndex={setIndex}>
        {steps.map(step => (
          <Box key={step.alt}>
            <Box
              sx={{
                height: 240,
                width: '100%',
                position: 'relative',
              }}
            >
              <Image
                src={step.image}
                alt={step.alt}
                objectFit="contain"
                layout="fill"
                priority={steps[0] === step}
                quality={50}
              />
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                my: 2,
                fontSize: t => styleUtils(t).fontSize.normal,
                fontWeight: t => t.typography.fontWeightBold,
              }}
              component="h2"
              dangerouslySetInnerHTML={{__html: step.title}}
            />
          </Box>
        ))}
      </SwipeableViews>
      <Box sx={{mt: 1, display: 'flex', justifyContent: 'center'}}>
        {steps.map((_, i) => (
          <IconBtn
            aria-label={_.alt}
            onClick={() => setIndex(i)}
            sx={{
              mx: 1,
              height: 6,
              width: 6,
              borderRadius: '100%',
              ...(i === index
                ? {
                    background: t => `${t.palette.primary.main} !important`,
                    border: t => `2px solid ${alpha(t.palette.primary.main, 0.7)}`,
                  }
                : {
                    // background: t => t.palette.divider,
                    border: t => `2px solid ${t.palette.divider}`,
                  }),
            }}
            key={_.alt}
          >
            {''}
          </IconBtn>
        ))}
      </Box>
    </div>
  )
}

export const IllustrationStepperLarge = ({steps}: IllustrationStepperProps) => {
  const dotSize = 22
  const borderSize = 2
  const stepperMargin = 24
  const theme = useTheme()
  return (
    <div className="items-center hidden lg:flex">
      {steps.map(({image, alt, title}) => (
        <Box
          key={alt}
          sx={{
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
              bottom: -stepperMargin - (dotSize + borderSize) / 2,
              background: theme.palette.background.paper,
              content: `' '`,
              borderRadius: 50,
              border: `${borderSize}px solid ${theme.palette.divider}`,
              height: dotSize,
              width: dotSize,
              position: 'absolute',
              right: `calc(50% - ${(dotSize + borderSize) / 2}px)`,
            },
          }}
        >
          <div className="w-full relative h-60 lg:h-36 xl:h-56">
            <Image src={image} alt={alt} objectFit="contain" layout="fill" />
          </div>
          <h2
            className="flex items-center mx-1 my-0 text-sm xl:text-base font-medium max-w-xs h-16"
            dangerouslySetInnerHTML={{__html: title}}
          />
        </Box>
      ))}
    </div>
  )
}
