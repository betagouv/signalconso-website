'use client'

import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {PlaygroundAcknowledgment} from '@/components_feature/playgroundComponents/PlaygroundAcknoledgment'
import {PlaygroundCompany} from '@/components_feature/playgroundComponents/PlaygroundCompany'
import {PlaygroundConfirmation, dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'
import {PlaygroundConsumer} from '@/components_feature/playgroundComponents/PlaygroundConsumer'
import {PlaygroundDetails} from '@/components_feature/playgroundComponents/PlaygroundDetails'
import {PlaygroundOther} from '@/components_feature/playgroundComponents/PlaygroundOther'
import {CompanyFilled} from '@/components_feature/reportFlow/Company/Company'
import {ContentPageContainer} from '@/components_simple/PageContainers'

import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import {CompanyKinds, companyKinds} from '../../anomalies/Anomaly'
import {AcknowledgmentCases, AcknowledgementInner} from '../reportFlow/Acknowledgement/Acknowledgement'


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

export const playgroundTestCases = [
  'details',
  'company',
  'company_siret',
  'company_website',
  'company_merchant_website',
  'company_transporter_website',
  'company_phone',
  'company_location',
  'company_social',
  'company_product',
  'companyFilled',
  'consumer',
  'confirmation',
  'acknowledgment_ReponseConso',
  'acknowledgment_EmployeeReport',
  'acknowledgment_ForeignCompany_Espagne',
  'acknowledgment_ForeignCompany_Suisse',
  'acknowledgment_ForeignCompany_Andorre',
  'acknowledgment_ForeignCompany_Argentine',
  'acknowledgment_FrenchCompanyWithoutSIRET',
  'acknowledgment_ContractualDisputeWithSIRET',
  'acknowledgment_Default',
  'other',
] as const
export type PlaygroundTestCase = (typeof playgroundTestCases)[number]

const Playground = () => {
  const navigation = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const tabParam = (searchParams.get('testcase') || 'details') as PlaygroundTestCase
  const companyKindParam = (searchParams.get('companykind') || 'SIRET') as CompanyKinds

  const navigateTo = (newTabParam: PlaygroundTestCase, companyKind?: CompanyKinds) => {
    let newUrl = `${pathname}?testcase=${newTabParam}`
    if (companyKind) {
      newUrl += `&companykind=${companyKind}`
    }
    console.log('navigation', newUrl)

    navigation.push(newUrl)
  }

  const renderLinks = () => {
    return playgroundTestCases.map(testCase => (
      <li key={testCase} onClick={() => navigateTo(testCase)}>
        {testCase.replace(/_/g, ' ')} {/* Remplace les underscores par des espaces pour l'affichage */}
      </li>
    ));
  };

  const renderComponent = () => {
    console.log('Current tabParam:', tabParam);

    let acknowledgmentCaseValue;
  switch (tabParam) {
    case 'acknowledgment_ReponseConso':
      acknowledgmentCaseValue = AcknowledgmentCases.ReponseConso;
      break;
    case 'acknowledgment_EmployeeReport':
      acknowledgmentCaseValue = AcknowledgmentCases.EmployeeReport;
      break;
    case 'acknowledgment_ForeignCompany_Espagne':
      acknowledgmentCaseValue = AcknowledgmentCases.ForeignCompany;
      break;
    case 'acknowledgment_ForeignCompany_Suisse':
      acknowledgmentCaseValue = AcknowledgmentCases.ForeignCompany;
      break;
    case 'acknowledgment_ForeignCompany_Andorre':
      acknowledgmentCaseValue = AcknowledgmentCases.ForeignCompany;
      break;
    case 'acknowledgment_ForeignCompany_Argentine':
      acknowledgmentCaseValue = AcknowledgmentCases.ForeignCompany;
      break;
    case 'acknowledgment_FrenchCompanyWithoutSIRET':
      acknowledgmentCaseValue = AcknowledgmentCases.FrenchCompanyWithoutSIRET;
      break;
    case 'acknowledgment_ContractualDisputeWithSIRET':
      acknowledgmentCaseValue = AcknowledgmentCases.ContractualDisputeWithSIRET;
      break;
    case 'acknowledgment_Default':
      acknowledgmentCaseValue = AcknowledgmentCases.Default;
      break;
    default:
      acknowledgmentCaseValue = AcknowledgmentCases.Default;
  }
    switch (tabParam) {
      case 'details':
        return <PlaygroundDetails />
      case 'company':
        return <PlaygroundCompany companyKind={companyKindParam} />
      case 'company_siret':
        return <PlaygroundCompany companyKind='SIRET'/>
      case 'company_website':
        return <PlaygroundCompany companyKind='WEBSITE'/>
      case 'company_merchant_website':
        return <PlaygroundCompany companyKind='MERCHANT_WEBSITE'/>
      case 'company_transporter_website':
        return <PlaygroundCompany companyKind='TRANSPORTER_WEBSITE'/>
      case 'company_phone':
        return <PlaygroundCompany companyKind='PHONE'/>
      case 'company_location':
        return <PlaygroundCompany companyKind='LOCATION'/>
      case 'company_social':
        return <PlaygroundCompany companyKind='SOCIAL'/>
      case 'company_product':
        return <PlaygroundCompany companyKind='PRODUCT'/>                                                        
      case 'companyFilled':
        return <CompanyFilled draft={{companyDraft}} onClear={console.log} stepNavigation={dummyStepNavigation} />
      case 'consumer':
        return <PlaygroundConsumer />
      case 'confirmation':
        return <PlaygroundConfirmation />

        case 'acknowledgment_ReponseConso':
          case 'acknowledgment_EmployeeReport':
          case 'acknowledgment_ForeignCompany_Espagne':
          case 'acknowledgment_ForeignCompany_Suisse':
          case 'acknowledgment_ForeignCompany_Andorre':
          case 'acknowledgment_ForeignCompany_Argentine':
          case 'acknowledgment_FrenchCompanyWithoutSIRET':
          case 'acknowledgment_ContractualDisputeWithSIRET':
          case 'acknowledgment_Default':
            return <PlaygroundAcknowledgment acknowledgmentCase={acknowledgmentCaseValue} />;
                                                                        
      case 'other':
        return <PlaygroundOther />
      default:
        return null
    }
  }

  return (
    <ContentPageContainer>
      <ul>
        {/* <li onClick={() => navigateTo('details')}>Details</li> */}
        {renderLinks()}
        {/* <li onClick={() => navigateTo('companyFilled')}>companyFilled</li>
        <li onClick={() => navigateTo('consumer')}>Consumer</li>
        <li onClick={() => navigateTo('confirmation')}>Confirmation</li>
        <li onClick={() => navigateTo('acknowledgment_ReponseConso')}>Acknowledgment</li>
        <li onClick={() => navigateTo('other')}>Other</li> */}
      </ul>
      {renderComponent()}
    </ContentPageContainer>
  )
}

export default Playground
