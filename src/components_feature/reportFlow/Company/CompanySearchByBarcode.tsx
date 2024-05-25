import {useBarcodeSearch} from '@/feature/barcode'
import {purgeWhitespaces} from '@/utils/utils'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {ReactNode, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useAnalyticContext} from '../../../analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from '../../../analytic/analytic'
import {Animate} from '../../../components_simple/Animate'
import {ButtonWithLoader} from '../../../components_simple/buttons/Buttons'
import {ScTextInput} from '../../../components_simple/formInputs/ScTextInput'
import {useI18n} from '../../../i18n/I18n'
import {BarcodeProduct} from '../../../model/BarcodeProduct'
import {CompanySearchResult} from '../../../model/Company'
import {BarcodeHelpButton} from './lib/BarcodeHelpButton'

type Form = {
  gtin: string
}

type FormStatus = {kind: 'editing'} | {kind: 'skipped'} | {kind: 'submitted'; gtin: string}

type Results =
  | {
      kind: 'dont_know_barcode'
    }
  | {
      kind: 'search_results'
      product?: BarcodeProduct
      company?: CompanySearchResult
    }

interface Props {
  children: (results: Results) => ReactNode
  searchProductOnly: boolean
}

export const CompanySearchByBarcode = ({searchProductOnly, children}: Props) => {
  const {m} = useI18n()
  const _analytic = useAnalyticContext()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>()

  const [formStatus, setFormStatus] = useState<FormStatus>({kind: 'editing'})
  const gtin = formStatus && formStatus.kind === 'submitted' ? formStatus.gtin : undefined
  const _search = useBarcodeSearch(gtin, searchProductOnly)

  const onSkip = () => setFormStatus({kind: 'skipped'})
  const onEdit = () => setFormStatus({kind: 'editing'})
  function onSubmit(form: Form) {
    const gtin = purgeWhitespaces(form.gtin)
    _analytic.trackEvent(EventCategories.barcodeSearch, CompanySearchEventActions.searchByGTIN, gtin)
    setFormStatus({
      kind: 'submitted',
      gtin,
    })
  }

  const inputEl = useRef<HTMLInputElement | null>(null)

  const {ref, ...restOfRegisterGtin} = register('gtin', {
    required: {value: true, message: m.required},
    validate: s => {
      const s2 = purgeWhitespaces(s)
      if (!isNaN(Number(s2))) {
        return true
      }
      return "Ce n'est pas un nombre"
    },
  })

  return (
    <>
      <Animate>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <ScTextInput
                required={false}
                label={
                  <span>
                    {m.barcodeWhereToFind}
                    <BarcodeHelpButton />
                  </span>
                }
                disabled={formStatus.kind !== 'editing'}
                editable={
                  formStatus.kind === 'editing'
                    ? undefined
                    : {
                        onEdit: onEdit,
                        label: 'Modifier',
                      }
                }
                // we want to allow whitespaces, typically from a copy/paste
                type="text"
                // we want the mobile keyboard to be numeric
                inputMode="numeric"
                {...restOfRegisterGtin}
                ref={e => {
                  // https://www.react-hook-form.com/faqs/#Howtosharerefusage
                  ref(e)
                  inputEl.current = e as any as HTMLInputElement
                }}
                placeholder="Ex: 1903573408887"
                error={!!errors.gtin}
                helperText={errors.gtin?.message}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button priority="tertiary no outline" type="button" onClick={onSkip}>
                Je ne connais pas le code-barres
              </Button>
              <ButtonWithLoader iconId="ri-search-line" loading={_search.isFetching}>
                {m.search}
              </ButtonWithLoader>
            </div>
          </form>
        </div>
      </Animate>
      {formStatus.kind === 'skipped' &&
        children({
          kind: 'dont_know_barcode',
        })}
      {formStatus.kind === 'submitted' &&
        _search.data &&
        children({
          kind: 'search_results',
          product: _search.data.product,
          company: _search.data.company,
        })}
    </>
  )
}
