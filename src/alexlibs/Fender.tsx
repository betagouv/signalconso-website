'use client'
import {Box, BoxProps, Icon} from '@mui/material'
import {ReactNode} from 'react'
import {colorSuccess} from './color'

type State = 'empty' | 'success'

export interface FenderProps extends Omit<BoxProps, 'title'> {
  type?: State
  icon?: string
  iconSize?: number
  title?: ReactNode
  description?: ReactNode
}

export const Fender = ({children, icon, iconSize = 100, type = 'empty', title, description, sx, ...props}: FenderProps) => {
  const getIcon = () => {
    if (icon) return renderIcon(icon)
    switch (type) {
      case 'empty':
        return renderIcon('do_not_disturb')

      case 'success':
        return renderIcon('check_circle_outline')
    }
  }

  const renderIcon = (name: string) => <Icon sx={{fontSize: `${iconSize}px !important`}}>{name}</Icon>

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
            ...{
              empty: {
                color: (t: any) => t.palette.text.disabled,
              },
              success: {
                color: colorSuccess,
              },
            }[type],
          }}
        >
          {getIcon()}
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
