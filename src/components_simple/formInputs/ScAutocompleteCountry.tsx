import {useGetCountries} from 'clients/apiHooks'
import {countryToFlag} from 'components_feature/reportFlow/Company/CompanyAskForeignDetails'
import {useI18n} from 'i18n/I18n'
import {AppLangs} from 'i18n/localization/AppLangs'
import {Country} from 'model/Country'
import {useState} from 'react'
import {ScAutoComplete} from './ScAutocomplete'

export function ScAutocompleteCountry(props: {
  value: Country
  onChange: (country: Country) => void
  onBlur: () => void
  name: string
  error: boolean
  helperText?: string
}) {
  const _countries = useGetCountries()
  const [query, setQuery] = useState('')
  const {currentLang, m} = useI18n()

  function pickName(country: Country) {
    return currentLang === AppLangs.en ? country.englishName : country.name
  }
  if (_countries.data) {
    const filteredCountries =
      query === ''
        ? _countries.data
        : _countries.data.filter(country => {
            return pickName(country).toLowerCase().includes(query.toLowerCase())
          })

    return (
      <ScAutoComplete<Country>
        label={m.country}
        {...props}
        {...{query, setQuery}}
        optionsAreSame={(a, b) => a?.code === b?.code}
        optionKey={a => a.code}
        options={filteredCountries}
        inputDisplayValue={pickName}
        optionRender={option => (
          <>
            <span className="mx-2">{countryToFlag(option.code)}</span> {pickName(option)}
          </>
        )}
      />
    )
  }
  return <div className="sc-loader w-4 h-4" />
}
