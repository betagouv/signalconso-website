import {BaseTextFieldProps} from '@mui/material/TextField/TextField'
import {frenchToIsoFormat, isoToFrenchFormat} from 'utils/utils'
import React, {forwardRef} from 'react'
import {ScInput} from './ScInput'

// /!\ In this datepicker every date (input and output)
// is a string in the french format dd/mm/yyyy
export interface ScDatepickerProps extends BaseTextFieldProps {
  value?: string
  onChange: (_: string) => void
  required: boolean
  // These are only indicative
  // The user can always go around these limits by typing a date manually instead of using the picker
  min?: string
  max?: string
}

export const ScDatepickerFr = forwardRef(({value, onChange, required, min, max, ...props}: ScDatepickerProps, ref: any) => {
  return (
    <ScInput
      inputRef={ref}
      inputProps={{
        ...(max && {max: frenchToIsoFormat(max)}),
        ...(min && {min: frenchToIsoFormat(min)}),
      }}
      {...props}
      required={required}
      type="date"
      value={value ? frenchToIsoFormat(value) : ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(isoToFrenchFormat(e.target.value))
      }}
      InputLabelProps={{shrink: true}}
      FormHelperTextProps={{
        'aria-live': 'polite',
      }}
    />
  )
})
