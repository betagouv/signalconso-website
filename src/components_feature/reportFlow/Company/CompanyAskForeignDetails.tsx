import {Animate} from 'components_simple/Animate'
import {BtnNextSubmit} from 'components_simple/buttons/Buttons'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {RequiredFieldsLegend} from 'components_simple/RequiredFieldsLegend'
import {ScAutocompleteCountry} from 'components_simple/formInputs/ScAutocompleteCountry'
import {ScTextInput} from 'components_simple/formInputs/ScTextInput'
import {useI18n} from 'i18n/I18n'
import {Controller, useForm} from 'react-hook-form'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {ScAlert} from '../../../components_simple/ScAlert'
import {Txt} from '../../../components_simple/Txt'
import {Country} from '../../../model/Country'
import {fnSwitch} from '../../../utils/FnSwitch'
import {ScAutocompletePostcode} from 'components_simple/formInputs/ScAutocompletePostcode'

interface Form {
  name: string
  country: Country
  postalCode: string
}

interface Props {
  onSubmit: (form: Form) => void
  companyKind: CompanyKinds
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
      <Panel title={m.couldYouPrecise} id="CompanyAskForeignDetails">
        <RequiredFieldsLegend />
        <form onSubmit={handleSubmit(onSubmit)}>
          <PanelBody>
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
            <br />
            <ScAlert dense type="info">
              <Txt
                size="small"
                component="p"
                dangerouslySetInnerHTML={{
                  __html: fnSwitch<CompanyKinds, string>(companyKind, {
                    SIRET: m.cantIdentifyCompany,
                    WEBSITE: m.cantIdentifyWebsiteCompany,
                    TRANSPORTER_WEBSITE: m.cantIdentifyTransporterWebsiteCompany,
                    MERCHANT_WEBSITE: m.cantIdentifyMerchantWebsiteCompany,
                    PHONE: m.cantIdentifyPhoneCompany,
                    LOCATION: m.cantIdentifyLocationCompany,
                    SOCIAL: m.cantIdentifyCompany,
                    PRODUCT: m.cantIdentifyCompany,
                  }),
                }}
              />
            </ScAlert>
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
          </PanelBody>

          <PanelActions>
            <BtnNextSubmit />
          </PanelActions>
        </form>
      </Panel>
    </Animate>
  )
}
