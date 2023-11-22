import {ChildrenProps} from '@/utils/utils'
import {Box, BoxProps, Icon} from '@mui/material'
import React, {ReactNode} from 'react'

type RowProps = {
  dense?: boolean
  icon: string
} & ChildrenProps

export const Row = ({icon, dense, children, ...props}: RowProps) => {
  return (
    <Box sx={{display: 'flex', '& + &': {mt: dense ? 1.5 : 2}}} {...props}>
      <Box
        sx={{
          mr: dense ? 0.5 : 1,
          mt: 0.25,
          minWidth: 30,
          textAlign: 'center',
        }}
      >
        <Icon
          sx={{
            color: t => t.palette.text.disabled,
          }}
        >
          {icon}
        </Icon>
      </Box>
      <Box sx={{width: '100%', alignSelf: 'center', minHeight: dense ? 24 : 32}}>{children}</Box>
    </Box>
  )
}
