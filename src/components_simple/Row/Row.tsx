import {Box, BoxProps, Icon} from '@mui/material'
import React, {ReactNode} from 'react'

interface RowProps extends BoxProps {
  dense?: boolean
  icon?: string | ReactNode
}

export const Row = ({icon, dense, children, sx, ...props}: RowProps) => {
  return (
    <Box sx={{display: 'flex', '& + &': {mt: dense ? 1.5 : 2}, ...sx}} {...props}>
      <Box
        sx={{
          mr: dense ? 0.5 : 1,
          mt: 0.25,
          minWidth: 30,
          textAlign: 'center',
        }}
      >
        {typeof icon === 'string' ? (
          <Icon
            sx={{
              color: t => t.palette.text.disabled,
            }}
          >
            {icon}
          </Icon>
        ) : (
          icon
        )}
      </Box>
      <Box sx={{width: '100%', alignSelf: 'center', minHeight: dense ? 24 : 32}}>{children}</Box>
    </Box>
  )
}
