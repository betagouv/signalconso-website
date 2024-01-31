import {ReactNode} from 'react'
import {AddressComponent} from '../../../../components_simple/Address'
import {BtnNext} from '../../../../components_simple/buttons/Buttons'
import {useI18n} from '../../../../i18n/I18n'
import {BarcodeProduct} from '../../../../model/BarcodeProduct'
import {CompanySearchResult, isGovernmentCompany} from '../../../../model/Company'
import {NoSearchResult} from './NoSearchResult'
import {CompanyRecap} from '@/components_simple/CompanyRecap'

interface BarcodeSearchResultPros {
  product?: BarcodeProduct
  company?: CompanySearchResult
  onSubmit: (selected: CompanySearchResult, product: BarcodeProduct) => void
}

function Row({icon, children, variant}: {icon: string; variant?: 'blue' | 'error'; children: ReactNode}) {
  const color = variant === 'blue' ? 'text-scbluefrance' : variant === 'error' ? 'text-red-500' : 'text-gray-500'
  return (
    <div className={`flex items-start mb-1 text-sm ${color} `}>
      <i className={`${icon} mr-2 fr-icon--sm`} />
      <div>{children}</div>
    </div>
  )
}

export const BarcodeSearchResult = ({product, company, onSubmit}: BarcodeSearchResultPros) => {
  const {m} = useI18n()
  return (
    <div className="mt-6 pt-10 border-t-[1px] border-0 border-solid border-gray-200">
      {product ? (
        <>
          <div className="flex items-start align-middle mb-2">
            <i className="ri-shopping-cart-2-fill" />
            <h1 className="text-xl font-bold mb-0 pl-2">{m.barcodeProduct}</h1>
          </div>
          <p className="ml-4 mb-0">{product.productName ?? m.barcodeNoDescriptionFound}</p>
          <p className="ml-4 text-gray-600 mb-12 text-sm">
            {m.barcodeLabel} {product.gtin}
          </p>

          <div className="flex items-start align-middle mb-2">
            <i className="ri-store-2-fill" />
            <h1 className="text-xl font-bold mb-0 pl-2">{m.barcodeCompany}</h1>
          </div>
          <div className="ml-4">
            {company ? (
              <CompanyRecap company={company} kind="companySearchResult" />
            ) : (
              <p className="text-gray-600">{m.barcodeNoCompanyFound}</p>
            )}
          </div>
          <div className="w-full flex flex-row-reverse">{company && <BtnNext onClick={() => onSubmit(company, product)} />}</div>
        </>
      ) : (
        <NoSearchResult text={m.barcodeNoProductFound} />
      )}
    </div>
  )
}
