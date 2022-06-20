import {styleUtils} from 'core/theme/theme'
import {TextMaskCustom} from './InputValidationCodeMask'
import {Box, useTheme} from '@mui/material'
import {ScInput, ScInputProps} from 'shared/Input/ScInput'
import React from 'react'
import {useI18n} from 'core/i18n'

interface Props extends ScInputProps {}

export const InputValidationCode = ({...other}: Props) => {
  const theme = useTheme()
  const {m} = useI18n()
  const fontSize = styleUtils(theme).fontSize.title
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <ScInput
        {...other}
        sx={{
          maxWidth: 178,
          '&': {
            fontFamily: 'monospace',
            letterSpacing: 6,
            fontWeight: t => t.typography.fontWeightBold,
          },
          '& input::placeholder': {
            fontFamily: 'monospace',
          },
        }}
        placeholder={m.consumerCodePlaceholder}
        inputProps={{style: {fontSize}}}
        InputProps={{
          inputComponent: TextMaskCustom as any,
          startAdornment: <Box sx={{mr: 0, fontSize, color: t => t.palette.text.disabled}}>SC-</Box>,
        }}
      />
    </Box>
  )
}
