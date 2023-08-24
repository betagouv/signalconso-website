'use client'
import {Box, BoxProps, Icon} from '@mui/material'
import {ReactNode} from 'react'

export interface FenderProps extends Omit<BoxProps, 'title'> {
  icon: string
  iconSize?: number
  iconColor?: string
  title?: ReactNode
  description?: ReactNode
}

// Displays a big icon in the center and a description underneath
export const Fender = ({children, icon, iconSize = 100, iconColor, title, description, sx, ...props}: FenderProps) => {
  return (
    <Box
      {...props}
      sx={{
        transition: t => t.transitions.create('all'),
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <div>
        <Box
          sx={{
            height: iconSize + 10,
            mt: 1,
            lineHeight: 1,
            color: (t: any) => iconColor ?? t.palette.text.disabled,
          }}
        >
          <Icon sx={{fontSize: `${iconSize}px !important`}}>{icon}</Icon>
        </Box>
        <Box sx={{mt: 1}}>
          {title && <Box sx={{fontSize: 24}}>{title}</Box>}
          {description && <Box>{description}</Box>}
          {children}
        </Box>
      </div>
    </Box>
  )
}
