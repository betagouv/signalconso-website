import React, {ReactNode} from 'react'
import {Txt} from 'mui-extension'
import {Box, BoxProps} from '@mui/material'

interface Props extends BoxProps {
  label?: ReactNode
  required?: boolean
  children: ReactNode
}

export const FormLayout = ({label, required, children, ...sx}: Props) => {
   return (
     <Box sx={{
       ...sx,
       '& + &': {
         mt: 2,
       }
     }}>
       <Txt block>
         {label}
         {required && <Txt color="disabled"> *</Txt>}
       </Txt>
       {children}
     </Box>
   )
}
