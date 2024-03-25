import {Animate} from '@/components_simple/Animate'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {useI18n} from '@/i18n/I18n'
import {Controller, useForm} from 'react-hook-form'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {ScAlert} from '../../../components_simple/ScAlert'
import {fnSwitch} from '../../../utils/FnSwitch'

interface Form {
  postalCode: string
}

interface Props {
  value?: string
  onChange: (_: string) => void
  companyKind: CompanyKinds
}

export const CompanyAskConsumerPostalCode = ({value, onChange, companyKind}: Props) => {
  const {m} = useI18n()
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Form>()

  return (
    <Animate>
      <div id="CompanyAskConsumerPostalCode">
        <hr />
        <ScAlert type="info">
          <p
            className="mb-0"
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
                PRODUCT_OPENFF: m.cantIdentifyCompany,
                TRAIN: m.cantIdentifyCompany,
                STATION: m.cantIdentifyCompany,
              }),
            }}
          />
        </ScAlert>
        <RequiredFieldsLegend />
        <form onSubmit={handleSubmit(_ => onChange(_.postalCode))}>
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

          <div className="flex justify-end">
            <BtnNextSubmit />
          </div>
        </form>
      </div>
    </Animate>
  )
}
