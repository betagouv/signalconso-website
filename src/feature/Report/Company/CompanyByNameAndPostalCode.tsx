import {useI18n} from '../../../core/i18n'
import {FormLayout} from '../../../shared/FormLayout/FormLayout'
import {useForm} from 'react-hook-form'
import {ScInput} from '../../../shared/Input/ScInput'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'

export const CompanyByNameAndPostalCode = () => {
  const {m} = useI18n()
  const {
    register,
  } = useForm()

  return (
    <Panel title={m.couldYouPrecise}>
      <PanelBody>
        <FormLayout required label={m.nameOfTheCompany}>
          <ScInput fullWidth {...register('name', {
            required: {value: true, message: m.required},
          })}/>
        </FormLayout>
        <FormLayout required label={m.postalCode}>
          <ScInput fullWidth {...register('postalCode', {
            required: {value: true, message: m.required},
          })}/>
        </FormLayout>
      </PanelBody>
    </Panel>
  )
}
