import {ScAlert} from '@/components_simple/ScAlert'
import {useI18n} from '@/i18n/I18n'
import {Address} from '@/model/Address'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {CompanySearchResult, isGovernmentCompany} from '@/model/Company'
import {ReportDraft} from '@/model/ReportDraft'
import {appliedSpecialLegislation} from '@/model/SpecialLegislation'
import {ChildrenProps} from '@/utils/utils'
import {AddressComponent} from '../Address'
import {ProductRecap} from './ProductRecap'

export function CompanyRecapWithProduct(
  props: CompanyRecapProps & {
    barcodeProduct?: BarcodeProduct
  },
) {
  return (
    <>
      <CompanyRecap company={props.company} reportDraft={props.reportDraft} />
      {props.barcodeProduct && (
        <>
          <p className="mt-4 !mb-2">À propos du produit :</p>
          <ProductRecap product={props.barcodeProduct} />
        </>
      )}
    </>
  )
}

type CompanyRecapProps = {company: CompanySearchResult; reportDraft: Pick<ReportDraft, 'tags'>}

// Use name + commercialName if present
// Does not use brand
export function buildCompanyName(_: {name?: string; commercialName?: string}) {
  const name = _.name
  const commercialName = _.commercialName
  return commercialName ? `${commercialName} (${name})` : name
}

export function buildBrandName(_: CompanySearchResult) {
  const brand = _.brand
  const establishmentCommercialName = _.establishmentCommercialName
  if (establishmentCommercialName && brand) {
    return `${establishmentCommercialName} / ${brand}`
  } else if (establishmentCommercialName && !brand) {
    return `${establishmentCommercialName}`
  } else if (!establishmentCommercialName && brand) {
    return `${brand}`
  } else {
    return undefined
  }
}

function CompanyRecapFromStep2(draft: Pick<ReportDraft, 'tags' | 'step2'>) {
  const {step2} = draft

  function buildSomeCompanyFields(company: CompanySearchResult) {
    return {
      name: company.name,
      commercialName: company.commercialName,
      closed: !company.isOpen,
      siret: company.siret,
      address: company.address,
      isHeadOffice: company.isHeadOffice,
      isGovernement: isGovernmentCompany(company),
      activityLabel: company.activityLabel,
      specialLegislation: appliedSpecialLegislation(company, draft),
      brand: company.brand,
    }
  }
  if (step2.kind === 'basic' || step2.kind === 'phone' || step2.kind === 'website' || step2.kind === 'product') {
    const {companyIdentification} = step2
    switch (companyIdentification.kind) {
      case 'companyFound':
      case 'marketplaceCompanyFound':
        return buildSomeCompanyFields(companyIdentification.company)
      case 'consumerLocation':
        return {
          address: {
            postalCode: companyIdentification.consumerPostalCode,
          },
        }
      case 'consumerPreciseLocation':
        return {
          address: {
            postalCode: companyIdentification.consumerPostalCode,
            street: companyIdentification.consumerStreet,
          },
        }
      case 'foreignCompany':
        return {
          name: companyIdentification.companyName,
          address: {
            country: companyIdentification.companyCountryCode,
            postalCode: companyIdentification.consumerPostalCode,
          },
        }
      //....
    }
  }
}

type CompanyRecapFields = {
  // we mix all kinds of fields here
  name?: string
  commercialName?: string
  closed: boolean
  siret?: string
  address?: Address
  isHeadOffice: boolean
  isGovernement: boolean
  website?: string
  phone?: string
  activityLabel?: string
  brand?: string
  specialLegislation?: 'SHRINKFLATION' | undefined
}

function CompanyRecapFromFields({
  name,
  commercialName,
  closed,
  siret,
  address,
  isHeadOffice,
  isGovernement,
  website,
  phone,
  activityLabel,
  brand,
  specialLegislation,
}: CompanyRecapFields) {
  return (
    <div className="flex justify-between w-full">
      <div>
        <RowName {...{name, commercialName}} />
        <RowBrand {...{brand}} />
        <RowIsHeadOffice {...{isHeadOffice}} />
        <RowActivityLabel {...{activityLabel}} />
        <RowIsGovernement {...{isGovernement}} />
        <RowSiret {...{siret}} />
        <RowAddress {...{address}} />
        <RowWebsite {...{website}} />
        <RowPhone {...{phone}} />
        <RowSpecialLegislation {...{specialLegislation}} />
      </div>
      <RowClosed {...{closed}} />
    </div>
  )
}

function RowName({name, commercialName}: {name: string | undefined; commercialName: string | undefined}) {
  const finalName = buildCompanyName({name, commercialName})
  return finalName ? <span className="font-bold block">{finalName}</span> : null
}
function RowBrand({brand}: {brand: string | undefined}) {
  const {m} = useI18n()
  return brand ? <span className="block">{brand}</span> : null
}
function RowIsHeadOffice({isHeadOffice}: {isHeadOffice: boolean}) {
  const {m} = useI18n()
  return isHeadOffice ? (
    <Row icon="ri-building-fill" variant="blue">
      {m.isHeadOffice}
    </Row>
  ) : null
}
function RowActivityLabel({activityLabel}: {activityLabel: string | undefined}) {
  return activityLabel ? <Row icon="ri-price-tag-3-fill">{activityLabel}</Row> : null
}
function RowIsGovernement({isGovernement}: {isGovernement: boolean}) {
  const {m} = useI18n()
  return isGovernement ? (
    <Row icon="ri-error-warning-fill" variant="error">
      {m.governmentCompany}
    </Row>
  ) : null
}
function RowSiret({siret}: {siret: string | undefined}) {
  const {m} = useI18n()
  return siret ? (
    <Row icon="ri-profile-fill">
      {m.siretNumber} <span className="">{siret}</span>
    </Row>
  ) : null
}
function RowAddress({address}: {address: Address | undefined}) {
  return address ? (
    <Row icon="ri-map-pin-2-fill">
      <AddressComponent {...{address}} />
    </Row>
  ) : null
}
function RowWebsite({website}: {website: string | undefined}) {
  return website ? <Row icon="ri-global-line">{website}</Row> : null
}
function RowPhone({phone}: {phone: string | undefined}) {
  return phone ? <Row icon="ri-phone-line">{phone}</Row> : null
}
function RowSpecialLegislation({specialLegislation}: {specialLegislation: 'SHRINKFLATION' | undefined}) {
  const {m} = useI18n()
  return specialLegislation ? (
    <ScAlert type="warning" dangerouslySetInnerHTML={{__html: m.specialLegislation[specialLegislation]}} />
  ) : null
}
function RowClosed({closed}: {closed: boolean}) {
  const {m} = useI18n()
  return closed ? <span className="text-red-600">{m.closedCompany}</span> : null
}

export function CompanyRecap(props: CompanyRecapProps) {
  const closed = !props.company.isOpen
  const siret = props.company.siret
  const address = props.company.address
  const isHeadOffice = props.company.isHeadOffice
  const website = isCompanyDraft(props.company) ? props.company.website : undefined
  const phone = isCompanyDraft(props.company) ? props.company.phone : undefined
  const isGovernment = isGovernmentCompany(props.company)
  const activityLabel = props.company.activityLabel
  const brand = buildBrandName(props.company)
  const specialLegislation = appliedSpecialLegislation(props.company, props.reportDraft)
  const {m} = useI18n()
  return (
    <CompanyRecapFromFields
      {...{
        name: props.company.name,
        commercialName: props.company.commercialName,
        closed,
        siret,
        address,
        isHeadOffice,
        isGovernement: isGovernment,
        website,
        phone,
        activityLabel,
        brand,
        specialLegislation,
      }}
    />
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
