import {Box, BoxProps, Icon} from '@mui/material'
import React, {ReactNode} from 'react'

interface RowProps extends BoxProps {
  dense?: boolean
  icon?: string | ReactNode
}

export const Row = ({
  icon,
  dense,
  children,
  sx,
  ...props
}: RowProps) => {
  return (
    <Box sx={{display: 'flex', '& + &': {mt: dense ? 1.5 : 2}, ...sx}} {...props}>
      {typeof icon === 'string' ? (
        <Icon sx={{
          mr: dense ? 1 : 2,
          mt: .25,
          minWidth: 30,
          textAlign: 'center',
          color: t => t.palette.text.disabled
        }}>{icon}</Icon>
      ) : (
        icon
      )}
      <Box sx={{width: '100%', minHeight: dense ? 24 : 32}}>{children}</Box>
    </Box>
  )
}

