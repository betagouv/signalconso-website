import React, {ReactNode} from 'react'
import {Txt} from '../../alexlibs/mui-extension'
import {Box, BoxProps} from '@mui/material'

interface Props extends BoxProps {
  label?: ReactNode
  desc?: ReactNode
  required?: boolean
  children: ReactNode
}

export const FormLayout = ({label, desc, required, children, ...sx}: Props) => {
  return (
    <Box
      sx={{
        ...sx,
        '& + &': {
          mt: 2,
        },
      }}
    >
      <Txt block>
        {label}
        {required && <Txt color="disabled"> *</Txt>}
      </Txt>
      <Txt block color="hint" size="small">
        {desc}
      </Txt>
      {children}
    </Box>
  )
}
