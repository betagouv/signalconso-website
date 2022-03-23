import {FormLayout} from 'shared/FormLayout/FormLayout'
import {useI18n} from 'core/i18n'
import {ScInput} from 'shared/Input/ScInput'
import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {useApiSdk} from 'core/context/ApiSdk'
import {useEffectFn, useFetcher} from '@alexandreannic/react-hooks-lib'
import {ScButton} from 'shared/Button/Button'
import {useForm} from 'react-hook-form'
import {CompanySearchResult} from '@signal-conso/signalconso-api-sdk-js'
import {useToast} from 'core/toast'
import {IconBtn, Txt} from 'mui-extension'
import {Icon} from '@mui/material'
import React, {ReactNode, useRef} from 'react'
import {AccordionInline} from 'shared/AccordionInline/AccordionInline'
import {Animate} from 'shared/Animate/Animate'
import {map} from 'core/helper/utils'
import {CompanySearchEventActions, EventCategories} from '../../../core/analytic/analytic'
import {useAnalyticContext} from '../../../core/analytic/AnalyticContext'

interface Form {
  identity: string
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

export const CompanySearchByIdentity = ({children}: Props) => {
  const {m} = useI18n()
  const {apiSdk} = useApiSdk()
  const {toastError} = useToast()
  const _analytic = useAnalyticContext()
  const _searchByIdentity = useFetcher(apiSdk.company.searchCompaniesByIdentity)
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Form>()
  const inputEl = useRef<HTMLInputElement>(null)

  const search = (form: Form) => {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByIdentity, form.identity);
    _searchByIdentity.fetch({force: true, clean: true}, form.identity)
  }

  const clear = () => {
    reset()
    _searchByIdentity.clearCache()
    inputEl.current?.focus()
  }

  useEffectFn(_searchByIdentity.error, toastError)

  return (
    <>
      <Animate>
        <Panel title={m.couldYouPrecise} id="CompanySearchByIdentity">
          <form onSubmit={handleSubmit(search)}>
            <PanelBody>
              <FormLayout required label={m.companyIdentityLabel}>
                <AccordionInline sx={{mb: .5}} label={<Txt size="small">{m.companyIdentityHelperWhere}</Txt>}>
                  <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: m.companyIdentityHelperWhereDesc}}/>
                  <img
                    src="/image/siret-helper/siret-helper-footer.png"
                    alt="consultation-pro-illustration"
                    style={{width: '100%'}}
                  />
                  <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: m.companyIdentityHelperWhereDesc2}}/>
                  <img
                    src="/image/siret-helper/siret-helper-mentions_legales.png"
                    alt="consultation-pro-illustration"
                    style={{width: '100%'}}
                  />
                </AccordionInline>
                <AccordionInline sx={{mb: .5}} label={<Txt size="small">{m.companyIdentityHelper}</Txt>}>
                  <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: m.companyIdentityHelperDesc}}/>
                </AccordionInline>
                <ScInput
                  inputRef={inputEl}
                  {...register('identity', {
                    required: {value: true, message: m.required}
                  })}
                  fullWidth
                  placeholder={m.companyIdentityPlaceholder}
                  InputProps={{
                    endAdornment: (
                      <IconBtn size="small" color="primary" onClick={clear}>
                        <Icon>clear</Icon>
                      </IconBtn>
                    )
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
      {map(_searchByIdentity.entity, children)}
    </>
  )
}
