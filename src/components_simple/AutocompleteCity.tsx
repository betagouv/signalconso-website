import {Autocomplete, CircularProgress} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {useI18n} from 'i18n/I18n'
import React, {forwardRef, useEffect, useState} from 'react'
import {Txt} from './Txt'
import {useApiClients} from '../context/ApiClientsContext'
import {ScInput, ScInputProps} from './formInputs/ScInput'
import {useThrottle} from 'utils/useThrottle'

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

function useStateWithThrottledCopy<A>(defaultValue: A): [A, React.Dispatch<React.SetStateAction<A>>, A] {
  const [state, setState] = useState(defaultValue)
  const [throttledCopy, setThrottledCopy] = useThrottle(state, 5)
  useEffect(() => {
    // always copy the first state into the second one
    // But since it's throttled, it will delay changes a bit
    setThrottledCopy(state)
  }, [state])
  // Return a normal version (to be used when displaying)
  // And a throttled copy (doesn't update as often, but it's useful to throttle API calls based on it)
  return [state, setState, throttledCopy]
}

export const AutocompleteCity = forwardRef(({label, placeholder, onChange, ...inputProps}: AutocompleteCityProps, ref: any) => {
  const {m} = useI18n()
  const [inputValue, setInputValue, throttledInputValue] = useStateWithThrottledCopy('')
  const adresseApiClient = useApiClients().adresseApiClient
  const _fetchCity = useQuery(['fetchCity', throttledInputValue], () => adresseApiClient.fetchCity(throttledInputValue))
  const [open, setOpen] = useState(false)

  function computeCityOptions(input: string) {
    if (_fetchCity.data) {
      const cities = _fetchCity.data.map(({city, postcode}) => ({
        city,
        postalCode: postcode,
      }))
      if (cities.find(_ => _.postalCode == input.trim()) || !isValidPostalcode(input)) {
        return cities
      }
    }
    return buildDefaultOption(input)
  }

  const actuallyOpen = _fetchCity.error || inputValue == '' || isPartialPostalcode(inputValue) ? false : open

  return (
    <Autocomplete
      ref={ref}
      open={actuallyOpen}
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
      loading={_fetchCity.isLoading}
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
                {_fetchCity.isLoading ? <CircularProgress size={20} /> : null}
                {inputProps.InputProps?.endAdornment}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          required={inputProps.required}
        />
      )}
    />
  )
})
