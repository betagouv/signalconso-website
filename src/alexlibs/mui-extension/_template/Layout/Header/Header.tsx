import {Box, BoxProps, Icon} from '@mui/material'
import * as React from 'react'
import {useLayoutContext} from '../LayoutContext'
import {IconBtn} from '../../../IconBtn/IconBtn'

export const headerHeight = 52

export const Header = ({sx, ...props}: BoxProps) => {
  const {title, isMobileWidth, isMobileSidebarOpened, toggleMobileSidebar} = useLayoutContext()
  return (
    <Box component="header" {...props} sx={{
      height: headerHeight,
      display: 'flex',
      alignItems: 'center',
      pr: 2,
      pl: 1.25,
      background: t => t.palette.background.paper,
      ...sx,
    }}>
      <IconBtn
        onClick={toggleMobileSidebar}
        sx={{
          ...!isMobileWidth && {
            visibility: 'hidden',
          }
        }}
      >
        <Icon>{isMobileSidebarOpened ? 'clear' : 'menu'}</Icon>
      </IconBtn>
      <Box sx={{
        flex: 1,
        fontSize: t => t.typography.h6.fontSize,
      }}>{title}</Box>
    </Box>
  )
}
