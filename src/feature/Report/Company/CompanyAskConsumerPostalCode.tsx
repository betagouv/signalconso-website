import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {FormLayout} from 'shared/FormLayout/FormLayout'
import {ScInput} from 'shared/Input/ScInput'
import {ScButton} from 'shared/Button/Button'
import React from 'react'
import {useI18n} from 'core/i18n'
import {useForm} from 'react-hook-form'
import {Animate} from 'shared/Animate/Animate'
import {StepperActionsNext} from '../../../shared/Stepper/StepperActionsNext'
import {Alert, Txt} from "mui-extension";

interface Form {
  consumerPostalCode: string
}

interface Props {
  value?: string
  onChange: (consumerPostalCode?: string) => void
}

export const CompanyAskConsumerPostalCode = ({value, onChange}: Props) => {
  const {m} = useI18n()
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<Form>()

  return (
    <Animate>
      <Panel id="CompanyAskConsumerPostalCode">
        <Alert dense type="info" sx={{mb: 2}} deletable persistentDelete>
          <Txt size="small" dangerouslySetInnerHTML={{__html: m.cantIdentifyCompany}}/>
        </Alert>
        <form onSubmit={handleSubmit(_ => onChange(_.consumerPostalCode))}>
          <PanelBody>
            <FormLayout required label={m.yourPostalCode}>
              <ScInput
                error={!!errors.consumerPostalCode}
                helperText={errors.consumerPostalCode?.message ?? ''}
                defaultValue={value}
                {...register('consumerPostalCode', {
                  required: {value: true, message: m.required}
                })}
                fullWidth
                placeholder={m.yourPostalCodePlaceholder}
              />
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
