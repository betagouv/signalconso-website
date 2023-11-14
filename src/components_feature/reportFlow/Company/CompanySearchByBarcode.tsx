import {useI18n} from '../../../i18n/I18n'
import {useApiClients} from '../../../context/ApiClientsContext'
import {Animate} from '../../../components_simple/Animate'
import {Panel, PanelActions, PanelBody} from '../../../components_simple/Panel'
import {ScTextInput} from '../../../components_simple/formInputs/ScTextInput'
import {CompanySearchByBarcodeHelpDialog} from './CompanySearchByBarcodeHelpDialog'
import {ButtonWithLoader} from '../../../components_simple/buttons/Buttons'
import {useForm} from 'react-hook-form'
import {useQuery} from '@tanstack/react-query'
import {CompanySearchEventActions, EventCategories} from '../../../analytic/analytic'
import {useAnalyticContext} from '../../../analytic/AnalyticContext'
import {CompanySearchResult} from '../../../model/Company'
import {ReactNode, useEffect, useRef, useState} from 'react'
import {BarcodeProduct} from '../../../model/BarcodeProduct'
import {Button} from '@codegouvfr/react-dsfr/Button'

interface Form {
  gtin: string
}

interface Props {
  children: (product?: BarcodeProduct, company?: CompanySearchResult, skipped?: boolean) => ReactNode
}

function purgeWhitespaces(identity: string): string {
  // the user may copy/paste the number from a webpage
  // with whitespaces before, after, or inside, e.g.: XXX XXX XXX
  return identity.replace(/\s+/g, '')
}

export const CompanySearchByBarcode = ({children}: Props) => {
  const {m, currentLang} = useI18n()
  const {companyApiClient, signalConsoApiClient} = useApiClients()
  const _analytic = useAnalyticContext()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>()

  const [submittedGTIN, setSubmittedGTIN] = useState<string | undefined>(undefined)
  const _searchByBarcode = useQuery(
    ['searchByBarcode', submittedGTIN],
    () => {
      return signalConsoApiClient.searchByBarcode(submittedGTIN ?? '')
    },
    {enabled: !!submittedGTIN, retry: false},
  )

  const [submittedIdentity, setSubmittedIdentity] = useState<string | undefined>(undefined)
  const _searchByIdentity = useQuery(
    ['searchCompaniesByIdentity', submittedIdentity],
    () => {
      return companyApiClient.searchCompaniesByIdentity(submittedIdentity ?? '', false, currentLang)
    },
    {enabled: !!submittedIdentity, retry: false},
  )

  useEffect(() => {
    if (_searchByBarcode.data) {
      setSubmittedIdentity(_searchByBarcode.data.siren)
    }
  }, [_searchByBarcode.data])

  const [skipped, setSkipped] = useState<boolean>(false)
  const [editing, setEditing] = useState(true)

  const skip = () => {
    setSkipped(true)
    setEditing(false)
  }

  const edit = () => {
    setSkipped(false)
    setEditing(true)
  }

  function search(form: Form) {
    _analytic.trackEvent(EventCategories.barcodeSearch, CompanySearchEventActions.searchByGTIN, form.gtin)
    setSubmittedGTIN(form.gtin)
    setSkipped(false)
    setEditing(false)
  }

  const inputEl = useRef<HTMLInputElement | null>(null)

  const {ref, ...restOfRegisterIdentity} = register('gtin', {
    required: {value: true, message: m.required},
    validate: s => {
      const s2 = purgeWhitespaces(s)
      if (!isNaN(Number(s2))) {
        return true
      }
      return "Ce n'est pas un nombre"
    },
  })

  const displaySkipped = skipped && !editing
  const displayResults =
    !skipped && !editing && ((_searchByBarcode.isFetched && !_searchByBarcode.data?.siren) || _searchByIdentity.isFetched)

  return (
    <>
      <Animate>
        <Panel>
          <form onSubmit={handleSubmit(search)}>
            <PanelBody>
              <ScTextInput
                required={false}
                label={
                  <span>
                    {m.barcodeWhereToFind}
                    <CompanySearchByBarcodeHelpDialog>
                      <button className="text-scbluefrance" type="button">
                        ({m.howToFindIt})
                      </button>
                    </CompanySearchByBarcodeHelpDialog>
                  </span>
                }
                disabled={!editing}
                editable={
                  editing
                    ? undefined
                    : {
                        onEdit: edit,
                        label: 'Modifier',
                      }
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
                placeholder="Ex: 1903573408887"
                error={!!errors.gtin}
                helperText={errors.gtin?.message}
              />
            </PanelBody>
            <PanelActions>
              <Button priority="tertiary no outline" type="button" onClick={skip}>
                Je ne connais pas le code-barres
              </Button>
              <ButtonWithLoader iconId="ri-search-line" loading={_searchByBarcode.isFetching || _searchByIdentity.isFetching}>
                {m.search}
              </ButtonWithLoader>
            </PanelActions>
          </form>
        </Panel>
      </Animate>
      {displaySkipped && children(undefined, undefined, skipped)}
      {displayResults && children(_searchByBarcode.data, _searchByIdentity.data?.at(0), skipped)}
    </>
  )
}