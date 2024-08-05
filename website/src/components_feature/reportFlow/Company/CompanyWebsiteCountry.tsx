import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {useI18n} from '@/i18n/I18n'
import {Controller, useForm} from 'react-hook-form'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {Country, countryLabel} from '../../../model/Country'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'

interface Props {
  countries: Country[]
  onSubmit: (country: Country) => void
}

interface Form {
  country: Country
}

export const CompanyWebsiteCountry = ({countries, onSubmit}: Props) => {
  const {m, currentLang} = useI18n()
  const {handleSubmit, register, control} = useForm<Form>()
  return (
    <div>
      <form onSubmit={handleSubmit(f => onSubmit(f.country))}>
        <div>
          <Controller
            control={control}
            name="country"
            defaultValue={countries.length === 1 ? countries[0] : undefined}
            rules={{
              required: {value: true, message: m.required + ' *'},
            }}
            render={({field}) => (
              <ScRadioButtons
                required
                title={m.companySelectCountryTitle}
                {...field}
                options={countries.map(_ => {
                  return {
                    label: countryLabel(currentLang, _),
                    value: _,
                  }
                })}
              />
            )}
          />
        </div>
        <FriendlyHelpText>
          <p className="mb-0" dangerouslySetInnerHTML={{__html: m.CannotTransmitToForeignCompany}} />
        </FriendlyHelpText>
        <div className="flex justify-end">
          <BtnNextSubmit />
        </div>
      </form>
    </div>
  )
}
