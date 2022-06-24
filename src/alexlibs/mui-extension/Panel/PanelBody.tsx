import * as React from 'react'
import {ReactNode} from 'react'
import {Box, BoxProps, useTheme} from '@mui/material'

export interface PanelBodyProps extends BoxProps {
  children?: ReactNode;
  className?: string;
}

export const PanelBody = ({children, sx, ...props}: PanelBodyProps) => {
  const t = useTheme()
  return (
    <Box {...props} sx={{
      pl: 2,
      pr: 2,
      [t.breakpoints.up('sm')]: {
        pl: 3,
        pr: 3,
      },
      pt: 2,
      pb: 2,
      '&:last-child': {
        pb: 3,
      },
      ...sx
    }}>
      {children}
    </Box>
  )
}
