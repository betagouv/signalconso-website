import {CompanySearchResult, isGovernmentCompany} from '@/model/Company'
import {ReportDraft} from '@/model/ReportDraft'
import {appliedSpecialLegislation} from '@/model/SpecialLegislation'
import {Step2Model} from '@/model/Step2Model'
import {CompanyRecapRaw, CompanyRecapRawProps} from './CompanyRecapRaw'
import {buildBrandName} from './companyNameUtils'

export function CompanyRecapFromStep2({draft}: {draft: Pick<ReportDraft, 'tags' | 'step2'>}) {
  // this doesn't display all the step2 variations
  // only whatever concerns the company + phone/website/product
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
  } = buildMainFields(step2, draft)
  const {phone, website, barcodeProduct} = buildOtherFields(step2)
  return (
    <CompanyRecapRaw
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
        barcodeProduct,
      }}
    />
  )
}

export function CompanyRecapFromSearchResult({company, draft}: {company: CompanySearchResult; draft: Pick<ReportDraft, 'tags'>}) {
  const {siret, name, commercialName, brand, address, activityLabel, isHeadOffice, isGovernment, specialLegislation, closed} =
    buildMainFieldsFromSearchResult(company, draft)
  const website = undefined
  const phone = undefined
  const barcodeProduct = undefined
  return (
    <CompanyRecapRaw
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
        barcodeProduct,
      }}
    />
  )
}

function buildMainFields(
  step2: Step2Model,
  draft: Pick<ReportDraft, 'tags'>,
): Omit<CompanyRecapRawProps, 'phone' | 'website' | 'barcodeProduct'> {
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
          return buildMainFieldsFromSearchResult(company, draft)
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

function buildMainFieldsFromSearchResult(
  company: CompanySearchResult,
  draft: Pick<ReportDraft, 'tags'>,
): Omit<CompanyRecapRawProps, 'phone' | 'website' | 'barcodeProduct'> {
  return {
    siret: company.siret,
    name: company.name,
    commercialName: company.commercialName,
    brand: buildBrandName(company),
    address: company.address,
    activityLabel: company.activityLabel,
    isHeadOffice: company.isHeadOffice,
    isGovernment: isGovernmentCompany(company),
    specialLegislation: appliedSpecialLegislation(company, draft),
    closed: !company.isOpen,
  }
}

function buildOtherFields(step2: Step2Model) {
  switch (step2.kind) {
    case 'phone':
      return {
        phone: step2.phone,
      }
    case 'website':
      return {
        website: step2.website,
      }
    case 'product':
      return {
        barcodeProduct: step2.barcodeProduct,
      }
    case 'basic':
    case 'influencer':
    case 'influencerOtherSocialNetwork':
    case 'station':
    case 'train':
      return {}
  }
}
