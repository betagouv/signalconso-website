'use client'

import {forwardRef} from 'react'

import {Icon, IconProps} from '@mui/material'

export const ScIcon = forwardRef((props: IconProps, ref: any) => {
  return <Icon {...props} ref={ref} />
})
