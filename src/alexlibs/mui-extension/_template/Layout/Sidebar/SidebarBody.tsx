import * as React from 'react'
import {Box, BoxProps} from '@mui/material'

export interface SidebarBodyProps extends BoxProps{
}

export const SidebarBody = ({children, sx,...props}: SidebarBodyProps) => {
  return (
    <Box {...props} sx={{
      pt: 1 / 2,
      pb: 1 / 2,
      flex: 1,
      overflowY: 'auto',
      ...sx
    }}>
      {children}
    </Box>
  )
}
