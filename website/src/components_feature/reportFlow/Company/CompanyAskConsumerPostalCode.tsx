import {Animate} from '@/components_simple/Animate'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScAlert} from '@/components_simple/ScAlert'
import {useI18n} from '@/i18n/I18n'
import {Controller, useForm} from 'react-hook-form'
import {CompanyKind} from 'shared/anomalies/Anomaly'

interface Form {
  postalCode: string
}

interface Props {
  value?: string
  onChange: (_: string) => void
  companyKind: CompanyKind
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
        <div className="mb-2">
          <ScAlert type="info">
            <p className="mb-0" dangerouslySetInnerHTML={{__html: m.cantIdentifyWarn1}} />
            <p className="mb-0" dangerouslySetInnerHTML={{__html: m.cantIdentifyWarn2}} />
          </ScAlert>
        </div>
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
          <p className="mb-2">{m.cantIdentifyCompany}</p>

          <div className="flex justify-end">
            <BtnNextSubmit />
          </div>
        </form>
      </div>
    </Animate>
  )
}
