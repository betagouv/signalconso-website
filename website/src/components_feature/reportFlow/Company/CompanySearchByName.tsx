import {CompanySearchResult} from '@/model/Company'
import {ReactNode, useState} from 'react'
import {useI18n} from '@/i18n/I18n'
import {useApiClients} from '@/context/ApiClientsContext'
import {useQuery} from '@tanstack/react-query'
import {useToastOnQueryError} from '@/clients/apiHooks'
import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {useForm} from 'react-hook-form'
import {CompanySearchEventActions, EventCategories} from '@/analytic/analytic'
import {Animate} from '@/components_simple/Animate'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ifDefined} from '@/utils/utils'

interface Form {
  name: string
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

export const CompanySearchByName = ({children}: Props) => {
  const {m, currentLang} = useI18n()
  const {companyApiClient} = useApiClients()
  const [submittedForm, setSubmittedForm] = useState<Form | undefined>()
  const _search = useQuery({
    queryKey: ['searchHeadOfficesByName', submittedForm?.name],
    queryFn: () => {
      if (submittedForm) {
        return companyApiClient.searchHeadOfficesByName(submittedForm.name, currentLang)
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
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.search, form.name)
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
