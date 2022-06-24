import * as React from 'react'
import {ReactNode} from 'react'
import {Box, BoxProps, Icon} from '@mui/material'
import {alpha} from '@mui/material/styles'
import {useLayoutContext} from '../LayoutContext'

export interface SidebarItemProps extends BoxProps {
  icon?: string | ReactNode
  large?: boolean
  active?: boolean
}

export const SidebarItem = ({children, icon, active, large, sx, ...other}: SidebarItemProps) => {
  const {closeMobileSidebar} = useLayoutContext()
  const clickable = true

  return (
    <Box onClick={closeMobileSidebar}>
      <Box {...other} sx={{
        transition: t => t.transitions.create('all'),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'inherit',
        pr: 1,
        pl: 2,
        color: t => t.palette.text.primary,
        minHeight: 32,
        mt: 1 / 8,
        mb: 1 / 8,
        mr: 1,
        ml: 1,
        borderRadius: 42,
        ...active && {
          color: t => t.palette.primary.main,
          background: t => alpha(t.palette.primary.main, .16),
        },
        ...clickable && {
          cursor: 'pointer',
          '&:hover': {
            background: 'rgba(0, 0, 0, .05)',
          },
        },
        ...large && {
          minHeight: 38,
        },
        ...sx,
      }}>
        <>
          {icon && ((typeof icon === 'string') ? (
            <Icon sx={{
              textAlign: 'center',
              mr: 2,
            }}>
              {icon}
            </Icon>
          ) : (
            <Box sx={{
              textAlign: 'center',
              mr: 2,
            }}>
              {icon}
            </Box>
          ))}
          <Box component="label" sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            fontSize: t => t.typography.fontSize,
            fontWeight: t => t.typography.fontWeightMedium,
          }}>{children}</Box>
        </>
      </Box>
    </Box>
  )
}
