import {alpha, Box, IconButton, useTheme} from '@mui/material'
import {styleUtils} from '@/core/theme'
import {ReactNode, useState} from 'react'
import SwipeableViews, {SwipeableViewsProps} from 'react-swipeable-views'
import Image, {StaticImageData} from 'next/image'

interface IllustrationStepperStepProps {
  title: string
  image: StaticImageData
}

interface IllustrationStepperProps {
  steps: IllustrationStepperStepProps[]
}

// This package types don't work well with React 18
// We redefine its type manually
// It's not maintained and we should remove it anyway
const SwipeableViewsFixed = SwipeableViews as any as (props: SwipeableViewsProps) => ReactNode

export const IllustrationStepper = ({steps}: IllustrationStepperProps) => {
  return (
    <>
      <IllustrationStepperMobile steps={steps} />
      <IllustrationStepperDesktop steps={steps} />
    </>
  )
}

const IllustrationStepperMobile = ({steps}: IllustrationStepperProps) => {
  const [index, setIndex] = useState(0)
  return (
    <div className="lg:hidden">
      <SwipeableViewsFixed enableMouseEvents index={index} onChangeIndex={setIndex}>
        {steps.map(step => (
          <div key={step.title}>
            <div className="flex justify-center">
              <Image src={step.image} alt={''} priority={steps[0] === step} width={243} height={240} />
            </div>
            <Box
              sx={{
                textAlign: 'center',
                my: 2,
                fontSize: t => styleUtils(t).fontSize.normal,
                fontWeight: t => t.typography.fontWeightBold,
              }}
              component="p"
              dangerouslySetInnerHTML={{__html: step.title}}
            />
          </div>
        ))}
      </SwipeableViewsFixed>
      <ul className="mt-1 flex justify-center list-none p-0">
        {steps.map((_, i) => (
          <li key={_.title}>
            <IconButton
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="focus:outline-2 focus:outline-blue-500"
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
                      border: t => `2px solid ${alpha(t.palette.divider, 0.43)}`,
                    }),
              }}
              key={_.title}
            >
              <span className="sr-only">{`Étape ${i + 1} sur ${steps.length}`}</span>
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  )
}

const IllustrationStepperDesktop = ({steps}: IllustrationStepperProps) => {
  const dotSize = 22
  const borderSize = 2
  const stepperMargin = 24
  const theme = useTheme()
  return (
    <ol className="items-center hidden lg:flex">
      {steps.map(({image, title}) => (
        <Box
          component="li"
          key={title}
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
          <div className="w-full">
            <Image width={226} height={224} src={image} alt={''} />
          </div>
          <p
            className="flex items-center mx-1 my-0 text-sm xl:text-base font-medium max-w-xs h-16"
            dangerouslySetInnerHTML={{__html: title}}
          />
        </Box>
      ))}
    </ol>
  )
}

function SwipeableViewsWrapper({}) {}
