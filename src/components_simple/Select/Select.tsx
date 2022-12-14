import React, {CSSProperties, useMemo} from 'react'
import {FormControl, FormHelperText, InputLabel, Select, SelectProps} from '@mui/material'

interface ScSelectProps<T> extends SelectProps<T> {
  label?: string
  children?: React.ReactNode
  className?: string
  style?: CSSProperties
  small?: boolean
  helperText?: string
}

const _ScSelect = <T,>(
  {id: argId, label, className, small, fullWidth, style, helperText, error, ...selectProps}: ScSelectProps<T>,
  ref: any,
) => {
  const id: string = useMemo(() => argId ?? 'sc-select-' + Math.floor(Math.random() * 10000), [argId])
  return (
    <FormControl
      error={error}
      fullWidth={fullWidth}
      size="small"
      margin="dense"
      variant="outlined"
      className={className}
      style={style}
    >
      <InputLabel htmlFor={id} id={id + '-label'}>
        {label}
      </InputLabel>
      <Select {...selectProps} inputRef={ref} labelId={id + '-label'} id={id} />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

/**
 * Workaround because forwardRef break the generic type of ScSelect.
 */
export const ScSelect = React.forwardRef(_ScSelect) as <T>(
  props: ScSelectProps<T> & {ref?: React.ForwardedRef<any>},
) => ReturnType<typeof _ScSelect>
