import {useI18n} from 'core/i18n'
import {useForm} from 'react-hook-form'
import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {ScInput} from 'shared/Input/ScInput'
import {FormLayout} from 'shared/FormLayout/FormLayout'
import React from 'react'
import {ScButton} from 'shared/Button/Button'
import {Animate} from 'shared/Animate/Animate'
import {Alert} from 'mui-extension'

interface Form {
  street: string
  postalCode: string
}

interface Props {
  onChange: (_: Form) => void
}

export const CompanyAskConsumerStreet = ({onChange}: Props) => {
  const {m} = useI18n()
  const {
    register,
    handleSubmit
  } = useForm<Form>()

  return (
    <Animate>
      <Panel title={m.couldYouPrecise} id="CompanyAskConsumerStreet">
        <Alert sx={{mt: 1}} dense type="info">{m.yourPostalCodeDesc}</Alert>
        <form onSubmit={handleSubmit(onChange)}>
          <PanelBody>
            <FormLayout required label={m.yourStreet} desc={m.yourStreetDesc}>
              <ScInput
                {...register('street', {
                  required: {value: true, message: m.required}
                })}
                fullWidth
                placeholder={m.yourStreetPlaceholder}
              />
            </FormLayout>
            <FormLayout required label={m.yourPostalCode}>
              <ScInput
                {...register('postalCode', {
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
    </Animate>
  )
}
