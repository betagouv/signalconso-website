import {FilledInputProps, Icon, TextField, TextFieldProps} from '@mui/material'
import React from 'react'
import {IconBtn} from 'mui-extension'

export type ScInputProps = Omit<TextFieldProps, 'variant' | 'margin'> & {
  small?: boolean
  InputProps?: Partial<FilledInputProps>
  onClear?: () => void
}

export const ScInput = React.forwardRef(({small, onClear, InputProps, ...props}: ScInputProps, ref) => {
  return <TextField
    {...props}
    InputProps={{
      ...InputProps,
      ...(onClear ? {
        endAdornment: (
          <IconBtn size="small" color="primary" onClick={onClear}>
            <Icon>clear</Icon>
          </IconBtn>
        )
      } : {})
    }}
    size="small"
    variant="outlined"
    margin="dense"
    inputRef={ref}
  />
})
