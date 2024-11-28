import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from '@/analytic/analytic'
import {useToastOnQueryError} from '@/clients/apiHooks'
import {Animate} from '@/components_simple/Animate'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScAutocompletePostcode} from '@/components_simple/formInputs/ScAutocompletePostcode'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {useQuery} from '@tanstack/react-query'
import {ReactNode, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {CompanySearchResult} from '../../../model/Company'
import {ifDefined} from '../../../utils/utils'

interface Form {
  name: string
  postalCode: string
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

export const CompanySearchByNameAndPostalCode = ({children}: Props) => {
  const {m, currentLang} = useI18n()
  const {companyApiClient} = useApiClients()
  const [submittedForm, setSubmittedForm] = useState<Form | undefined>()
  const _search = useQuery({
    queryKey: ['searchCompaniesByNameAndPostalCode', submittedForm?.name, submittedForm?.postalCode],
    queryFn: async () => {
      if (submittedForm) {
        const {name, postalCode} = submittedForm
        const res = await companyApiClient.searchCompaniesByNameAndPostalCode(name, postalCode, currentLang)
        _analytic.trackSearch({q: name, postalCode}, 'companysearch_nameandpostalcode', res.length)
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
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.search, form.name + ' ' + form.postalCode)
    setSubmittedForm(form)
  }
  return (
    <>
      <Animate>
        <div id="CompanyByNameAndPostalCode">
          <h2 className="text-lg">{m.couldYouPrecise}</h2>
          <p className="text-sm mb-0">{m.youCanOnlyReportFrenchCompanies}</p>
          <RequiredFieldsLegend />
          <form onSubmit={handleSubmit(search)}>
            <div className="mb-4">
              <ScTextInput
                label={m.reportedCompanyName}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name', {
                  required: {value: true, message: m.required},
                })}
                required
              />
              <Controller
                control={control}
                name="postalCode"
                rules={{
                  required: {value: true, message: m.required},
                }}
                render={({field: {onChange, onBlur, name, value}, fieldState: {error}}) => (
                  <ScAutocompletePostcode
                    label={m.postalCode}
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
      {_search.data && ifDefined(_search.data, children)}
    </>
  )
}
