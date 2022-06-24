import * as React from 'react'
import {Box, BoxProps, SwipeableDrawer} from '@mui/material'
import {sidebarWith} from '../Layout'
import {Header} from '../Header/Header'
import {useLayoutContext} from '../LayoutContext'

export interface SidebarProps extends BoxProps {
}

export const Sidebar = ({children, sx, ...props}: SidebarProps) => {
  const {isMobileWidth, isMobileSidebarOpened, openMobileSidebar, closeMobileSidebar} = useLayoutContext()
  const opened = !isMobileWidth || isMobileSidebarOpened

  return (
    <SwipeableDrawer
      open={opened}
      onOpen={openMobileSidebar}
      onClose={closeMobileSidebar}
      variant={isMobileWidth ? 'temporary' : 'permanent'}>
      <>
        <Box {...props} sx={{
          width: sidebarWith,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 0,
          ...sx
        }}>
          <Header/>
          {children}
        </Box>
      </>
    </SwipeableDrawer>
  )
}
