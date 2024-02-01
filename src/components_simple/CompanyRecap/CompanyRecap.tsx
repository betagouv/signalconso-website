import {useI18n} from '@/i18n/I18n'
import {CompanyDraft, CompanySearchResult, isGovernmentCompany} from '@/model/Company'
import {ChildrenProps} from '@/utils/utils'
import {AddressComponent} from '../Address'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {ProductRecap} from './ProductRecap'

export function CompanyRecapWithProduct(
  props: CompanyRecapProps & {
    barcodeProduct?: BarcodeProduct
  },
) {
  return (
    <>
      {props.kind === 'companyDraft' ? (
        <CompanyRecap company={props.company} kind={props.kind} />
      ) : (
        <CompanyRecap company={props.company} kind={props.kind} />
      )}
      {props.barcodeProduct && (
        <>
          <p className="mt-4 !mb-2">À propos du produit :</p>
          <ProductRecap product={props.barcodeProduct} />
        </>
      )}
    </>
  )
}

type CompanyRecapProps =
  | {company: CompanyDraft; kind: 'companyDraft'}
  | {company: CompanySearchResult; kind: 'companySearchResult'}

export function CompanyRecap(props: CompanyRecapProps) {
  const closed = !props.company.isOpen
  const name = props.company.name
  const brand = props.company.brand
  const siret = props.company.siret
  const address = props.company.address
  const isHeadOffice = props.company.isHeadOffice
  const website = (props.kind === 'companyDraft' && props.company.website) || undefined
  const phone = (props.kind === 'companyDraft' && props.company.phone) || undefined
  const isGovernment = isGovernmentCompany(props.company)
  const commercialName = (props.kind === 'companySearchResult' && props.company.commercialName) || undefined
  const activityLabel = (props.kind === 'companySearchResult' && props.company.activityLabel) || undefined
  const {m} = useI18n()
  return (
    <div className="flex justify-between w-full">
      <div>
        <span className="font-bold block">{commercialName ? `${commercialName} (${name})` : name}</span>
        {brand && <span className="block">{brand}</span>}
        {isHeadOffice && (
          <Row icon="ri-building-fill" variant="blue">
            {m.isHeadOffice}
          </Row>
        )}
        {activityLabel && <Row icon="ri-price-tag-3-fill">{activityLabel}</Row>}
        {isGovernment && (
          <Row icon="ri-error-warning-fill" variant="error">
            {m.governmentCompany}
          </Row>
        )}
        <Row icon="ri-profile-fill">
          {m.siretNumber} <span className="">{siret}</span>
        </Row>
        {address && (
          <Row icon="ri-map-pin-2-fill">
            <AddressComponent address={address} />
          </Row>
        )}
        {website && <Row icon="ri-global-line">{website}</Row>}
        {phone && <Row icon="ri-phone-line">{phone}</Row>}
      </div>
      {closed && <span className="text-red-600">{m.closedCompany}</span>}
    </div>
  )
}

function Row({icon, children, variant}: {icon: string; variant?: 'blue' | 'error'} & ChildrenProps) {
  const color = variant === 'blue' ? 'text-scbluefrance' : variant === 'error' ? 'text-red-500' : 'text-gray-500'
  return (
    <div className={`flex items-start mb-1 text-sm ${color} `}>
      <i className={`${icon} mr-2 fr-icon--sm`} />
      <div>{children}</div>
    </div>
  )
}
