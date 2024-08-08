import {CompanySearchResult, isGovernmentCompany} from '@/model/Company'
import {Report} from '@/model/Report'
import {appliedSpecialLegislation} from '@/model/SpecialLegislation'
import {Step2Model} from '@/model/Step2Model'
import {ReportTag} from 'shared/anomalies/Anomaly'
import {CompanyRecapRaw, CompanyRecapRawProps} from './CompanyRecapRaw'
import {buildBrandName} from './companyNameUtils'

export function CompanyRecapFromStep2({step2, tags}: {step2: Report['step2']; tags: ReportTag[]}) {
  // this doesn't display all the step2 variations
  // only whatever concerns the company + phone/website/product
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
    vendor,
  } = buildMainFields(step2, tags)
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
        vendor,
      }}
    />
  )
}

export function CompanyRecapFromSearchResult({company, tags}: {company: CompanySearchResult; tags: ReportTag[]}) {
  const {siret, name, commercialName, brand, address, activityLabel, isHeadOffice, isGovernment, specialLegislation, closed} =
    buildMainFieldsFromSearchResult(company, tags)
  const website = undefined
  const phone = undefined
  const barcodeProduct = undefined
  const vendor = undefined
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
        vendor,
      }}
    />
  )
}

function buildMainFields(
  step2: Step2Model,
  tags: ReportTag[],
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
    vendor: undefined,
  }
  switch (step2.kind) {
    case 'basic':
    case 'phone':
    case 'product':
    case 'website':
      const companyIdentification = step2.companyIdentification
      switch (companyIdentification.kind) {
        case 'companyFound': {
          const {company} = companyIdentification
          return buildMainFieldsFromSearchResult(company, tags)
        }
        case 'marketplaceCompanyFound': {
          const {company, vendor} = companyIdentification
          return {...buildMainFieldsFromSearchResult(company, tags), vendor}
        }
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
  tags: ReportTag[],
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
    specialLegislation: appliedSpecialLegislation(company, tags),
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
