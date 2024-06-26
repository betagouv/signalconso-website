import {Animate} from '@/components_simple/Animate'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useI18n} from '@/i18n/I18n'
import {Address} from '@/model/Address'
import {Controller, useForm} from 'react-hook-form'
import {ScAlert} from '../../../components_simple/ScAlert'

interface Form {
  street: string
  postalCode: string
}

interface Props {
  onChange: (_: Pick<Address, 'street' | 'postalCode'>) => void
}

export const CompanyAskConsumerStreet = ({onChange}: Props) => {
  const {m} = useI18n()
  const {
    formState: {errors},
    control,
    register,
    handleSubmit,
  } = useForm<Form>()

  return (
    <Animate>
      <div id="CompanyAskConsumerStreet">
        <ScAlert type="info">
          <p className="mb-0 text-sm" dangerouslySetInnerHTML={{__html: m.cantIdentifyLocationCompany}} />
        </ScAlert>
        <RequiredFieldsLegend />
        <form
          onSubmit={handleSubmit(form =>
            onChange({
              street: form.street,
              postalCode: form.postalCode,
            }),
          )}
        >
          <div>
            <ScTextInput
              label={m.yourStreet}
              desc={m.yourStreetDesc}
              {...register('street', {
                required: {value: true, message: m.required},
              })}
              required
              error={!!errors.street}
              helperText={(errors.street as any)?.message ?? ''}
              placeholder={m.yourStreetPlaceholder}
            />
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
