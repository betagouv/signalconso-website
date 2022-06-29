import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {Animate} from 'shared/Animate/Animate'
import {useI18n} from 'core/i18n'
import {Alert} from '../../../alexlibs/mui-extension'
import {ScInput} from 'shared/Input/ScInput'
import {FormLayout} from 'shared/FormLayout/FormLayout'
import {useForm} from 'react-hook-form'
import {ScButton} from 'shared/Button/Button'

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
            <Alert type="info" sx={{mb: 2}}>
              {m.companyWebsiteVendorAlert}
            </Alert>
            <FormLayout required label={m.companyWebsiteVendorLabel}>
              <ScInput
                fullWidth
                error={!!errors.websiteVendor}
                helperText={errors.websiteVendor?.message ?? ''}
                {...register('websiteVendor', {
                  required: {value: true, message: m.required},
                })}
              />
            </FormLayout>
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
