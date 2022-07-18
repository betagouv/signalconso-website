import {throttle} from 'core/lodashNamedExport'
import {useI18n} from 'core/i18n'
import {useEffectFn, useFetcher} from '../../alexlibs/react-hooks-lib'
import {Autocomplete, CircularProgress} from '@mui/material'
import React, {forwardRef, useEffect, useMemo, useState} from 'react'
import {ScInput, ScInputProps} from '../Input/ScInput'
import {Txt} from '../../alexlibs/mui-extension'
import {useApiSdk} from '../../core/context/ApiSdk'

export interface AutocompleteCityValue {
  city?: string
  postalCode: string
}

export interface AutocompleteCityProps extends Omit<ScInputProps, 'value' | 'onChange'> {
  value?: AutocompleteCityValue
  onChange: (_: AutocompleteCityValue) => void
}

const isValidPostalcode = (i: string) => /^[0-9]{5}$/g.test(i)
const defaultCityOption = (i: string) =>
  isValidPostalcode(i)
    ? [
        {
          city: '',
          postalCode: i,
        },
      ]
    : []

export const AutocompleteCity = forwardRef(
  ({label, placeholder, value, onChange, ...inputProps}: AutocompleteCityProps, ref: any) => {
    const {m} = useI18n()
    const api = useFetcher(useApiSdk().apiAddressSdk.fetchCity)
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const computeCityOptions = (input: string) => {
      if (api.entity) {
        let cities = api.entity.map(c => ({
          city: c.city,
          postalCode: c.postcode,
        }))
        return cities.find(_ => _.postalCode == input.trim()) || !isValidPostalcode(input) ? cities : defaultCityOption(input)
      } else {
        return defaultCityOption(input)
      }
    }

    const fetch = useMemo(() => throttle(api.fetch, 250), [])
    useEffect(() => {
      fetch({force: true, clean: false}, inputValue)
    }, [inputValue, fetch])

    useEffectFn(value, _ => {
      setInputValue(`${_.postalCode} ${_.city}`)
    })

    return (
      <Autocomplete
        ref={ref}
        open={api.error || inputValue == '' ? false : open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onInputChange={(event, newInputValue) => {
          onChange({
            city: '',
            postalCode: newInputValue,
          })
          setInputValue(newInputValue)
        }}
        onChange={(event: any, newValue: AutocompleteCityValue | null) => {
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
        loading={api.loading}
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
                  {api.loading ? <CircularProgress size={20} /> : null}
                  {inputProps.InputProps?.endAdornment}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    )
  },
)
