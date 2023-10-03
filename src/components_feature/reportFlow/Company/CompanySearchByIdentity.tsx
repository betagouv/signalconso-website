import {useQuery} from '@tanstack/react-query'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {useToastOnQueryError} from 'clients/apiHooks'
import {Animate} from 'components_simple/Animate'
import {AutofocusedDiv} from 'components_simple/AutofocusedDiv'
import {ButtonWithLoader} from 'components_simple/Buttons'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {RequiredFieldsLegend} from 'components_simple/RequiredFieldsLegend'
import {ScTextInput} from 'components_simple/formInputs/ScTextInput'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {CompanySearchResult} from '../../../model/Company'
import {CompanySearchByIdentityHelpDialog} from './CompanySearchByIdentityHelpDialog'

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

  const inputEl = useRef<HTMLInputElement | null>(null)

  function search(form: Form) {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByIdentity, form.identity)
    setSubmittedIdentity(form.identity)
  }

  const clear = () => {
    reset()
    setSubmittedIdentity(undefined)
    inputEl.current?.focus()
  }

  const {ref, ...restOfRegisterIdentity} = register('identity', {
    required: {value: true, message: m.required},
  })

  return (
    <>
      <Animate>
        <Panel title={m.couldYouPrecise} id="CompanySearchByIdentity">
          <form onSubmit={handleSubmit(search)}>
            <RequiredFieldsLegend />
            <PanelBody>
              <ScTextInput
                required
                label={
                  <span>
                    {m.companyIdentityLabel}{' '}
                    <CompanySearchByIdentityHelpDialog>
                      <button className="text-scbluefrance" type="button">
                        ({m.howToFindThem})
                      </button>
                    </CompanySearchByIdentityHelpDialog>
                  </span>
                }
                type="number"
                {...restOfRegisterIdentity}
                ref={e => {
                  // https://www.react-hook-form.com/faqs/#Howtosharerefusage
                  ref(e)
                  inputEl.current = e as any as HTMLInputElement
                }}
                placeholder={m.companyIdentityPlaceholder}
                // clearable={{
                //   onClear: clear,
                //   label: m.clearSiret,
                // }}
                error={false}
                helperText={undefined}
              />
            </PanelBody>

            <PanelActions>
              <ButtonWithLoader iconId="ri-search-line" loading={_searchByIdentity.isLoading}>
                {m.search}
              </ButtonWithLoader>
            </PanelActions>
          </form>
        </Panel>
      </Animate>
      {_searchByIdentity.data && <AutofocusedDiv>{children(_searchByIdentity.data)}</AutofocusedDiv>}
    </>
  )
}
