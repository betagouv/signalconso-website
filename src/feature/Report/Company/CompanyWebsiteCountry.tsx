import {ScRadioGroup, ScRadioGroupItem} from 'shared/RadioGroup'
import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {useI18n} from 'core/i18n'
import {StepperActionsNext} from 'shared/Stepper/StepperActionsNext'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Country} from '../../../client/constant/Country'

interface Props {
  countries: Country[]
  onSubmit: (country: string) => void
}

interface Form {
  country: string
}

export const CompanyWebsiteCountry = ({countries, onSubmit}: Props) => {
  const {m} = useI18n()
  const {handleSubmit, register, control} = useForm<Form>()
  return (
    <Panel title={m.companySelectCountryTitle}>
      <form onSubmit={handleSubmit(f => onSubmit(f.country))}>
        <PanelBody>
          <Controller
            control={control}
            name="country"
            defaultValue={countries.length === 1 ? countries[0].name : undefined}
            rules={{
              required: {value: true, message: m.required + ' *'},
            }}
            render={({field}) => (
              <ScRadioGroup {...field}>
                {countries.map(_ => (
                  <ScRadioGroupItem key={_.code} value={_.name} title={_.name} />
                ))}
              </ScRadioGroup>
            )}
          />
        </PanelBody>
        <PanelActions>
          <StepperActionsNext type="submit" />
        </PanelActions>
      </form>
    </Panel>
  )
}
