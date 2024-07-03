import {BtnNext} from '../../../../components_simple/buttons/Buttons'
import {useI18n} from '../../../../i18n/I18n'
import {BarcodeProduct} from '../../../../model/BarcodeProduct'
import {CompanySearchResult} from '../../../../model/Company'
import {NoSearchResult} from './NoSearchResult'
import {CompanyRecap} from '@/components_simple/CompanyRecap/CompanyRecap'
import {ProductRecap} from '@/components_simple/CompanyRecap/ProductRecap'
import {SpecificProductCompanyKinds} from '@/anomalies/Anomaly'
import {ReportDraft2} from '@/model/ReportDraft2'

interface BarcodeSearchResultPros {
  product?: BarcodeProduct
  company?: CompanySearchResult
  reportDraft: Partial<ReportDraft2>
  onSubmit: (selected: CompanySearchResult, product: BarcodeProduct) => void
  specificProductCompanyKinds: SpecificProductCompanyKinds
}

export const BarcodeSearchResult = ({
  product,
  company,
  reportDraft,
  onSubmit,
  specificProductCompanyKinds,
}: BarcodeSearchResultPros) => {
  const {m} = useI18n()
  return (
    <div className="mt-6 pt-10 border-t-[1px] border-0 border-solid border-gray-200">
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
                  <CompanyRecap company={company} reportDraft={reportDraft} />
                ) : (
                  <p className="text-gray-600">{m.barcodeNoCompanyFound}</p>
                )}
              </div>
            </>
          )}
          <div className="w-full flex flex-row-reverse">{company && <BtnNext onClick={() => onSubmit(company, product)} />}</div>
        </>
      ) : (
        <NoSearchResult text={m.barcodeNoProductFound} />
      )}
    </div>
  )
}
