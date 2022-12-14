import {useI18n} from 'i18n'
import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import {Controller, useForm} from 'react-hook-form'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useToast} from 'hooks/useToast'
import {useFetcher} from '../../../hooks/useFetcher'
import {ScButton} from 'components_simple/Button/Button'
import {Txt} from '../../../alexlibs/mui-extension'
import {Animate} from 'components_simple/Animate/Animate'
import React, {ReactNode, useEffect} from 'react'
import {ifDefined} from '../../../utils/utils'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {AutocompleteCity} from 'components_simple/AutocompleteCity/AutocompleteCity'
import {CompanySearchResult} from '../../../model/Company'

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
  const {toastError} = useToast()
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
    if (_search.error) toastError(_search.error)
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
              <ScButton color="primary" variant="contained" icon="search" type="submit" loading={_search.loading}>
                {m.search}
              </ScButton>
            </PanelActions>
          </form>
        </Panel>
      </Animate>
      {ifDefined(_search.entity, children)}
    </>
  )
}
