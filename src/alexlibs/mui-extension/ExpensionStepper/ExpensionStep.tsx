import * as React from 'react'
import {ReactElement, useEffect, useRef} from 'react'
import {Box, BoxProps, Collapse, Icon} from '@mui/material'
import {colorSuccess} from '../_core/style/color'

const animationDuration = 300

export interface ExpensionStepProps {
  readonly prev?: () => void
  readonly next?: (data?: any) => void
  readonly goTo?: (i: number) => void
  readonly free?: boolean
  readonly index?: number
  readonly disabled?: boolean
  readonly done?: boolean
  readonly isCurrent?: boolean
  readonly isLast?: boolean
  readonly autoScroll?: boolean
}

interface Props extends ExpensionStepProps, Omit<BoxProps, 'component'> {
  readonly label: string
  readonly component: ReactElement<any>
}

export const ExpensionStep = ({
  disabled,
  done,
  free,
  isCurrent,
  index,
  label,
  component,
  goTo,
  prev,
  next,
  isLast,
  autoScroll,
  sx,
  ...other
}: Props) => {
  let $root: any | undefined
  const isCurrentRef = useRef<boolean>()

  const isClickable = () => !isCurrent && !disabled

  const scrollTop = () => {
    $root?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  useEffect(() => {
    isCurrentRef.current = isCurrent
  }, [isCurrent])

  useEffect(() => {
    if (autoScroll && !isCurrentRef.current && isCurrent)
      setTimeout(scrollTop, animationDuration)
  })

  return (
    <Box
      sx={{
        '&:not(:first-of-type)': {
          borderTop: t => `1px solid ${t.palette.divider}`,
        },
        ...sx
      }}
      ref={node => $root = node ?? undefined}
      {...other}
    >
      <Box
        sx={{
          transition: t => t.transitions.create('all'),
          py: 0,
          px: 3,
          height: 68,
          display: 'flex',
          alignItems: 'center',
          fontSize: t => t.typography.subtitle1.fontSize,
          ...isCurrent && {
            fontSize: t => t.typography.h6.fontSize,
          },
          ...isClickable() && {
            cursor: 'pointer',
            '&:hover': {
              background: t => t.palette.background.default,
            }
          }
        }}
        onClick={() => goTo!(index!)}>
        {!free && done && !isCurrent && (
          <Icon sx={{
            fontWeight: t => t.typography.fontWeightMedium,
            borderRadius: '50%',
            color: colorSuccess,
            mr: 1,
          }}>
            check
          </Icon>
        )}
        {!free && <>{index! + 1}. </>}{label}
      </Box>
      <Collapse in={isCurrent} timeout={animationDuration} sx={{
        transition: t => t.transitions.create('all'),
        overflow: 'hidden',
      }}>
        <Box sx={{
          pt: 0,
          px: 3,
          pb: 0,
        }}>
          {React.cloneElement(component, {prev, next, goTo, free, index, disabled, done, isCurrent, isLast})}
        </Box>
      </Collapse>
    </Box>
  )
}
