import {ApiAdresse, City} from 'core/client/ApiAdresse'
import {throttle} from 'core/lodashNamedExport'
import {useI18n} from 'core/i18n'
import {useEffectFn, useFetcher} from '@alexandreannic/react-hooks-lib'
import {Autocomplete, CircularProgress} from '@mui/material'
import React, {forwardRef, useEffect, useMemo, useState} from 'react'
import {ScInput, ScInputProps} from '../Input/ScInput'
import {Txt} from 'mui-extension'
import {useConfig} from '../../core/context/ConfigContext'
import {ApiClient} from '@signal-conso/signalconso-api-sdk-js'

export interface AutocompleteCityValue {
  city?: string
  postalCode: string
}

export interface AutocompleteCityProps extends Omit<ScInputProps, 'value' | 'onChange'> {
  value?: AutocompleteCityValue
  onChange: (_: AutocompleteCityValue) => void
}

export const AutocompleteCity = forwardRef(({label, placeholder, value, onChange}: AutocompleteCityProps, ref: any) => {
  const {m} = useI18n()
  const config = useConfig().config
  const api = useFetcher(new ApiAdresse(new ApiClient({baseUrl: config.apiAdresseUrl})).fetchCity)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const fetch = useMemo(
    () => throttle(api.fetch, 200,),
    [],
  )
  useEffect(() => {
    fetch({force: true, clean: false}, inputValue)
  }, [inputValue, fetch])

  useEffectFn(value, _ => {
    setInputValue(`${_.postalCode} ${_.city}`)
  })

  return (
    <Autocomplete
      ref={ref}
      open={api.error ? false : open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      onChange={(event: any, newValue: City | null) => {
        if (newValue) {
          onChange({city: newValue.city, postalCode: newValue.postcode})
          setInputValue(`${newValue.postcode} ${newValue.city}`)
        }
      }}
      filterOptions={_ => _}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={_ => _.label}
      renderOption={(props, option) => (
        <li {...props}>
          <Txt color="hint">{option.postcode}</Txt>&nbsp;
          <Txt bold>{option.label}</Txt>
        </li>
      )}
      options={api.entity ?? []}
      noOptionsText={m.noOptionsText}
      loadingText={m.loading}
      loading={api.loading}
      renderInput={(params) => (
        <ScInput
          {...params}
          placeholder={placeholder}
          label={label}
          inputProps={{
            ...params.inputProps,
            value: inputValue,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {api.loading ? <CircularProgress size={20}/> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
})
