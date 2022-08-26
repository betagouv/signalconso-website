import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {Box, BoxProps} from '@mui/material'

export interface PageProps extends BoxProps {
  width?: number
  animated?: boolean
  className?: any
  style?: object
  children: ReactNode | ReactNode[]
}

let timeout: NodeJS.Timeout | undefined

const Page = ({children, width, sx, animated = true, ...props}: PageProps) => {
  const [appeared, setAppeared] = useState(false)

  useEffect(() => {
    if (animated) timeout = setTimeout(() => setAppeared(true))
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  return (
    <Box
      {...props}
      sx={{
        transition: t => t.transitions.create('all', {easing: 'ease', duration: 160}),
        margin: 'auto',
        opacity: 0,
        transform: 'scale(.90)',
        maxWidth: 932,
        width: '100%',
        ...((!animated || appeared) && {
          opacity: 1,
          transform: 'scale(1)',
        }),
        ...(width && {maxWidth: width}),
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Page
