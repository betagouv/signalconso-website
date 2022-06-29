import {FilledInputProps, Icon, TextField, TextFieldProps, Tooltip} from '@mui/material'
import React from 'react'
import {IconBtn} from '../../alexlibs/mui-extension'
import {useI18n} from 'core/i18n'

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
      InputProps={{
        ...InputProps,
        ...(onClear
          ? {
              endAdornment: (
                <>
                  {InputProps?.endAdornment}
                  <Tooltip title={m.clear}>
                    <IconBtn size="small" color="primary" onClick={onClear}>
                      <Icon>clear</Icon>
                    </IconBtn>
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
