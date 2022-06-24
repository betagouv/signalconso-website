import * as React from 'react'
import {ReactNode} from 'react'
import {CardActions, CardActionsProps} from '@mui/material'

export interface PanelFootProps extends CardActionsProps {
  children?: ReactNode;
  className?: string;
}

export const PanelFoot = ({children, className, ...props}: PanelFootProps) => {
  return (
    <CardActions {...props} className={`${className || ''}`}>
      {children}
    </CardActions>
  )
}
