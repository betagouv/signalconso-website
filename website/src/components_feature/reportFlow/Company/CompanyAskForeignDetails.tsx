import {Animate} from '@/components_simple/Animate'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScAutocompleteCountry} from '@/components_simple/formInputs/ScAutocompleteCountry'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useI18n} from '@/i18n/I18n'
import {Controller, useForm} from 'react-hook-form'
import {CompanyKind} from 'shared/anomalies/Anomaly'
import {ScAlert} from '../../../components_simple/ScAlert'
import {Country} from '../../../model/Country'

interface Form {
  name: string
  country: Country
  postalCode: string
}

interface Props {
  onSubmit: (form: Form) => void
  companyKind: CompanyKind
}

export const countryToFlag = (isoCode: string) => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode
}

export const CompanyAskForeignDetails = ({onSubmit, companyKind}: Props) => {
  const {m} = useI18n()
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>()

  return (
    <Animate>
      <div id="CompanyAskForeignDetails">
        <div className="mb-8">
          <ScAlert type="info">
            <p className="mb-4" dangerouslySetInnerHTML={{__html: m.reportAbroad1}} />
            <p className="mb-4" dangerouslySetInnerHTML={{__html: m.reportAbroad2}} />
            <p className="mb-0" dangerouslySetInnerHTML={{__html: m.reportAbroad3}} />
            <ul>
              <li dangerouslySetInnerHTML={{__html: m.reportAbroad4}}></li>
              <li dangerouslySetInnerHTML={{__html: m.reportAbroad5}}></li>
            </ul>
          </ScAlert>
        </div>
        <RequiredFieldsLegend />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <ScTextInput
              label={m.reportedCompanyName}
              {...register('name', {
                required: {value: true, message: m.required},
              })}
              required
              error={!!errors.name}
              helperText={errors.name?.message ?? ''}
              placeholder={m.reportedCompanyNamePlaceholder}
            />
            <Controller
              name="country"
              control={control}
              rules={{
                required: {value: true, message: m.required},
              }}
              render={({field: {onChange, onBlur, name, ref, value}, fieldState: {error}}) => {
                return <ScAutocompleteCountry {...{onChange, onBlur, name, value}} error={!!error} helperText={error?.message} />
              }}
            />
            <p className="mb-2 text-sm">{m.cantIdentifyCompany}</p>
            <Controller
              control={control}
              name="postalCode"
              rules={{
                required: {value: true, message: m.required},
              }}
              render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
                <ScAutocompletePostcode
                  label={m.yourPostalCode}
                  {...{onChange, onBlur, name, value}}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>

          <div className="flex justify-end">
            <BtnNextSubmit />
          </div>
        </form>
      </div>
    </Animate>
  )
}
