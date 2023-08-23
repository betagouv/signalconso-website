'use client'
import {Box} from '@mui/material'
import {ReactNode} from 'react'

export const Page = ({
  maxWidth = 'regular',
  className,
  children,
}: {
  maxWidth?: 'small' | 'regular' | number
  className?: string
  children: ReactNode
}) => {
  const mw = maxWidth === 'small' ? 680 : maxWidth === 'regular' ? 932 : maxWidth
  return (
    <Box
      {...{className}}
      sx={{
        margin: 'auto',
        width: '100%',
        maxWidth: mw,
        py: 3,
        px: 2,
      }}
    >
      {children}
    </Box>
  )
}
