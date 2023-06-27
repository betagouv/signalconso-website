import {throttle} from 'utils/lodashNamedExport'
import {useI18n} from 'i18n/I18n'
import {useFetcher} from '../../hooks/useFetcher'
import {Autocomplete, CircularProgress} from '@mui/material'
import React, {forwardRef, useEffect, useMemo, useState} from 'react'
import {ScInput, ScInputProps} from '../Input/ScInput'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {useApiClients} from '../../context/ApiClientsContext'

export interface AutocompleteCityValue {
  city?: string
  postalCode: string
}

export interface AutocompleteCityProps extends Omit<ScInputProps, 'value' | 'onChange'> {
  onChange: (_: AutocompleteCityValue) => void
}

function isValidPostalcode(i: string) {
  return /^[0-9]{5}$/g.test(i)
}
function isPartialPostalcode(i: string) {
  return /^[0-9]{1,4}$/g.test(i)
}
function buildDefaultOption(input: string) {
  return isValidPostalcode(input)
    ? [
        {
          city: '',
          postalCode: input,
        },
      ]
    : []
}

export const AutocompleteCity = forwardRef(({label, placeholder, onChange, ...inputProps}: AutocompleteCityProps, ref: any) => {
  const {m} = useI18n()
  const _fetchCity = useFetcher(useApiClients().adresseApiClient.fetchCity)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  function computeCityOptions(input: string) {
    if (_fetchCity.entity) {
      const cities = _fetchCity.entity.map(({city, postcode}) => ({
        city,
        postalCode: postcode,
      }))
      if (cities.find(_ => _.postalCode == input.trim()) || !isValidPostalcode(input)) {
        return cities
      }
    }
    return buildDefaultOption(input)
  }

  const fetch = useMemo(() => throttle(_fetchCity.fetch, 250), [])
  useEffect(() => {
    fetch({force: true, clean: false}, inputValue)
  }, [inputValue, fetch])

  return (
    <Autocomplete
      ref={ref}
      open={_fetchCity.error || inputValue == '' || isPartialPostalcode(inputValue) ? false : open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(event, newInputValue) => {
        onChange({
          city: '',
          postalCode: newInputValue,
        })
        setInputValue(newInputValue)
      }}
      onChange={(event, newValue: AutocompleteCityValue | null) => {
        if (newValue) {
          onChange(newValue)
          setInputValue(`${newValue.postalCode} ${newValue.city}`)
        }
      }}
      filterOptions={_ => _}
      isOptionEqualToValue={(option, value) => option.postalCode === value.postalCode}
      getOptionLabel={_ => _.city ?? ''}
      renderOption={(props, option) => (
        <li {...props}>
          <Txt color="hint">{option.postalCode}</Txt>&nbsp;
          <Txt bold>{option.city ?? ''}</Txt>
        </li>
      )}
      options={computeCityOptions(inputValue)}
      noOptionsText={m.noOptionsText}
      loadingText={m.loading}
      loading={_fetchCity.loading}
      renderInput={params => (
        <ScInput
          {...inputProps}
          {...params}
          placeholder={placeholder}
          label={label}
          inputProps={{
            ...inputProps.inputProps,
            ...params.inputProps,
            value: inputValue,
          }}
          InputProps={{
            ...inputProps.InputProps,
            ...params.InputProps,
            endAdornment: (
              <>
                {_fetchCity.loading ? <CircularProgress size={20} /> : null}
                {inputProps.InputProps?.endAdornment}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
})
