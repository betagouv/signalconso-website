import {format} from 'date-fns'
import {InputProps as StandardInputProps} from '@mui/material'
import React, {forwardRef} from 'react'
import {BaseTextFieldProps} from '@mui/material/TextField/TextField'
import {ScInput} from '../Input/ScInput'

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
  try {
    return format(date, 'yyyy-MM-dd')
  } catch (e: any) {
    return format(new Date(), 'yyyy-MM-dd')
  }
}

export const ScDatepicker = forwardRef(({value, onChange, min, max, ...props}: ScDatepickerProps, ref: any) => {
  return (
    <ScInput
      inputRef={ref}
      inputProps={{
        max: max,
        min: min,
      }}
      {...props}
      type="date"
      value={value ? mapDate(value) : ''}
      onChange={onChange ? onChangeDate(onChange) : undefined}
      InputLabelProps={{shrink: true}}
    />
  )
})

