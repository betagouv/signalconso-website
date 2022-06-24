import * as React from 'react'
import {Box, BoxProps} from '@mui/material'

export interface SidebarHeaderProps extends BoxProps {
}

export const SidebarHeader = ({sx, ...props}: SidebarHeaderProps) => {
  return (
    <Box {...props} sx={{
      pt: 1 / 2,
      pb: 1 / 2,
      borderTop: t => '1px solid ' + t.palette.divider,
      borderBottom: t => '1px solid ' + t.palette.divider,
      ...sx
    }}/>
  )
}
