import {Box} from '@mui/material'
import {ReactElement, ReactNode} from 'react'

interface Props {
  label?: ReactNode
  desc?: ReactNode
  required?: boolean
  // 'children' is supposed to be the <input>
  // that way the label and input are linked, for accessibility
  children: ReactElement
  className?: string
}

export const FieldLabel = ({label, desc, required, children, className = ''}: Props) => {
  return (
    <Box
      className={className}
      sx={{
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
        {children}
      </label>
    </Box>
  )
}
