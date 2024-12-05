import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from '@/analytic/analytic'
import {useToastOnQueryError} from '@/clients/apiHooks'
import {Animate} from '@/components_simple/Animate'
import {AutofocusedDiv} from '@/components_simple/AutofocusedDiv'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {purgeWhitespaces} from '@/utils/utils'
import {useQuery} from '@tanstack/react-query'
import {ReactNode, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {CompanySearchResult} from '../../../model/Company'
import {SiretHelpButton} from './lib/SiretHelpButton'

interface Form {
  identity: string
}

interface Props {
  children: (companies?: CompanySearchResult[]) => ReactNode
}

function isSiretOrSirenOrTVA(identity: string) {
  return /^(?:\d{9}|\d{14}|FR\d{11})$/.test(identity)
}

export const CompanySearchByIdentifier = ({children}: Props) => {
  const {m, currentLang} = useI18n()
  const {companyApiClient} = useApiClients()
  const _analytic = useAnalyticContext()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>()
  const [submittedIdentity, setSubmittedIdentity] = useState<string | undefined>(undefined)
  const _searchByIdentity = useQuery({
    queryKey: ['searchCompaniesByIdentity', submittedIdentity],
    queryFn: async () => {
      if (submittedIdentity) {
        const res = await companyApiClient.searchCompaniesByIdentity(submittedIdentity, false, currentLang)
        _analytic.trackSearch({q: submittedIdentity}, 'companysearch_siret', res.length)
        return res
      }
      return null
    },
  })
  useToastOnQueryError(_searchByIdentity)

  const inputEl = useRef<HTMLInputElement | null>(null)

  function search(form: Form) {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByIdentity, form.identity)
    setSubmittedIdentity(purgeWhitespaces(form.identity))
  }

  const {ref, ...restOfRegisterIdentity} = register('identity', {
    required: {value: true, message: m.required},
    validate: s => {
      const s2 = purgeWhitespaces(s)
      if (isSiretOrSirenOrTVA(s2)) {
        return true
      }
      return "Ce n'est pas un numéro SIRET ou SIREN (14 ou 9 chiffres)"
    },
  })

  return (
    <>
      <Animate>
        <div id="CompanySearchByIdentity">
          <h2 className="!text-lg">{m.couldYouPrecise}</h2>
          <form onSubmit={handleSubmit(search)}>
            <RequiredFieldsLegend />
            <div className="mb-4">
              <ScTextInput
                required
                label={
                  <span>
                    {m.companyIdentityLabel} <SiretHelpButton />
                  </span>
                }
                // we want to allow whitespaces, typically from a copy/paste
                type="text"
                // we want the mobile keyboard to be numeric
                inputMode="numeric"
                {...restOfRegisterIdentity}
                ref={e => {
                  // https://www.react-hook-form.com/faqs/#Howtosharerefusage
                  ref(e)
                  inputEl.current = e as any as HTMLInputElement
                }}
                placeholder={m.companyIdentityPlaceholder}
                error={!!errors.identity}
                helperText={errors.identity?.message}
              />
            </div>
            <div className="flex justify-end">
              <ButtonWithLoader iconId="ri-search-line" loading={_searchByIdentity.isPending}>
                {m.search}
              </ButtonWithLoader>
            </div>
          </form>
        </div>
      </Animate>
      {_searchByIdentity.data && <AutofocusedDiv>{children(_searchByIdentity.data)}</AutofocusedDiv>}
    </>
  )
}
