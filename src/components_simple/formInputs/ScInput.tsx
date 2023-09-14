import {FilledInputProps, Icon, IconButton, TextField, TextFieldProps, Tooltip} from '@mui/material'
import {useI18n} from 'i18n/I18n'
import React from 'react'

export type ScInputProps = Omit<TextFieldProps, 'variant' | 'margin'> & {
  small?: boolean
  InputProps?: Partial<FilledInputProps>
  clearable?: {
    onClear: () => void
    label: string
  }
  required: boolean
}

export const ScInput = React.forwardRef(({required, small, clearable, InputProps, ...props}: ScInputProps, ref) => {
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
        // default disabled color was a bit too light for accessibility
        // https://github.com/mui/material-ui/issues/17572
        '& .MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: '#6f6f6f',
        },
      }}
      InputProps={{
        ...InputProps,
        ...(clearable
          ? {
              endAdornment: (
                <>
                  {InputProps?.endAdornment}
                  <Tooltip title={clearable.label}>
                    <IconButton size="small" color="primary" onClick={clearable.onClear} aria-label={clearable.label}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </Tooltip>
                </>
              ),
            }
          : {}),
        inputProps: {
          ...(required ? {'aria-required': true} : null),
        },
      }}
      FormHelperTextProps={{
        'aria-live': 'polite',
      }}
      size="small"
      margin="dense"
      variant="outlined"
      inputRef={ref}
    />
  )
})
