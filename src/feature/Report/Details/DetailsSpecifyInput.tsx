import {Control, Controller} from 'react-hook-form'
import {FieldError} from 'react-hook-form/dist/types/errors'
import {useI18n} from 'core/i18n'
import {ScInput} from 'shared/Input/ScInput'
import {stopPropagation} from '../../../alexlibs/mui-extension'
import React from 'react'

export const DetailsSpecifyInput = ({
  name,
  defaultValue,
  control,
  error,
}: {
  name: string
  defaultValue?: string | string[]
  control: Control<any, any>
  error?: FieldError
}) => {
  const {m} = useI18n()
  return (
    <Controller
      defaultValue={defaultValue ?? ''}
      control={control}
      name={name}
      rules={{
        required: {value: true, message: m.required + ' *'},
      }}
      render={({field}) => (
        <ScInput
          {...field}
          error={!!error}
          helperText={error?.message}
          autoFocus
          onClick={stopPropagation(() => void 0)}
          fullWidth
          placeholder={m.specify}
        />
      )}
    />
  )
}
