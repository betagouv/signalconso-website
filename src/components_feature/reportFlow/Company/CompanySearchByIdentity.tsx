import {Icon, IconButton} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {useToastOnQueryError} from 'clients/apiHooks'
import {Animate} from 'components_simple/Animate'
import {ButtonWithLoader} from 'components_simple/Buttons'
import {FieldLabel} from 'components_simple/FieldLabel'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {CompanySearchResult} from '../../../model/Company'
import {ifDefined} from '../../../utils/utils'
import {CompanySearchByIdentityHelpDialog} from './CompanySearchByIdentityHelpDialog'
import {RequiredFieldsLegend} from 'components_simple/RequiredFieldsLegend'

interface Form {
  identity: string
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

export const CompanySearchByIdentity = ({children}: Props) => {
  const {m, currentLang} = useI18n()
  const {companyApiClient} = useApiClients()
  const _analytic = useAnalyticContext()
  const {register, handleSubmit, reset} = useForm<Form>()
  const [submittedIdentity, setSubmittedIdentity] = useState<string | undefined>(undefined)
  const _searchByIdentity = useQuery(['searchCompaniesByIdentity', submittedIdentity], () => {
    if (submittedIdentity) {
      return companyApiClient.searchCompaniesByIdentity(submittedIdentity, false, currentLang)
    }
    return null
  })
  useToastOnQueryError(_searchByIdentity)

  const inputEl = useRef<HTMLInputElement>(null)

  function search(form: Form) {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByIdentity, form.identity)
    setSubmittedIdentity(form.identity)
  }

  const clear = () => {
    reset()
    setSubmittedIdentity(undefined)
    inputEl.current?.focus()
  }

  return (
    <>
      <Animate>
        <Panel title={m.couldYouPrecise} id="CompanySearchByIdentity">
          <form onSubmit={handleSubmit(search)}>
            <RequiredFieldsLegend />
            <PanelBody>
              <FieldLabel
                required
                label={
                  <span>
                    {m.companyIdentityLabel}{' '}
                    <CompanySearchByIdentityHelpDialog>
                      <button className="text-scbluefrance">({m.howToFindThem})</button>
                    </CompanySearchByIdentityHelpDialog>
                  </span>
                }
              >
                <ScInput
                  type="number"
                  inputRef={inputEl}
                  {...register('identity', {
                    required: {value: true, message: m.required},
                  })}
                  required
                  fullWidth
                  placeholder={m.companyIdentityPlaceholder}
                  InputProps={{
                    endAdornment: (
                      <IconButton size="small" color="primary" onClick={clear}>
                        <Icon>clear</Icon>
                      </IconButton>
                    ),
                  }}
                />
              </FieldLabel>
            </PanelBody>

            <PanelActions>
              <ButtonWithLoader iconId="ri-search-line" loading={_searchByIdentity.isLoading}>
                {m.search}
              </ButtonWithLoader>
            </PanelActions>
          </form>
        </Panel>
      </Animate>
      {_searchByIdentity.data && ifDefined(_searchByIdentity.data, children)}
    </>
  )
}
