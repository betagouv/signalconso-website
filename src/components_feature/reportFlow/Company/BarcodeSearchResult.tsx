import {CompanySearchResult, isGovernmentCompany} from '../../../model/Company'
import {GS1Product} from '../../../model/GS1Product'
import {AddressComponent} from '../../../components_simple/Address'
import {ReactNode} from 'react'
import {Icon} from '@mui/material'
import {styleUtils} from '../../../core/theme'
import {useI18n} from '../../../i18n/I18n'
import {BtnNext} from '../../../components_simple/buttons/Buttons'
import {Panel, PanelBody} from '../../../components_simple/Panel'

interface BarcodeSearchResultPros {
  product?: GS1Product
  company?: CompanySearchResult
  onSubmit: (selected: CompanySearchResult, product: GS1Product) => void
}

const Row = ({icon, children, variant}: {icon?: string; variant?: 'blue' | 'error'; children: ReactNode}) => {
  const color = variant === 'blue' ? 'text-scbluefrance' : variant === 'error' ? 'text-red-500' : 'text-gray-500'
  return (
    <>
      <div className={`flex items-start mb-1 text-sm ${color}`}>
        <Icon
          sx={{
            mr: 0.5,
            fontSize: t => styleUtils(t).fontSize.big,
            lineHeight: 1,
            minWidth: 20,
          }}
        >
          {icon}
        </Icon>
        <div>{children}</div>
      </div>
    </>
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
          <Row icon="business" variant="blue">
            {m.isHeadOffice}
          </Row>
        )}

        {company.activityLabel && <Row icon="label">{company.activityLabel}</Row>}
        {isGovernment && (
          <Row icon="error" variant="error">
            {m.governmentCompany}
          </Row>
        )}

        <Row icon="badge">
          {m.siretNumber} <span className="">{company.siret}</span>
        </Row>
        {company.address && (
          <Row icon="location_on">
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
    <Panel>
      <PanelBody>
        <h1 className="text-xl font-bold mb-2">{m.barcodeProduct}</h1>
        <p className="ml-4 text-gray-500">{product.description ?? m.barcodeNoDescriptionFound}</p>
        <h1 className="text-xl font-bold mb-2">{m.barcodeCompany}</h1>
        <div className="ml-4">
          {company ? <CompanyBlock company={company} /> : <p className="text-gray-500">{m.barcodeNoCompanyFound}</p>}
        </div>
        <div className="w-full flex flex-row-reverse mt-4">
          {company && <BtnNext onClick={() => onSubmit(company, product)} />}
        </div>
      </PanelBody>
    </Panel>
  ) : (
    <div className="text-xl font-bold">{m.barcodeNoProductFound}</div>
  )
}
