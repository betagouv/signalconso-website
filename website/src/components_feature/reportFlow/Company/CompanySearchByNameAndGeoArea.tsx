import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from '@/analytic/analytic'
import {useToastOnQueryError} from '@/clients/apiHooks'
import {Animate} from '@/components_simple/Animate'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScAutocompleteGeoArea} from '@/components_simple/formInputs/ScAutocompleteGeoArea'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {GeoArea, geoAreaToString} from '@/model/GeoArea'
import {useQuery} from '@tanstack/react-query'
import {ReactNode, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {CompanySearchResult} from '../../../model/Company'

interface Form {
  name: string
  geoArea: GeoArea
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

export const CompanySearchByNameAndGeoArea = ({children}: Props) => {
  const {m, currentLang} = useI18n()
  const {companyApiClient} = useApiClients()
  const [submittedForm, setSubmittedForm] = useState<Form | undefined>()
  const _search = useQuery({
    queryKey: ['searchCompaniesByNameAndGeoArea', submittedForm?.name, geoAreaToString(submittedForm?.geoArea)],
    queryFn: async () => {
      if (submittedForm) {
        const {name, geoArea} = submittedForm
        const res = await companyApiClient.searchCompaniesByNameAndGeoArea(name, geoArea, currentLang)
        _analytic.trackSearch({q: name, geoArea}, 'companysearch_nameandgeoarea', res.length)
        return res
      }
      return null
    },
  })
  useToastOnQueryError(_search)
  const _analytic = useAnalyticContext()
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>()

  const search = (form: Form) => {
    _analytic.trackEvent(
      EventCategories.companySearch,
      CompanySearchEventActions.search,
      form.name + ' ' + geoAreaToString(form.geoArea),
    )
    setSubmittedForm(form)
  }
  return (
    <div className="space-y-6">
      <Animate>
        <div id="CompanyByNameAndGeoArea">
          <form onSubmit={handleSubmit(search)}>
            <div className="mb-4">
              <ScTextInput
                label={m.reportedCompanyName}
                desc={m.youCanOnlyReportFrenchCompanies}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name', {
                  required: {value: true, message: m.required},
                })}
                required
              />
              <Controller
                control={control}
                name="geoArea"
                rules={{
                  required: {value: true, message: m.required},
                }}
                render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
                  <ScAutocompleteGeoArea
                    label={m.postalCodeOrDpt}
                    {...{onChange, onBlur, name, value}}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </div>

            <div className="flex justify-end">
              <ButtonWithLoader loading={_search.isPending} iconId="fr-icon-search-line">
                {m.search}
              </ButtonWithLoader>
            </div>
          </form>
        </div>
      </Animate>
      {_search.data && children(_search.data)}
    </div>
  )
}
