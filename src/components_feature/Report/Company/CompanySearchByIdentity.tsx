import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import {useI18n} from 'i18n/I18n'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useFetcher} from '../../../hooks/useFetcher'
import {ScButton} from 'components_simple/Button/Button'
import {useForm} from 'react-hook-form'
import {useToast} from 'hooks/useToast'
import {IconBtn} from '../../../alexlibs/mui-extension/IconBtn/IconBtn'
import {Box, Icon} from '@mui/material'
import React, {ReactNode, useEffect, useRef} from 'react'
import {Animate} from 'components_simple/Animate/Animate'
import {ifDefined} from '../../../utils/utils'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchByIdentityHelpDialog} from './CompanySearchByIdentityHelpDialog'
import {CompanySearchResult} from '../../../model/Company'

interface Form {
  identity: string
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

export const CompanySearchByIdentity = ({children}: Props) => {
  const {m} = useI18n()
  const {companyApiClient: signalConsoApiClient} = useApiClients()
  const {toastError} = useToast()
  const _analytic = useAnalyticContext()
  const _searchByIdentity = useFetcher(signalConsoApiClient.searchCompaniesByIdentity)
  const {register, handleSubmit, reset} = useForm<Form>()
  const inputEl = useRef<HTMLInputElement>(null)

  const search = (form: Form) => {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByIdentity, form.identity)
    _searchByIdentity.fetch({force: true, clean: true}, form.identity)
  }

  const clear = () => {
    reset()
    _searchByIdentity.clearCache()
    inputEl.current?.focus()
  }

  useEffect(() => {
    if (_searchByIdentity.error) toastError(_searchByIdentity.error)
  }, [_searchByIdentity.error])

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
              <ScButton color="primary" variant="contained" icon="search" type="submit" loading={_searchByIdentity.loading}>
                {m.search}
              </ScButton>
            </PanelActions>
          </form>
        </Panel>
      </Animate>
      {ifDefined(_searchByIdentity.entity, children)}
    </>
  )
}
