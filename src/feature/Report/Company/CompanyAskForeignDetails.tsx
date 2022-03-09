import {useI18n} from '../../../core/i18n'
import {FormLayout} from '../../../shared/FormLayout/FormLayout'
import {useForm} from 'react-hook-form'
import {ScInput} from '../../../shared/Input/ScInput'
import {Panel, PanelActions, PanelBody} from '../../../shared/Panel/Panel'
import {Animate} from '../../../shared/Animate/Animate'
import {Autocomplete, Box} from '@mui/material'
import {useConstantContext} from '../../../core/context/ConstantContext'
import {useEffect} from 'react'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {useToast} from '../../../core/toast'
import {StepperActionsNext} from '../../../shared/Stepper/StepperActionsNext'

interface Form {
  name: string
  country: string
  postalCode: string
}

interface Props {
  onChange: (form?: Form) => void
}

const countryToFlag = (isoCode: string) => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode
}

export const CompanyAskForeignDetails = ({onChange}: Props) => {
  const {m} = useI18n()
  const {countries} = useConstantContext()
  const {toastError} = useToast()
  const {
    control,
    handleSubmit,
    register,
  } = useForm<Form>()

  useEffect(() => {
    countries.fetch({force: false, clean: false})
  }, [])
  useEffectFn(countries.error, toastError)

  return (
    <Animate>
      <Panel title={m.couldYouPrecise} id="CompanyAskForeignDetails">
        <form onSubmit={handleSubmit(onChange)}>
          <PanelBody>
            <FormLayout required label={m.reportedCompanyName}>
              <ScInput placeholder={m.reportedCompanyNamePlaceholder} fullWidth {...register('name', {
                required: {value: true, message: m.required},
              })}/>
            </FormLayout>
            <FormLayout required label={m.country}>
              <Autocomplete
                {...register('country', {
                  required: {value: true, message: m.required},
                })}
                renderOption={(props, option) => <li {...props}><Box component="span" sx={{mr: 2, fontSize: 24}}>{countryToFlag(option.code)}</Box> {option.name}</li>}
                loading={countries.loading}
                options={countries.entity ?? []}
                getOptionLabel={_ => _.name}
                // options={countries.entity?.map(_ => _.name) ?? []}
                renderInput={(params) => <ScInput {...params} placeholder={m.countryPlaceholder} fullWidth/>}
              />
            </FormLayout>
            <FormLayout required label={m.yourPostalCode} desc={m.yourPostalCodeDesc}>
              <ScInput placeholder={m.yourPostalCodePlaceholder} fullWidth {...register('postalCode', {
                required: {value: true, message: m.required},
              })}/>
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
