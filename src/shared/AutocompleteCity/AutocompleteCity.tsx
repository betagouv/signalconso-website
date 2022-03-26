import {useConfig} from 'core/context/ConfigContext'
import {ApiAdresse, City} from 'core/client/ApiAdresse'
import {throttle} from 'core/lodashNamedExport'
import {useI18n} from 'core/i18n'
import {useEffectFn, useFetcher} from '@alexandreannic/react-hooks-lib'
import {ApiClient} from '@signal-conso/signalconso-api-sdk-js'
import {Autocomplete, CircularProgress} from '@mui/material'
import React, {useEffect, useMemo, useState} from 'react'
import {ScInput, ScInputProps} from '../Input/ScInput'
import {Txt} from 'mui-extension'

export interface AutocompleteCityValue {
  city: string
  postalCode: string
}

interface Props extends Omit<ScInputProps, 'value' | 'onChange'> {
  value?: AutocompleteCityValue
  onChange: (_: AutocompleteCityValue) => void
}

export const AutocompleteCity = ({label, placeholder, value, onChange}: Props) => {
  const {m} = useI18n()
  const config = useConfig().config
  const _apiAdresse = useFetcher(new ApiAdresse(new ApiClient({baseUrl: config.apiAdresseUrl})).fetchCity)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const fetch = useMemo(
    () => throttle(_apiAdresse.fetch, 200,),
    [],
  )
  useEffect(() => {
    fetch({force: true, clean: false}, inputValue)
  }, [inputValue, fetch])

  useEffectFn(value, _ => {
    setInputValue(_.city)
  })

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      onChange={(event: any, newValue: City | null) => {
        if (newValue) {
          onChange({city: newValue.city, postalCode: newValue.postcode})
        }
      }}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={_ => _.label}
      renderOption={(props, option) => (
        <li {...props}>
          <Txt color="hint">{option.postcode}</Txt>&nbsp;
          <Txt bold>{option.label}</Txt>
        </li>
      )}
      options={_apiAdresse.entity ?? []}
      noOptionsText={m.noOptionsText}
      loadingText={m.loading}
      loading={_apiAdresse.loading}
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
                {_apiAdresse.loading ? <CircularProgress size={20}/> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )

}
