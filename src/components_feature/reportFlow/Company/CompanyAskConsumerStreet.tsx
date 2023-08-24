import {Animate} from 'components_simple/Animate'
import {AutocompleteCity, AutocompleteCityValue} from 'components_simple/AutocompleteCity'
import {BtnNextSubmit} from 'components_simple/Buttons'
import {FormLayout} from 'components_simple/FormLayout'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {useI18n} from 'i18n/I18n'
import {Address} from 'model/Address'
import {Controller, useForm} from 'react-hook-form'
import {AlexAlert} from '../../../alexlibs/AlexAlert'
import {Txt} from '../../../alexlibs/Txt'

interface Form {
  street: string
  place: AutocompleteCityValue
}

interface Props {
  onChange: (_: Pick<Address, 'street' | 'city' | 'postalCode'>) => void
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
      <Panel id="CompanyAskConsumerStreet">
        <AlexAlert dense type="info" deletable>
          <Txt size="small" dangerouslySetInnerHTML={{__html: m.cantIdentifyLocationCompany}} />
        </AlexAlert>
        <form
          onSubmit={handleSubmit(form =>
            onChange({
              street: form.street,
              city: form.place.city,
              postalCode: form.place.postalCode,
            }),
          )}
        >
          <PanelBody>
            <FormLayout required label={m.yourStreet} desc={m.yourStreetDesc}>
              <ScInput
                {...register('street', {
                  required: {value: true, message: m.required},
                })}
                error={!!errors.street}
                helperText={(errors.street as any)?.message ?? ''}
                fullWidth
                placeholder={m.yourStreetPlaceholder}
              />
            </FormLayout>
            <FormLayout required label={m.yourPostalCode} desc={m.youCanSearchByCity}>
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
                    fullWidth
                    placeholder={m.yourPostalCodePlaceholder}
                  />
                )}
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
