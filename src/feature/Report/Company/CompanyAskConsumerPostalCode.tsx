import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {FormLayout} from 'shared/FormLayout/FormLayout'
import React from 'react'
import {useI18n} from 'core/i18n'
import {Controller, useForm} from 'react-hook-form'
import {Animate} from 'shared/Animate/Animate'
import {StepperActionsNext} from '../../../shared/Stepper/StepperActionsNext'
import {Alert, Txt} from 'mui-extension'
import {AutocompleteCity, AutocompleteCityValue} from '../../../shared/AutocompleteCity/AutocompleteCity'
import {Address} from '@signal-conso/signalconso-api-sdk-js'

interface Form {
  place: AutocompleteCityValue
}

interface Props {
  value?: Pick<Address, 'city' | 'postalCode'>
  onChange: (_: Pick<Address, 'city' | 'postalCode'>) => void
}

export const CompanyAskConsumerPostalCode = ({value, onChange}: Props) => {
  const {m} = useI18n()
  const {
    handleSubmit,
    control,
    formState: {errors}
  } = useForm<Form>()

  return (
    <Animate>
      <Panel id="CompanyAskConsumerPostalCode">
        <Alert dense type="info" sx={{mb: 2}} deletable persistentDelete>
          <Txt size="small" dangerouslySetInnerHTML={{__html: m.cantIdentifyCompany}}/>
        </Alert>
        <form onSubmit={handleSubmit(_ => onChange(_.place))}>
          <PanelBody>
            <FormLayout required label={m.yourCity}>
              <Controller
                control={control}
                name="place"
                rules={{
                  required: {value: true, message: m.required}
                }}
                render={({field}) =>
                  <AutocompleteCity
                    {...field}
                    error={!!errors.place}
                    helperText={(errors.place as any)?.message ?? ''}
                    defaultValue={value}
                    fullWidth
                    placeholder={m.yourCityPlaceholder}
                  />
                }
              />
              {/*<ScInput*/}
              {/*  error={!!errors.place}*/}
              {/*  helperText={errors.place?.message ?? ''}*/}
              {/*  defaultValue={value}*/}
              {/*  {...register('place', {*/}
              {/*    required: {value: true, message: m.required}*/}
              {/*  })}*/}
              {/*  fullWidth*/}
              {/*  placeholder={m.yourPostalCodePlaceholder}*/}
              {/*/>*/}
            </FormLayout>
          </PanelBody>

          <PanelActions>
            <StepperActionsNext type="submit"/>
          </PanelActions>
        </form>
      </Panel>
    </Animate>
  )
}
