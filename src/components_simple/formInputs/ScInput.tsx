import {FilledInputProps, Icon, IconButton, TextField, TextFieldProps, Tooltip} from '@mui/material'
import React from 'react'

export type ScInputProps = Pick<
  TextFieldProps,
  // pick props explicitly so we can understand this component better
  | 'inputProps'
  | 'type'
  | 'value'
  | 'placeholder'
  | 'label'
  | 'error'
  | 'helperText'
  | 'onChange'
  | 'onClick'
  | 'autoFocus'
  | 'InputLabelProps'
  | 'fullWidth'
  | 'multiline'
  | 'minRows'
  | 'maxRows'
  | 'inputRef'
  | 'tabIndex'
  | 'defaultValue'
  | 'sx'
  | 'autoComplete'
  | 'FormHelperTextProps'
> & {
  InputProps?: Partial<FilledInputProps>
  clearable?: {
    onClear: () => void
    label: string
  }
  required: boolean
}

export const ScInput = React.forwardRef(({required, clearable, InputProps, ...props}: ScInputProps, ref) => {
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
      }}
      FormHelperTextProps={{
        'aria-live': 'polite',
      }}
      inputProps={{
        ...props.inputProps,
        ...(required ? {'aria-required': true} : null),
      }}
      size="small"
      margin="dense"
      variant="outlined"
      inputRef={ref}
    />
  )
})
