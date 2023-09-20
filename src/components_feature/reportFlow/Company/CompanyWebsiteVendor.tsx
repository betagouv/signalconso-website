import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {Animate} from 'components_simple/Animate'
import {useI18n} from 'i18n/I18n'
import {ScAlert} from '../../../components_simple/ScAlert'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {FieldLabel} from 'components_simple/FieldLabel'
import {useForm} from 'react-hook-form'
import {ScButton} from 'components_simple/ScButton'
import {ScTextInput} from 'components_simple/formInputs/ScTextInput'

interface Form {
  websiteVendor: string
}

interface Props {
  onSubmit: (_: string) => void
}

export const CompanyWebsiteVendor = ({onSubmit}: Props) => {
  const {m} = useI18n()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>()
  return (
    <Animate>
      <Panel title={m.companyWebsiteVendorTitle}>
        <form onSubmit={handleSubmit(form => onSubmit(form.websiteVendor))}>
          <PanelBody>
            <ScAlert type="info">
              <p>{m.companyWebsiteVendorAlert}</p>
            </ScAlert>
            <ScTextInput
              label={m.companyWebsiteVendorLabel}
              error={!!errors.websiteVendor}
              helperText={errors.websiteVendor?.message ?? ''}
              {...register('websiteVendor', {
                required: {value: true, message: m.required},
              })}
              required
            />
          </PanelBody>
          <PanelActions>
            <ScButton color="primary" variant="contained" type="submit">
              {m.continue}
            </ScButton>
          </PanelActions>
        </form>
      </Panel>
    </Animate>
  )
}
