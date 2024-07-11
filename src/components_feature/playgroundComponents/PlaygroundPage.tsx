'use client'

import {PlaygroundAcknowledgment} from '@/components_feature/playgroundComponents/PlaygroundAcknoledgment'
import {PlaygroundCompany} from '@/components_feature/playgroundComponents/PlaygroundCompany'
import {PlaygroundConfirmation, dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'
import {PlaygroundConsumer} from '@/components_feature/playgroundComponents/PlaygroundConsumer'
import {PlaygroundDetails} from '@/components_feature/playgroundComponents/PlaygroundDetails'
import {PlaygroundOther} from '@/components_feature/playgroundComponents/PlaygroundOther'
import {ContentPageContainer} from '@/components_simple/PageContainers'

import {BarcodeProduct} from '@/model/BarcodeProduct'
import {CompanyDraft, CompanySearchResult} from '@/model/Company'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {usePathname, useSearchParams} from 'next/navigation'
import {EngagementReviewPage, ResponseReviewPage} from '../ConsumerReview'
import {AcknowledgmentCases} from '../reportFlow/Acknowledgement/Acknowledgement'
import {CompanyFilled} from '../reportFlow/Company/CompanyFilled'

const companySearchResult: CompanySearchResult = {
  name: 'NomSociété',
  siret: '01234567890123',
  address: {
    number: '33',
    street: 'avenue des Entreprises',
    city: 'Nairobi',
    postalCode: '13006',
  },
  isHeadOffice: true,
  isPublic: true,
  isOpen: true,
  activityCode: '97.91B',
  activityLabel: 'vente a distance sur catalogue specialise',
  isMarketPlace: false,
}

const companyDraft: CompanyDraft = {
  ...companySearchResult,
  website: 'http://blabla.fr',
  phone: '0987654321',
}

const barcodeProduct: BarcodeProduct = {
  id: '2edf6be3-b072-46b5-955e-a893bf23bf3b',
  gtin: '3017620422003',
  siren: '803769827',
  productName: 'Nutella',
}

const generalTestCases = [
  'details',
  'companyFilled',
  'companyFilledWithProduct',
  'consumer',
  'confirmation',
  'response_review',
  'engagement_review',
  'other',
] as const

const companyTestCases = [
  'company_siret',
  'company_website',
  'company_merchant_website',
  'company_transporter_website',
  'company_phone',
  'company_location',
  'company_social',
  'company_product',
  'company_product_openff',
  'company_product_openff_product_found_but_no_company',
  'company_product_openff_product_not_found',
  'company_train',
  'company_station',
] as const

const acknowledgmentTestCases = [
  'acknowledgment_ReponseConso',
  'acknowledgment_EmployeeReport',
  'acknowledgment_ForeignCompany_Espagne',
  'acknowledgment_ForeignCompany_Suisse',
  'acknowledgment_ForeignCompany_Andorre',
  'acknowledgment_ForeignCompany_Argentine',
  'acknowledgment_FrenchCompanyWithoutSIRET',
  'acknowledgment_ContractualDisputeWithSIRET',
  'acknowledgment_PostReportHelper',
  'acknowledgment_Default',
] as const

export const playgroundTestCases = [...generalTestCases, ...companyTestCases, ...acknowledgmentTestCases]
export type PlaygroundTestCase = (typeof playgroundTestCases)[number]

const Playground = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const testCase = searchParams.get('testcase') as PlaygroundTestCase | null

  const renderLinks = (testCases: readonly PlaygroundTestCase[]) => {
    return testCases.map(testCase => (
      <li key={testCase} className="list-none cursor-pointer hover:text-blue-500 ">
        <Link href={`${pathname}?testcase=${testCase}`}> {testCase.replace(/_/g, ' ')} </Link>
      </li>
    ))
  }

  const renderComponent = () => {
    switch (testCase) {
      case 'details':
        return <PlaygroundDetails />
      case 'company_siret':
        return <PlaygroundCompany companyKind="SIRET" />
      case 'company_website':
        return <PlaygroundCompany companyKind="WEBSITE" />
      case 'company_merchant_website':
        return <PlaygroundCompany companyKind="MERCHANT_WEBSITE" />
      case 'company_transporter_website':
        return <PlaygroundCompany companyKind="TRANSPORTER_WEBSITE" />
      case 'company_phone':
        return <PlaygroundCompany companyKind="PHONE" />
      case 'company_location':
        return <PlaygroundCompany companyKind="LOCATION" />
      case 'company_social':
        return <PlaygroundCompany companyKind="SOCIAL" />
      case 'company_product':
        return <PlaygroundCompany companyKind="PRODUCT" />
      case 'company_product_openff':
        return (
          <PlaygroundCompany
            companyKind="PRODUCT_OPENFF"
            partialReportDraft={{
              openFf: {
                barcode: '3017620422003',
                product: {
                  id: 'b02541f4-1529-4706-9572-29fd62f91d01',
                  gtin: '3017620422003',
                  productName: 'Nutella',
                  siren: '803769827',
                },
                company: companySearchResult,
              },
            }}
          />
        )
      case 'company_product_openff_product_found_but_no_company':
        return (
          <PlaygroundCompany
            companyKind="PRODUCT_OPENFF"
            partialReportDraft={{
              openFf: {
                barcode: '5449000214911',
                product: {
                  id: '701df67c-a5a9-41ee-bc74-a5a918fe1595',
                  gtin: '5449000214911',
                  productName: 'Coca-cola',
                  siren: undefined,
                },
              },
            }}
          />
        )
      case 'company_product_openff_product_not_found':
        return (
          <PlaygroundCompany
            companyKind="PRODUCT_OPENFF"
            partialReportDraft={{
              openFf: {
                barcode: '123456',
              },
            }}
          />
        )
      case 'company_train':
        return <PlaygroundCompany companyKind="TRAIN" />
      case 'company_station':
        return <PlaygroundCompany companyKind="STATION" />
      case 'companyFilled':
        return <CompanyFilled draft={{companyDraft}} onClear={console.log} stepNavigation={dummyStepNavigation} />
      case 'companyFilledWithProduct':
        return <CompanyFilled draft={{companyDraft, barcodeProduct}} onClear={console.log} stepNavigation={dummyStepNavigation} />
      case 'consumer':
        return <PlaygroundConsumer />
      case 'confirmation':
        return <PlaygroundConfirmation />
      case 'acknowledgment_ReponseConso':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.ReponseConso} countryId="" />
      case 'acknowledgment_EmployeeReport':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.EmployeeReport} countryId="" />
      case 'acknowledgment_ForeignCompany_Espagne':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.ForeignCompany} countryId="ES" />
      case 'acknowledgment_ForeignCompany_Suisse':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.ForeignCompany} countryId="CH" />
      case 'acknowledgment_ForeignCompany_Andorre':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.ForeignCompany} countryId="AD" />
      case 'acknowledgment_ForeignCompany_Argentine':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.ForeignCompany} countryId="AR" />
      case 'acknowledgment_FrenchCompanyWithoutSIRET':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.FrenchCompanyWithoutSIRET} countryId="" />
      case 'acknowledgment_ContractualDisputeWithSIRET':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.ContractualDisputeWithSIRET} countryId="" />
      case 'acknowledgment_PostReportHelper':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.PostReportHelper} countryId="" />
      case 'acknowledgment_Default':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.Default} countryId="" />
      case 'response_review':
        return <ResponseReviewPage reportId="dummy" />
      case 'engagement_review':
        return <EngagementReviewPage reportId="dummy" />
      case 'other':
        return <PlaygroundOther />
      default:
        return null
    }
  }

  return (
    <ContentPageContainer>
      <h1 className="fr-h2">Playground</h1>

      {!testCase ? (
        <div>
          <p>
            Les liens ci-dessous permettent de tester les différents composants de l'interface sans avoir à refaire tout le
            parcours de signalement.
          </p>
          <div className="flex flex-col xl:flex-row mt-4">
            <div className="">
              <h5>Général</h5>
              <ul>{renderLinks(generalTestCases)}</ul>
            </div>
            <div className="">
              <h5>Company</h5>
              <ul>{renderLinks(companyTestCases)}</ul>
            </div>
            <div className="">
              <h5>Acknowledgment</h5>
              <ul>{renderLinks(acknowledgmentTestCases)}</ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Button linkProps={{href: `${pathname}`}} className="mb-6" iconId="ri-arrow-left-line" priority="secondary">
            Retour
          </Button>
          {renderComponent()}
        </>
      )}
    </ContentPageContainer>
  )
}

export default Playground
