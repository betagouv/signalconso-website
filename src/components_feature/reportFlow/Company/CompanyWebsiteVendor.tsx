import {Animate} from '@/components_simple/Animate'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useI18n} from '@/i18n/I18n'
import Button from '@codegouvfr/react-dsfr/Button'
import {useForm} from 'react-hook-form'
import {ScAlert} from '../../../components_simple/ScAlert'

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
      <div>
        <h2 className="text-lg">{m.companyWebsiteVendorTitle}</h2>
        <form onSubmit={handleSubmit(form => onSubmit(form.websiteVendor))}>
          <div className="mb-4">
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
          </div>
          <div className="flex justify-end">
            <Button type="submit">{m.continue}</Button>
          </div>
        </form>
      </div>
    </Animate>
  )
}
