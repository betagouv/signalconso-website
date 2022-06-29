import * as React from 'react'
import {forwardRef} from 'react'
import {Box, Button, CircularProgress, Icon} from '@mui/material'
import {ButtonProps} from '@mui/material/Button'
import {makeSx} from '../_utils/common'

const sx = makeSx({
  icon: {
    height: '22px !important',
    lineHeight: '22px !important',
    fontSize: '22px !important',
    marginRight: 1,
  },
})

export interface BtnProps extends ButtonProps {
  loading?: boolean
  icon?: string
  iconAfter?: string
}

export const Btn = forwardRef(({loading, children, disabled, icon, iconAfter, ...props}: BtnProps, ref: any) => {
  return (
    <Button {...props} disabled={disabled || loading} ref={ref}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ...(loading && {
            visibility: 'hidden',
          }),
        }}
      >
        {icon && (
          <Icon fontSize={props.size} sx={sx.icon}>
            {icon}
          </Icon>
        )}
        {children}
        {iconAfter && (
          <Icon
            fontSize={props.size}
            sx={{
              ...sx.icon,
              mr: 0,
              ml: 1,
            }}
          >
            {iconAfter}
          </Icon>
        )}
      </Box>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            mt: -1.5,
            ml: -1.5,
          }}
        />
      )}
    </Button>
  )
})
