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
  // /!\ These work only if the date is picked in the widget
  // The user can always go around these limits by typing a date manually
  min?: Date
  max?: Date
}

const toStr = (_: Date) => format(_, 'yyyy-MM-dd')

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
