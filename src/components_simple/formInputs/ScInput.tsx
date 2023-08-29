import {FilledInputProps, Icon, IconButton, TextField, TextFieldProps, Tooltip} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import React from 'react'

export type ScInputProps = Omit<TextFieldProps, 'variant' | 'margin'> & {
  small?: boolean
  InputProps?: Partial<FilledInputProps>
  onClear?: () => void
}

export const ScInput = React.forwardRef(({small, onClear, InputProps, ...props}: ScInputProps, ref) => {
  const {m} = useI18n()

  return (
    <TextField
      {...props}
      sx={{
        input: {
          '&::placeholder': {
            opacity: 0.7,
          },
        },
      }}
      InputProps={{
        ...InputProps,
        ...(onClear
          ? {
              endAdornment: (
                <>
                  {InputProps?.endAdornment}
                  <Tooltip title={m.clear}>
                    <IconButton size="small" color="primary" onClick={onClear}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </Tooltip>
                </>
              ),
            }
          : {}),
      }}
      size="small"
      margin="dense"
      variant="outlined"
      inputRef={ref}
    />
  )
})
