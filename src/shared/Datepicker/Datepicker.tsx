import {BaseTextFieldProps} from '@mui/material/TextField/TextField'
import {frenchToIsoFormat, isoToFrenchFormat} from 'core/helper/utils'
import React, {forwardRef} from 'react'
import {ScInput} from '../Input/ScInput'

// /!\ In this datepicker every date (input and output)
// is a string in the french format dd/mm/yyyy
export interface ScDatepickerProps extends BaseTextFieldProps {
  value?: string
  onChange: (_: string) => void
  // These are only indicative
  // The user can always go around these limits by typing a date manually instead of using the picker
  min?: string
  max?: string
}

export const ScDatepicker = forwardRef(({value, onChange, min, max, ...props}: ScDatepickerProps, ref: any) => {
  return (
    <ScInput
      inputRef={ref}
      inputProps={{
        ...(max && {max: frenchToIsoFormat(max)}),
        ...(min && {min: frenchToIsoFormat(min)}),
      }}
      {...props}
      type="date"
      value={value ? frenchToIsoFormat(value) : ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(isoToFrenchFormat(e.target.value))
      }}
      InputLabelProps={{shrink: true}}
    />
  )
})
