import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import React from 'react'
import {useI18n} from 'i18n'
import {Controller, useForm} from 'react-hook-form'
import {Animate} from 'components_simple/Animate/Animate'
import {StepperActionsNext} from 'components_simple/ReportFlowStepper/StepperActionsNext'
import {Alert, Txt} from '../../../alexlibs/mui-extension'
import {AutocompleteCityValue} from 'components_simple/AutocompleteCity/AutocompleteCity'
import {AutocompleteCity} from 'components_simple/AutocompleteCity/AutocompleteCity'
import {Address} from 'model/Address'

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
    formState: {errors},
  } = useForm<Form>()

  return (
    <Animate>
      <Panel id="CompanyAskConsumerPostalCode">
        <Alert dense type="info" sx={{mb: 2}} deletable>
          <Txt size="small" dangerouslySetInnerHTML={{__html: m.cantIdentifyCompany}} />
        </Alert>
        <form onSubmit={handleSubmit(_ => onChange(_.place))}>
          <PanelBody>
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
                    defaultValue={value}
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
