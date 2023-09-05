import {Box, BoxProps} from '@mui/material'
import {ReactNode} from 'react'

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
      <label>
        <span className="block">
          {label}
          {required && <span> *</span>}
        </span>
        {desc && <span className="block text-gray-600 text-sm">{desc}</span>}
      </label>
      {children}
    </Box>
  )
}
