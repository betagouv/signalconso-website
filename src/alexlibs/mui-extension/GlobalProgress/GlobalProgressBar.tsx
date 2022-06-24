import * as React from 'react'
import {useEffect, useState} from 'react'
import {Box, BoxProps, Theme} from '@mui/material'
import {progressbarAnimationDuration, useGlobalProgressState} from './GlobalProgressContext'
import {useInterval} from '../../react-hooks-lib'
import {SxProps} from '@mui/system'

const progressbarColor = (t: Theme) => {
  return t.palette.primary.main
}

export interface GlobalProgressBarProps extends BoxProps {
  styleProgress?: object
  sxProgress?: SxProps
}

const INITIAL_PERCENT = 10

const GlobalProgressBar = ({styleProgress, sxProgress, ...props}: GlobalProgressBarProps) => {
  const {currentStep, steps, started} = useGlobalProgressState()
  const [autoIncrement, setAutoIncrement] = useState(0)

  useInterval(() => {
    setAutoIncrement(autoIncrement + 1)
  }, 500)

  useEffect(() => {
    setAutoIncrement(0)
  }, [steps, currentStep])

  const stepProgress = (100 - INITIAL_PERCENT) / steps
  const percent = Math.min(INITIAL_PERCENT + stepProgress * currentStep + Math.min(autoIncrement, stepProgress), 100)

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        visibility: 'visible',
        opacity: 1,
        transition: 'all 400ms',
        zIndex: 9999,
      }}
      {...props}
    >
      <Box
        sx={{
          background: t => progressbarColor(t),
          boxShadow: t => `0 0 10px ${progressbarColor(t)}, 0 0 5px ${progressbarColor(t)}`,
          height: 2,
          transition: t => t.transitions.create('all', {duration: progressbarAnimationDuration}),
          ...(!started && {
            height: '0px !important',
          }),
          ...sxProgress,
        }}
        style={{...styleProgress, width: percent + '%'}}
      />
    </Box>
  )
}

export default GlobalProgressBar
