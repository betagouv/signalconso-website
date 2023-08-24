import {Box, Icon} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {useToastOnQueryError} from 'clients/apiHooks'
import {Animate} from 'components_simple/Animate'
import {ButtonWithLoader} from 'components_simple/Buttons'
import {FormLayout} from 'components_simple/FormLayout'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {IconBtn} from '../../../alexlibs/IconBtn'
import {CompanySearchResult} from '../../../model/Company'
import {ifDefined} from '../../../utils/utils'
import {CompanySearchByIdentityHelpDialog} from './CompanySearchByIdentityHelpDialog'

interface Form {
  identity: string
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

export const CompanySearchByIdentity = ({children}: Props) => {
  const {m} = useI18n()
  const {companyApiClient} = useApiClients()
  const _analytic = useAnalyticContext()
  const {register, handleSubmit, reset} = useForm<Form>()
  const [submittedIdentity, setSubmittedIdentity] = useState<string | undefined>(undefined)
  const _searchByIdentity = useQuery(['searchCompaniesByIdentity', submittedIdentity], () => {
    if (submittedIdentity) {
      return companyApiClient.searchCompaniesByIdentity(submittedIdentity, false)
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
            <PanelBody>
              <FormLayout
                required
                label={
                  <Box sx={{display: 'inline-flex', alignItems: 'center'}}>
                    {m.companyIdentityLabel}
                    <CompanySearchByIdentityHelpDialog>
                      <IconBtn sx={{ml: 1, color: t => t.palette.info.main}} size="small">
                        <Icon>help</Icon>
                      </IconBtn>
                    </CompanySearchByIdentityHelpDialog>
                  </Box>
                }
              >
                <ScInput
                  type="number"
                  inputRef={inputEl}
                  {...register('identity', {
                    required: {value: true, message: m.required},
                  })}
                  fullWidth
                  placeholder={m.companyIdentityPlaceholder}
                  InputProps={{
                    endAdornment: (
                      <IconBtn size="small" color="primary" onClick={clear}>
                        <Icon>clear</Icon>
                      </IconBtn>
                    ),
                  }}
                />
              </FormLayout>
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