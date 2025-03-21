import {Animate} from '@/components_simple/Animate'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScAutocompleteCountry} from '@/components_simple/formInputs/ScAutocompleteCountry'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {pagesDefs} from '@/core/pagesDefinitions'
import {useI18n} from '@/i18n/I18n'
import Link from 'next/link'
import {Controller, useForm} from 'react-hook-form'
import {ScAlert} from '../../../components_simple/ScAlert'
import {Country} from '../../../model/Country'

interface Form {
  name: string
  country: Country
  postalCode: string
}

interface Props {
  onSubmit: (form: Form) => void
  reportTransmittableToPro: boolean
}

export const countryToFlag = (isoCode: string) => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode
}

export const CompanyAskForeignDetails = ({onSubmit, reportTransmittableToPro}: Props) => {
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
        <div className="mb-4">
          <ScAlert type="warning">
            <p
              className="mb-0"
              dangerouslySetInnerHTML={{__html: reportTransmittableToPro ? m.reportAbroad1 : m.reportAbroad1NonTransmittable}}
            />
            <p className="">
              <Link target="_blank" href={pagesDefs.autresSitesInternationaux.url}>
                {m.reportAbroad2}
              </Link>
            </p>
          </ScAlert>
        </div>
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
