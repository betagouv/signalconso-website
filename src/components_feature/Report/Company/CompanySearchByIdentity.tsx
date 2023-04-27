import {Box, Icon} from '@mui/material'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {Animate} from 'components_simple/Animate/Animate'
import {ButtonWithLoader} from 'components_simple/Buttons'
import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useToast} from 'hooks/useToast'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useEffect, useRef} from 'react'
import {useForm} from 'react-hook-form'
import {IconBtn} from '../../../alexlibs/mui-extension/IconBtn/IconBtn'
import {useFetcher} from '../../../hooks/useFetcher'
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
              <ButtonWithLoader iconId="ri-search-line" loading={_searchByIdentity.loading}>
                {m.search}
              </ButtonWithLoader>
            </PanelActions>
          </form>
        </Panel>
      </Animate>
      {ifDefined(_searchByIdentity.entity, children)}
    </>
  )
}
