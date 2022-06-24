import * as React from 'react'
import {Typography, TypographyProps} from '@mui/material'

export interface SidebarTitleProps extends TypographyProps {
}

export const SidebarTitle = ({sx, ...props}: SidebarTitleProps) => {
  return (
    <Typography variant="caption" noWrap {...props} sx={{
      fontWeight: t => t.typography.fontWeightMedium,
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: t => t.palette.text.disabled,
      mb: 2,
      ...sx
    }}/>
  )
}
