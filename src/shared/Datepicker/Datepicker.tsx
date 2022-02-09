import {format} from 'date-fns'
import {InputProps as StandardInputProps, TextField} from '@mui/material'
import React, {forwardRef} from 'react'
import {BaseTextFieldProps} from '@mui/material/TextField/TextField'

export interface ScDatepickerProps extends BaseTextFieldProps {
  value?: Date
  onChange?: (_: Date) => void
  label?: string
  InputProps?: Partial<StandardInputProps>
  min?: string
  max?: string
}

const onChangeDate = (callback: (date: Date) => any) => (e: React.ChangeEvent<HTMLInputElement>) => {
  callback(new Date(e.target.valueAsDate!))
}

const mapDate = (date: Date): string => {
  console.log('ScDatepicker.mapdate', date)
  return format(date, 'yyyy-MM-dd')
}

export const ScDatepicker = forwardRef(({value, onChange, min, max, ...props}: ScDatepickerProps, ref: any) => {
  return (
    <TextField
      inputRef={ref}
      inputProps={{
        max: max,
        min: min,
      }}
      {...props}
      type="date"
      margin="dense"
      variant="outlined"
      size="small"
      value={value ? mapDate(value) : ''}
      onChange={onChange ? onChangeDate(onChange) : undefined}
      InputLabelProps={{shrink: true}}
    />
  )
})

