import * as React from 'react'
import {ReactNode} from 'react'
import {Box, BoxProps} from '@mui/material'
import {MobileHeader} from './MobileHeader/MobileHeader'
import {LayoutProvider, useLayoutContext} from './LayoutContext'

export const sidebarWith = 220

export interface LayoutProps extends BoxProps {
  title?: string
  mobileBreakpoint?: number
  sidebar?: ReactNode
}

export const Layout = ({title, mobileBreakpoint, children, sidebar, ...rest}: LayoutProps) => {
  return (
    <LayoutProvider title={title} mobileBreakpoint={mobileBreakpoint}>
      <LayoutUsingContext sidebar={sidebar} {...rest}>
        {children}
      </LayoutUsingContext>
    </LayoutProvider>
  )
}

const LayoutUsingContext = ({children, sidebar: Sidebar, sx, ...rest}: BoxProps & {sidebar: any}) => {
  const {isMobileWidth} = useLayoutContext()
  return (
    <>
      <MobileHeader/>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          ...!isMobileWidth && {
            marginLeft: sidebarWith + 'px',
          }
        }}
        {...rest}
      >
        {Sidebar && <Sidebar/>}
        {children}
      </Box>
    </>
  )
}
