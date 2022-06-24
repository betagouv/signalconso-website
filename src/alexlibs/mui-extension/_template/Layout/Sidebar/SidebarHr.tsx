import * as React from 'react'
import {Box, BoxProps} from '@mui/material'

export interface SidebarHrProps extends Omit<BoxProps, 'margin'> {
  margin?: boolean
}

export const SidebarHr = ({
  margin,
  sx,
  ...props
}: SidebarHrProps) => {
  return (
    <Box {...props} sx={{
      height: 1,
      background: t => t.palette.divider,
      ...margin && {
        my: 1,
      },
      ...sx,
    }}/>
  )
}
