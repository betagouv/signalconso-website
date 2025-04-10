import {CompanyRecapFromSearchResult} from '@/components_simple/CompanyRecap/CompanyRecap'
import {ProductRecap} from '@/components_simple/CompanyRecap/ProductRecap'
import {getTags} from '@/feature/reportUtils'
import {Report} from '@/model/Report'
import {ReactNode} from 'react'
import {SpecificProductCompanyKind} from 'shared/anomalies/Anomaly'
import {BtnNext} from '../../../../components_simple/buttons/Buttons'
import {useI18n} from '../../../../i18n/I18n'
import {BarcodeProduct} from '../../../../model/BarcodeProduct'
import {CompanySearchResult} from '../../../../model/Company'
import {NoSearchResult} from './NoSearchResult'

interface BarcodeSearchResultPros {
  product?: BarcodeProduct
  company?: CompanySearchResult
  report: Pick<Report, 'step1' | 'step0'>
  onSubmit: (selected: CompanySearchResult, product: BarcodeProduct) => void
  noResultsPanel?: ReactNode
  specificProductCompanyKinds: SpecificProductCompanyKind
}

export const BarcodeSearchResult = ({
  product,
  company,
  report: report,
  onSubmit,
  specificProductCompanyKinds,
  noResultsPanel,
}: BarcodeSearchResultPros) => {
  const {m} = useI18n()
  return (
    <div className="pt-10 border-t-[1px] border-0 border-solid border-gray-200">
      {product ? (
        <>
          <div className="flex items-start align-middle mb-2">
            <i className="ri-shopping-cart-2-fill" />
            <h1 className="text-xl font-bold mb-0 pl-2">{m.barcodeProduct}</h1>
          </div>
          <div className="ml-4">
            <ProductRecap {...{product}} />
          </div>
          {specificProductCompanyKinds !== 'PRODUCT_POINT_OF_SALE' && (
            <>
              <div className="flex items-start align-middle mb-2">
                <i className="ri-store-2-fill" />
                <h1 className="text-xl font-bold mb-0 pl-2">{m.barcodeCompany}</h1>
              </div>
              <div className="ml-4">
                {company ? (
                  <CompanyRecapFromSearchResult company={company} tags={getTags(report)} />
                ) : (
                  <p className="text-gray-600">{m.barcodeNoCompanyFound}</p>
                )}
              </div>
            </>
          )}
          <div className="w-full flex flex-row-reverse">{company && <BtnNext onClick={() => onSubmit(company, product)} />}</div>
        </>
      ) : (
        (noResultsPanel ?? <NoSearchResult text={m.barcodeNoProductFound} />)
      )}
    </div>
  )
}
