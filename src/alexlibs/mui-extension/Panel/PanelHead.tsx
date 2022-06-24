import * as React from 'react'
import {Box, BoxProps, Divider, Icon, useTheme} from '@mui/material'

export interface PanelHeadProps extends BoxProps {
  icon?: string;
  action?: any;
}

export const PanelHead = ({sx, icon, children, action, ...props}: PanelHeadProps) => {
  const t = useTheme()
  return (
    <>
      <Box {...props} sx={{
        pl: 2,
        [t.breakpoints.up('sm')]: {
          pl: 3,
          pr: 3,
        },
        display: 'flex',
        alignItems: 'center',
        color: t => t.palette.text.secondary,
        background: t => t.palette.mode === 'light' ? t.palette.grey[100] : t.palette.grey[900],
        pr: t.spacing(1) + 'px !important',
        order: -1, // To be positioned before loader,
        height: 48,
      }}>
        {icon &&
        <Icon sx={{mr: 2}}>{icon}</Icon>
        }
        <Box sx={{flex: 1}}>{children}</Box>
        <Box>
          {action}
        </Box>
      </Box>
      <Divider/>
    </>
  )
}
