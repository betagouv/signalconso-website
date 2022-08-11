import {format} from 'date-fns'
import {InputProps as StandardInputProps} from '@mui/material'
import React, {forwardRef} from 'react'
import {BaseTextFieldProps} from '@mui/material/TextField/TextField'
import {ScInput} from '../Input/ScInput'

export interface ScDatepickerProps extends BaseTextFieldProps {
  value?: Date
  onChange: (_: Date) => void
  label?: string
  InputProps?: Partial<StandardInputProps>
  // /!\ These are only indicative
  // The user can always go around these limits by typing a date manually instead of using the picker
  min?: Date
  max?: Date
}

const toStr = (_: Date) => {
  // The user may type a date like 01/01/22222
  // This can be read as a Date but then it can't be formatted back to a string for some reason
  try {
    return format(_, 'yyyy-MM-dd')
  } catch (e) {
    return ''
  }
}

export const ScDatepicker = forwardRef(({value, onChange, min, max, ...props}: ScDatepickerProps, ref: any) => {
  return (
    <ScInput
      inputRef={ref}
      inputProps={{
        ...(max && {max: toStr(max)}),
        ...(min && {min: toStr(min)}),
      }}
      {...props}
      type="date"
      value={value ? toStr(value) : ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.valueAsDate!)
      }}
      InputLabelProps={{shrink: true}}
    />
  )
})
