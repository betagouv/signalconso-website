import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {GeoArea, ScAutocompleteGeoArea} from '@/components_simple/formInputs/ScAutocompleteGeoArea'
import {ScCheckbox} from '@/components_simple/formInputs/ScCheckbox'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {useI18n} from '@/i18n/I18n'
import {forwardRef, Ref} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {SiretHelpButton} from '../lib/SiretHelpButton'

type RawForm = {
  input: string
  restrictToGeoArea: boolean
  geoArea?: GeoArea
}
export type CompanySearchInputs = {input: string; geoArea?: GeoArea}

// it's not functional yet on the backend
const enableSearchByDepartment = false

type Props = {
  onSubmit: (_: CompanySearchInputs) => void
  buttonIsLoading: boolean
}

export const NewCompanySearchForm = forwardRef((props: Props, ref: Ref<HTMLFormElement>) => {
  const {onSubmit, buttonIsLoading} = props
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: {errors},
  } = useForm<RawForm>({})
  const {m} = useI18n()
  const restrictToGeoArea = watch('restrictToGeoArea')
  return (
    <form onSubmit={handleSubmit(form => onSubmit(transformRawForm(form)))} {...{ref}}>
      <RequiredFieldsLegend />
      <ScTextInput
        {...register('input', {
          required: {value: true, message: m.required},
        })}
        error={!!errors.input}
        helperText={errors.input?.message}
        required
        desc={m.frenchCompaniesOnly}
        label={
          <span>
            {m.identifyBy_nameOrIdentity} <SiretHelpButton />
          </span>
        }
        placeholder={m.identifyBy_nameOrIdentity_ex}
      />
      <div className={`${restrictToGeoArea ? 'p-4 pb-1 mb-4 bg-sclightpurple rounded-lg' : ''}`}>
        <ScCheckbox
          {...register('restrictToGeoArea')}
          label={enableSearchByDepartment ? m.restrictToPostalCodeOrDpt : m.restrictToPostalCode}
          required
        />
        {restrictToGeoArea && (
          <div className="max-w-lg">
            <Controller
              control={control}
              name="geoArea"
              render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
                <ScAutocompleteGeoArea
                  label={enableSearchByDepartment ? 'Département ou code postal' : m.postalCode}
                  noDepartements={!enableSearchByDepartment}
                  {...{onChange, onBlur, name, value}}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>
        )}
      </div>
      <div className="flex justify-end mb-8">
        <ButtonWithLoader size="large" iconId={'fr-icon-search-line'} loading={buttonIsLoading}>
          {m.startSearch}
        </ButtonWithLoader>
      </div>
    </form>
  )
})

function transformRawForm(form: RawForm): CompanySearchInputs {
  const {input, geoArea, restrictToGeoArea} = form
  return restrictToGeoArea
    ? {
        input,
        geoArea,
      }
    : {input}
}
