import {Box, Slide} from '@mui/material'
import * as React from 'react'
import {Header, headerHeight} from '../Header/Header'
import {useLayoutContext} from '../LayoutContext'

export const MobileHeader = () => {
  const {isMobileWidth} = useLayoutContext()
  return (
    <Slide direction="down" in={isMobileWidth} mountOnEnter unmountOnExit>
      <>
        <Box sx={{
          height: headerHeight + 'px',
        }}/>
        <Header sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          boxShadow: t => t.shadows[3],
        }}/>
      </>
    </Slide>
  )
}
