import {Anomaly} from '@/anomalies/Anomaly'
import {UseQueryResult} from '@tanstack/react-query'
import {useSearchParams} from 'next/navigation'
import {BarcodeSearchQueryResult} from './barcode'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {buildCompanyName} from '@/components_simple/CompanyRecap/CompanyRecap'

const OPENFOODFACTS_BARCODE_PARAM = 'openffgtin'

export function useOpenFfBarcodeParam(anomaly: Anomaly) {
  const searchParams = useSearchParams()
  return (anomaly.isSpecialOpenFoodFactsCategory && searchParams.get(OPENFOODFACTS_BARCODE_PARAM)) || undefined
}

function Loader() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="sc-loader-big w-20 h-20"></div>
    </div>
  )
}

function WelcomeInvalidBarcode({barcode}: {barcode: string}) {
  return (
    <FriendlyHelpText>
      <p className="mb-2 mt-4">
        <i className="ri-information-line mr-2" />
        Vous avez rencontré un problème avec ce produit (code-barres <span className="font-bold">{barcode}</span>) ?
      </p>
      <p className="mb-2 mt-4">
        Nous n'avons pas pu identifier ce produit. Cependant, vous pouvez quand même faire un signalement sur SignalConso. Nous
        vous demanderons d'identifier manuellement l'entreprise qui est à l'origine de ce produit.
      </p>
      <p></p>
      <p className="mb-4">
        SignalConso vous permet de remonter le problème à l'entreprise. De plus, votre signalement est visible par les agents de
        la répression des fraudes, qui pourront intervenir si nécessaire.
      </p>
      <p className="text-center font-bold mb-2">Répondez-simplement aux questions, et laissez-vous guider !</p>
    </FriendlyHelpText>
  )
}

export function OpenFfWelcomeText({
  barcode,
  _openFfBarcodeSearch,
}: {
  barcode?: string
  _openFfBarcodeSearch: UseQueryResult<BarcodeSearchQueryResult | undefined>
}) {
  return (
    <>
      {barcode && _openFfBarcodeSearch.status === 'pending' && <Loader />}
      {barcode && _openFfBarcodeSearch.data === null && <WelcomeInvalidBarcode barcode={barcode} />}
      {barcode &&
        _openFfBarcodeSearch.status === 'success' &&
        _openFfBarcodeSearch.data &&
        _openFfBarcodeSearch.data.product &&
        !_openFfBarcodeSearch.data.company && (
          <FriendlyHelpText>
            {/* Cas où on a le produit mais sans l'entreprise */}
            <p className="mb-2 mt-4">
              <i className="ri-information-line mr-2" />
              Vous avez rencontré un problème avec le produit{' '}
              <span className="font-bold">
                {_openFfBarcodeSearch.data.product.productName ?? _openFfBarcodeSearch.data.product.gtin}
              </span>{' '}
              ?
            </p>
            <p className="mb-4">
              SignalConso vous permet de remonter le problème à l'entreprise. De plus, votre signalement est visible par les
              agents de la répression des fraudes, qui pourront intervenir si nécessaire.
            </p>
            <p className="mb-4">
              Nous n'avons pas pu automatiquement identifier l'entreprise à l'origine de ce produit, nous demanderons donc de
              l'identifier manuellement.
            </p>
            <p className="text-center font-bold mb-2">Répondez-simplement aux questions, et laissez-vous guider !</p>
          </FriendlyHelpText>
        )}
      {barcode &&
        _openFfBarcodeSearch.status === 'success' &&
        _openFfBarcodeSearch.data &&
        _openFfBarcodeSearch.data.product &&
        _openFfBarcodeSearch.data.company && (
          <FriendlyHelpText>
            {/* Cas complet */}
            <p className="mb-2 mt-4">
              <i className="ri-information-line mr-2" />
              Vous avez rencontré un problème avec le produit{' '}
              <span className="font-bold">
                {_openFfBarcodeSearch.data.product.productName ?? _openFfBarcodeSearch.data.product.gtin}
              </span>{' '}
              produit par l'entreprise{' '}
              <span className="font-bold">{buildCompanyName({company: _openFfBarcodeSearch.data.company})}</span>?
            </p>
            <p className="mb-4">
              SignalConso vous permet de remonter le problème à l'entreprise. De plus, votre signalement est visible par les
              agents de la répression des fraudes, qui pourront intervenir si nécessaire.
            </p>
            <p className="text-center font-bold mb-2">Répondez-simplement aux questions, et laissez-vous guider !</p>
          </FriendlyHelpText>
        )}
    </>
  )
}
