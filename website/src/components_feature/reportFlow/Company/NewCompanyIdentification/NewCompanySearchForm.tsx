import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {GeoArea, ScAutocompleteGeoArea} from '@/components_simple/formInputs/ScAutocompleteGeoArea'
import {ScCheckbox} from '@/components_simple/formInputs/ScCheckbox'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {useI18n} from '@/i18n/I18n'
import {Controller, useForm} from 'react-hook-form'

type RawForm = {
  input: string
  restrictToGeoArea: boolean
  geoArea?: GeoArea
}
export type CompanySearchInputs = {input: string; geoArea?: GeoArea}

export function NewCompanySearchForm({
  onSubmit,
  buttonIsLoading,
}: {
  onSubmit: (_: CompanySearchInputs) => void
  buttonIsLoading: boolean
}) {
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
    <form onSubmit={handleSubmit(form => onSubmit(transformRawForm(form)))}>
      <RequiredFieldsLegend />
      <ScTextInput
        {...register('input', {
          required: {value: true, message: m.required},
        })}
        error={!!errors.input}
        helperText={errors.input?.message}
        required
        desc="Entreprises françaises uniquement"
        label="Nom ou identifiant de l'entreprise"
        placeholder="Nom, n° SIRET/SIREN, n° RCS..."
      />
      <div className={`${restrictToGeoArea ? 'p-4 pb-1 mb-4 bg-sclightpurple rounded-lg' : ''}`}>
        <ScCheckbox
          {...register('restrictToGeoArea')}
          label="Restreindre la recherche à un département ou code postal"
          required
        />
        {restrictToGeoArea && (
          <div className="max-w-lg">
            <Controller
              control={control}
              name="geoArea"
              render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
                <ScAutocompleteGeoArea
                  label="Département ou code postal"
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
          Je lance la recherche
        </ButtonWithLoader>
      </div>
    </form>
  )
}

function transformRawForm(form: RawForm): CompanySearchInputs {
  const {input, geoArea, restrictToGeoArea} = form
  return restrictToGeoArea
    ? {
        input,
        geoArea,
      }
    : {input}
}
