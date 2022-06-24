import * as React from 'react'
import {Box, BoxProps} from '@mui/material'

export interface SidebarFooterProps extends BoxProps {
}

export const SidebarFooter = ({children, sx, ...props}: SidebarFooterProps) => {
  return (
    <Box {...props} sx={{
      pt: 1 / 2,
      pb: 1 / 2,
      borderTop: t => '1px solid ' + t.palette.divider,
      ...sx
    }}>
      {children}
    </Box>
  )
}
