import {Autocomplete, Box} from '@mui/material'
import {useGetCountries} from 'clients/apiHooks'
import {Animate} from 'components_simple/Animate/Animate'
import {BtnNextSubmit} from 'components_simple/Buttons'
import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {useI18n} from 'i18n/I18n'
import {Controller, useForm} from 'react-hook-form'
import {Alert} from '../../../alexlibs/mui-extension/Alert/Alert'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {Country} from '../../../model/Country'
import {fnSwitch} from '../../../utils/FnSwitch'

interface Form {
  name: string
  country: Country
  postalCode: string
}

interface Props {
  onSubmit: (form: Form) => void
  companyKind: CompanyKinds
}

const countryToFlag = (isoCode: string) => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode
}

export const CompanyAskForeignDetails = ({onSubmit, companyKind}: Props) => {
  const {m} = useI18n()
  const _countries = useGetCountries()
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>()

  return (
    <Animate>
      <Panel title={m.couldYouPrecise} id="CompanyAskForeignDetails">
        <form onSubmit={handleSubmit(onSubmit)}>
          <PanelBody>
            <FormLayout required label={m.reportedCompanyName}>
              <ScInput
                error={!!errors.name}
                helperText={errors.name?.message ?? ''}
                placeholder={m.reportedCompanyNamePlaceholder}
                fullWidth
                {...register('name', {
                  required: {value: true, message: m.required},
                })}
              />
            </FormLayout>
            <FormLayout required label={m.country}>
              <Controller
                name="country"
                control={control}
                rules={{
                  required: {value: true, message: m.required},
                }}
                render={({field}) => (
                  <Autocomplete<Country>
                    {...field}
                    onChange={(e, data) => field.onChange(data)}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Box component="span" sx={{mr: 2, fontSize: 24}}>
                          {countryToFlag(option.code)}
                        </Box>{' '}
                        {option.name}
                      </li>
                    )}
                    loading={_countries.isLoading}
                    options={_countries.data ?? []}
                    getOptionLabel={_ => _.name}
                    renderInput={params => (
                      <ScInput
                        {...params}
                        error={!!errors.country}
                        helperText={(errors.country as any)?.message ?? ''}
                        placeholder={m.countryPlaceholder}
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </FormLayout>
            <br />
            <Alert dense type="info" sx={{mb: 2}} deletable>
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
            </Alert>
            <FormLayout required label={m.yourPostalCode}>
              <ScInput
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message ?? ''}
                placeholder={m.yourPostalCodePlaceholder}
                fullWidth
                {...register('postalCode', {
                  required: {value: true, message: m.required},
                })}
              />
            </FormLayout>
          </PanelBody>

          <PanelActions>
            <BtnNextSubmit />
          </PanelActions>
        </form>
      </Panel>
    </Animate>
  )
}
