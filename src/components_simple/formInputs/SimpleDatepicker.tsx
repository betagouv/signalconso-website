import {TextField} from '@mui/material'
import {dateToIsoFormatWithoutTime} from 'utils/utils'
import React, {forwardRef} from 'react'

interface Props {
  value?: Date
  onChange: (_: Date | undefined) => void
  // They are only indicative
  // The user can always go around these limits by typing a date manually instead of using the picker
  min?: Date
  max?: Date
  // overrides min and max to sensible values
  limited?: boolean
  label?: string
}

export const SimpleDatepicker = forwardRef(({label, value, onChange, min, max, limited}: Props, ref: any) => {
  const finalMin = limited ? new Date(1970, 0, 1) : min
  const finalMax = limited ? new Date(2050, 0, 1) : max

  return (
    <TextField
      label={label}
      type="date"
      value={value ? dateToIsoFormatWithoutTime(value) : ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value === '' ? undefined : new Date(e.target.value))
      }}
      inputProps={{
        ...(finalMin && {min: dateToIsoFormatWithoutTime(finalMin)}),
        ...(finalMax && {max: dateToIsoFormatWithoutTime(finalMax)}),
      }}
      InputLabelProps={{
        shrink: true,
        size: 'normal',
      }}
      FormHelperTextProps={{
        'aria-live': 'polite',
      }}
      fullWidth
    />
  )
})
