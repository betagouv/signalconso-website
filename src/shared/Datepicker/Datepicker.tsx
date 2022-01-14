import {format} from 'date-fns'
import {InputProps as StandardInputProps, TextField} from '@mui/material'
import React, {CSSProperties, forwardRef} from 'react'

export interface ScDatepickerProps {
  value?: Date
  onChange?: (_: Date) => void
  label?: string
  className?: string
  InputProps?: Partial<StandardInputProps>
  style?: CSSProperties
  fullWidth?: boolean
  placeholder?: string
  min?: string
  max?: string
}

const onChangeDate = (callback: (date: Date) => any) => (e: React.ChangeEvent<HTMLInputElement>) => {
  callback(e.target.valueAsDate!)
}

const mapDate = (date: Date): string => format(date, 'yyyy-MM-dd')

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

