import {Panel, PanelActions, PanelBody} from '../../../shared/Panel/Panel'
import {FormLayout} from '../../../shared/FormLayout/FormLayout'
import {ScInput} from '../../../shared/Input/ScInput'
import {ScButton} from '../../../shared/Button/Button'
import React from 'react'
import {useI18n} from '../../../core/i18n'
import {useForm} from 'react-hook-form'

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
    handleSubmit
  } = useForm<Form>()

  return (
    <Panel title={m.couldYouPrecise}>
      <form onSubmit={handleSubmit(_ => onChange(_.consumerPostalCode))}>
        <PanelBody>
          <FormLayout required label={m.yourPostalCode} desc={m.yourPostalCodeDesc}>
            <ScInput
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
          <ScButton color="primary" variant="contained" icon="search" type="submit">
            {m.search}
          </ScButton>
        </PanelActions>
      </form>
    </Panel>
  )
}
