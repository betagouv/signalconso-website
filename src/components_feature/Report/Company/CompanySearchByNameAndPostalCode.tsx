import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {Animate} from 'components_simple/Animate/Animate'
import {AutocompleteCity} from 'components_simple/AutocompleteCity/AutocompleteCity'
import {ButtonWithLoader} from 'components_simple/Buttons'
import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useToastError} from 'hooks/useToastError'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {useFetcher} from '../../../hooks/useFetcher'
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
  const {m} = useI18n()
  const {signalConsoApiClient, companyApiClient: companyApiClient} = useApiClients()
  const toastError = useToastError()
  const _search = useFetcher(companyApiClient.searchCompanies)
  const _analytic = useAnalyticContext()
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm<Form>()

  const search = (form: Form) => {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.search, form.name + ' ' + form.postalCode)
    _search.fetch({force: true, clean: true}, form.name, form.postalCode)
  }

  useEffect(() => {
    if (_search.error) toastError()
  }, [_search.error])
  return (
    <>
      <Animate>
        <Panel title={m.couldYouPrecise} id="CompanyByNameAndPostalCode">
          <Txt color="hint">{m.youCanOnlyReportFrenchCompanies} &nbsp;</Txt>
          <form onSubmit={handleSubmit(search)}>
            <PanelBody>
              <FormLayout required label={m.reportedCompanyName}>
                <ScInput
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register('name', {
                    required: {value: true, message: m.required},
                  })}
                />
              </FormLayout>
              <FormLayout required label={m.postalCode} desc={m.youCanSearchByCity}>
                <Controller
                  control={control}
                  name="postalCode"
                  rules={{
                    required: {value: true, message: m.required},
                  }}
                  render={({field}) => (
                    <AutocompleteCity
                      {...field}
                      value={undefined}
                      onChange={x => field.onChange(x.postalCode)}
                      error={!!errors.postalCode}
                      helperText={errors.postalCode?.message ?? ''}
                      fullWidth
                      placeholder={m.yourPostalCodePlaceholder}
                    />
                  )}
                />
              </FormLayout>
            </PanelBody>

            <PanelActions>
              <ButtonWithLoader loading={_search.loading} iconId="fr-icon-search-line">
                {m.search}
              </ButtonWithLoader>
            </PanelActions>
          </form>
        </Panel>
      </Animate>
      {ifDefined(_search.entity, children)}
    </>
  )
}
