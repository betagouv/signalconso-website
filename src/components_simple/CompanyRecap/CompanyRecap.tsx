import {ScAlert} from '@/components_simple/ScAlert'
import {useI18n} from '@/i18n/I18n'
import {Address} from '@/model/Address'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {CompanySearchResult, isGovernmentCompany} from '@/model/Company'
import {ReportDraft} from '@/model/ReportDraft'
import {appliedSpecialLegislation} from '@/model/SpecialLegislation'
import {Step2Model} from '@/model/Step2Model'
import {ChildrenProps} from '@/utils/utils'
import {AddressComponent} from '../Address'
import {ProductRecap} from './ProductRecap'

export function CompanyRecapWithProduct(props: {
  company: CompanySearchResult
  reportDraft: Pick<ReportDraft, 'tags'>
  barcodeProduct?: BarcodeProduct
}) {
  return (
    <>
      <CompanyRecap company={props.company} draft={props.reportDraft} />
      {props.barcodeProduct && (
        <>
          <p className="mt-4 !mb-2">À propos du produit :</p>
          <ProductRecap product={props.barcodeProduct} />
        </>
      )}
    </>
  )
}

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

function buildGeneralCompanyFieldsFromSearchResult(
  company: CompanySearchResult,
  draft: Pick<ReportDraft, 'tags'>,
): Omit<CompanyRecapFields, 'phone' | 'website'> {
  return {
    siret: company.siret,
    name: company.name,
    commercialName: company.commercialName,
    brand: company.brand,
    address: company.address,
    activityLabel: company.activityLabel,
    isHeadOffice: company.isHeadOffice,
    isGovernment: isGovernmentCompany(company),
    specialLegislation: appliedSpecialLegislation(company, draft),
    closed: !company.isOpen,
  }
}

function buildGeneralCompanyFields(
  step2: Step2Model,
  draft: Pick<ReportDraft, 'tags'>,
): Omit<CompanyRecapFields, 'phone' | 'website'> {
  const allUndefined = {
    name: undefined,
    commercialName: undefined,
    closed: undefined,
    siret: undefined,
    address: undefined,
    isHeadOffice: undefined,
    isGovernment: undefined,
    website: undefined,
    phone: undefined,
    activityLabel: undefined,
    brand: undefined,
    specialLegislation: undefined,
  }
  switch (step2.kind) {
    case 'basic':
    case 'phone':
    case 'product':
    case 'website':
      const companyIdentification = step2.companyIdentification
      switch (companyIdentification.kind) {
        case 'companyFound':
        case 'marketplaceCompanyFound':
          const {company} = companyIdentification
          return buildGeneralCompanyFieldsFromSearchResult(company, draft)
        case 'consumerLocation':
          return {
            ...allUndefined,
            address: {
              postalCode: companyIdentification.consumerPostalCode,
            },
          }
        case 'consumerPreciseLocation':
          return {
            ...allUndefined,
            address: {
              postalCode: companyIdentification.consumerPostalCode,
              street: companyIdentification.consumerStreet,
            },
          }
        case 'foreignCompany':
          return {
            ...allUndefined,
            address: {
              country: companyIdentification.companyCountryCode,
              postalCode: companyIdentification.consumerPostalCode,
            },
          }
        case 'foreignWebsiteWithJustCountry':
          return {
            ...allUndefined,
            address: {
              country: companyIdentification.countryCode,
            },
          }
      }
    case 'influencer':
    case 'influencerOtherSocialNetwork':
    case 'station':
    case 'train':
      return allUndefined
  }
}

function buildOtherCompanyFields(step2: Step2Model) {
  switch (step2.kind) {
    case 'phone':
      return {
        phone: step2.phone,
      }
    case 'website':
      return {
        website: step2.website,
      }
    case 'basic':
    case 'product':
    case 'influencer':
    case 'influencerOtherSocialNetwork':
    case 'station':
    case 'train':
      return {}
  }
}

export function CompanyRecapFromStep2(draft: Pick<ReportDraft, 'tags' | 'step2'>) {
  const {step2} = draft
  const {
    siret,
    name,
    commercialName,
    brand,
    address,
    activityLabel,
    isHeadOffice = false,
    isGovernment = false,
    specialLegislation,
    closed = false,
  } = buildGeneralCompanyFields(step2, draft)
  const {phone, website} = buildOtherCompanyFields(step2)
  return (
    <CompanyRecapFromFields
      {...{
        siret,
        name,
        commercialName,
        brand,
        address,
        activityLabel,
        isHeadOffice,
        isGovernment,
        specialLegislation,
        closed,
        phone,
        website,
      }}
    />
  )
}

type CompanyRecapFields = {
  name: string | undefined
  commercialName: string | undefined
  closed: boolean | undefined
  siret: string | undefined
  address: Address | undefined
  isHeadOffice: boolean | undefined
  isGovernment: boolean | undefined
  website: string | undefined
  phone: string | undefined
  activityLabel: string | undefined
  brand: string | undefined
  specialLegislation: 'SHRINKFLATION' | undefined | undefined
}

function CompanyRecapFromFields({
  name,
  commercialName,
  closed = false,
  siret,
  address,
  isHeadOffice = false,
  isGovernment = false,
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
        <RowIsGovernment {...{isGovernment: isGovernment}} />
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

export function CompanyRecap({company, draft}: {company: CompanySearchResult; draft: Pick<ReportDraft, 'tags'>}) {
  const {siret, name, commercialName, brand, address, activityLabel, isHeadOffice, isGovernment, specialLegislation, closed} =
    buildGeneralCompanyFieldsFromSearchResult(company, draft)
  const website = undefined
  const phone = undefined
  return (
    <CompanyRecapFromFields
      {...{
        siret,
        name,
        commercialName,
        brand,
        address,
        activityLabel,
        isHeadOffice,
        isGovernment,
        specialLegislation,
        closed,
        website,
        phone,
      }}
    />
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
function RowIsGovernment({isGovernment}: {isGovernment: boolean}) {
  const {m} = useI18n()
  return isGovernment ? (
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
function Row({icon, children, variant}: {icon: string; variant?: 'blue' | 'error'} & ChildrenProps) {
  const color = variant === 'blue' ? 'text-scbluefrance' : variant === 'error' ? 'text-red-500' : 'text-gray-500'
  return (
    <div className={`flex items-start mb-1 text-sm ${color} `}>
      <i className={`${icon} mr-2 fr-icon--sm`} />
      <div>{children}</div>
    </div>
  )
}
