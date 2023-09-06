import {Animate} from 'components_simple/Animate'
import {AutocompleteCity, AutocompleteCityValue} from 'components_simple/AutocompleteCity'
import {BtnNextSubmit} from 'components_simple/Buttons'
import {FieldLayout} from 'components_simple/FieldLayout'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {useI18n} from 'i18n/I18n'
import {Address} from 'model/Address'
import {Controller, useForm} from 'react-hook-form'
import {ScAlert} from '../../../components_simple/ScAlert'
import {Txt} from '../../../components_simple/Txt'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {fnSwitch} from '../../../utils/FnSwitch'

interface Form {
  place: AutocompleteCityValue
}

interface Props {
  value?: Pick<Address, 'city' | 'postalCode'>
  onChange: (_: Pick<Address, 'city' | 'postalCode'>) => void
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
      <Panel id="CompanyAskConsumerPostalCode">
        <ScAlert dense type="info">
          <Txt
            size="small"
            dangerouslySetInnerHTML={{
              __html: fnSwitch<CompanyKinds, string>(companyKind, {
                SIRET: m.cantIdentifyCompany,
                WEBSITE: m.cantIdentifyWebsiteCompany,
                TRANSPORTER_WEBSITE: m.cantIdentifyTransporterWebsiteCompany,
                MERCHANT_WEBSITE: m.cantIdentifyMerchantWebsiteCompany,
                PHONE: m.cantIdentifyPhoneCompany,
                LOCATION: m.cantIdentifyLocationCompany,
                SOCIAL: m.cantIdentifyCompany,
              }),
            }}
          />
        </ScAlert>
        <form onSubmit={handleSubmit(_ => onChange(_.place))}>
          <PanelBody>
            <FieldLayout required label={m.yourPostalCode} desc={m.youCanSearchByCity}>
              <Controller
                control={control}
                name="place"
                rules={{
                  required: {value: true, message: m.required},
                }}
                render={({field}) => (
                  <AutocompleteCity
                    {...field}
                    error={!!errors.place}
                    helperText={(errors.place as any)?.message ?? ''}
                    defaultValue={value}
                    fullWidth
                    placeholder={m.yourPostalCodePlaceholder}
                  />
                )}
              />
            </FieldLayout>
          </PanelBody>

          <PanelActions>
            <BtnNextSubmit />
          </PanelActions>
        </form>
      </Panel>
    </Animate>
  )
}
