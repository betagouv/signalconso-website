import {Icon} from '@mui/material'
import {ReactNode} from 'react'
import {AddressComponent} from '../../../components_simple/Address'
import {Fender} from '../../../components_simple/Fender'
import {Panel, PanelBody} from '../../../components_simple/Panel'
import {BtnNext} from '../../../components_simple/buttons/Buttons'
import {useI18n} from '../../../i18n/I18n'
import {BarcodeProduct} from '../../../model/BarcodeProduct'
import {CompanySearchResult, isGovernmentCompany} from '../../../model/Company'

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

const CompanyBlock = ({company}: {company: CompanySearchResult}) => {
  const {m} = useI18n()

  const isGovernment = isGovernmentCompany(company)
  return (
    <div className="flex justify-between w-full">
      <div>
        <span className="font-bold block">
          {company.commercialName ? `${company.commercialName} (${company.name})` : company.name}
        </span>
        {company.brand && <span className="block">{company.brand}</span>}

        {company.isHeadOffice && (
          <Row icon="ri-building-fill" variant="blue">
            {m.isHeadOffice}
          </Row>
        )}

        {company.activityLabel && <Row icon="ri-price-tag-3-fill">{company.activityLabel}</Row>}
        {isGovernment && (
          <Row icon="ri-error-warning-fill" variant="error">
            {m.governmentCompany}
          </Row>
        )}

        <Row icon="ri-profile-fill">
          {m.siretNumber} <span className="">{company.siret}</span>
        </Row>
        {company.address && (
          <Row icon="ri-map-pin-2-fill">
            <AddressComponent address={company.address} />
          </Row>
        )}
      </div>
      {closed && <span className="text-red-600">{m.closedCompany}</span>}
    </div>
  )
}

export const BarcodeSearchResult = ({product, company, onSubmit}: BarcodeSearchResultPros) => {
  const {m} = useI18n()

  return product ? (
    <div className="mt-6 pt-10 border-t-[1px] border-0 border-solid border-gray-200">
      <div className="flex items-start align-middle mb-2">
        <Icon>shopping_cart</Icon>
        <h1 className="text-xl font-bold mb-0 pl-2">{m.barcodeProduct}</h1>
      </div>
      <p className="ml-4 text-gray-600 mb-12">{product.productName ?? m.barcodeNoDescriptionFound}</p>
      <div className="flex items-start align-middle mb-2">
        <Icon>store</Icon>
        <h1 className="text-xl font-bold mb-0 pl-2">{m.barcodeCompany}</h1>
      </div>
      <div className="ml-4">
        {company ? <CompanyBlock company={company} /> : <p className="text-gray-600">{m.barcodeNoCompanyFound}</p>}
      </div>
      <div className="w-full flex flex-row-reverse">{company && <BtnNext onClick={() => onSubmit(company, product)} />}</div>
    </div>
  ) : (
    <Panel>
      <Fender icon="sentiment_very_dissatisfied">
        <span className="text-xl text-gray-600">{m.barcodeNoProductFound}</span>
      </Fender>
    </Panel>
  )
}
