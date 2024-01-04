'use client'

import {PlaygroundAcknowledgment} from '@/components_feature/playgroundComponents/PlaygroundAcknoledgment'
import {PlaygroundCompany} from '@/components_feature/playgroundComponents/PlaygroundCompany'
import {PlaygroundConfirmation, dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'
import {PlaygroundConsumer} from '@/components_feature/playgroundComponents/PlaygroundConsumer'
import {PlaygroundDetails} from '@/components_feature/playgroundComponents/PlaygroundDetails'
import {PlaygroundOther} from '@/components_feature/playgroundComponents/PlaygroundOther'
import {CompanyFilled} from '@/components_feature/reportFlow/Company/Company'
import {ContentPageContainer} from '@/components_simple/PageContainers'

import {usePathname, useSearchParams} from 'next/navigation'
import {AcknowledgmentCases} from '../reportFlow/Acknowledgement/Acknowledgement'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'

const companyDraft = {
  id: 'id12345',
  name: 'NomSociété',
  siret: '01234567890123',
  website: 'http://blabla.fr',
  phone: '0987654321',
  address: {
    number: '33',
    street: 'avenue des Entreprises',
    city: 'Nairobi',
    postalCode: '13006',
  },
  isHeadOffice: true,
  isPublic: true,
  isOpen: true,
}

const generalTestCases = ['details', 'companyFilled', 'consumer', 'confirmation', 'other'] as const

const companyTestCases = [
  'company_siret',
  'company_website',
  'company_merchant_website',
  'company_transporter_website',
  'company_phone',
  'company_location',
  'company_social',
  'company_product',
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
      case 'companyFilled':
        return <CompanyFilled draft={{companyDraft}} onClear={console.log} stepNavigation={dummyStepNavigation} />
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
      case 'acknowledgment_Default':
        return <PlaygroundAcknowledgment acknowledgmentCase={AcknowledgmentCases.Default} countryId="" />
      case 'other':
        return <PlaygroundOther />
      default:
        return null
    }
  }

  return (
    <ContentPageContainer>
      <h1>Playground</h1>

      {!testCase ? (
        <div>
          <p>Les liens ci-dessous permettent de reconstituer les situations décrites dans les déclarations des utilisateurs.</p>
          <div className="flex mt-4">
            <div className="flex-1">
              <h5>Général</h5>
              <ul>{renderLinks(generalTestCases)}</ul>
            </div>
            <div className="flex-1">
              <h5>Company</h5>
              <ul>{renderLinks(companyTestCases)}</ul>
            </div>
            <div className="flex-1">
              <h5>Acknowledgment</h5>
              <ul>{renderLinks(acknowledgmentTestCases)}</ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Button linkProps={{href: `${pathname}`}} className="mb-6">
            Retour
          </Button>
          {renderComponent()}
        </>
      )}
    </ContentPageContainer>
  )
}

export default Playground
