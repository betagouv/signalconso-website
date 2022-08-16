import {useI18n} from 'core/i18n'
import {Controller, useForm} from 'react-hook-form'
import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {ScInput} from 'shared/Input/ScInput'
import {FormLayout} from 'shared/FormLayout/FormLayout'
import React from 'react'
import {Animate} from 'shared/Animate/Animate'
import {Alert, Txt} from '../../../alexlibs/mui-extension'
import {StepperActionsNext} from 'shared/Stepper/StepperActionsNext'
import {AutocompleteCity, AutocompleteCityValue} from 'shared/AutocompleteCity/AutocompleteCity'
import {Address} from '../../../model'

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
        <Alert dense type="info" sx={{mb: 2}} deletable>
          <Txt size="small" dangerouslySetInnerHTML={{__html: m.cantIdentifyCompany}} />
        </Alert>
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
                    value={undefined}
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
            <StepperActionsNext type="submit" />
          </PanelActions>
        </form>
      </Panel>
    </Animate>
  )
}
