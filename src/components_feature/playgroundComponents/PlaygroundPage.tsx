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
import {useMemo, useState, useEffect} from 'react'
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

const generalLinks = ['details', 'companyFilled', 'consumer', 'confirmation', 'other']

const companyLinks = [
  'company_siret',
  'company_website',
  'company_merchant_website',
  'company_transporter_website',
  'company_phone',
  'company_location',
  'company_social',
  'company_product',
]

const acknowledgmentLinks = [
  'acknowledgment_ReponseConso',
  'acknowledgment_EmployeeReport',
  'acknowledgment_ForeignCompany_Espagne',
  'acknowledgment_ForeignCompany_Suisse',
  'acknowledgment_ForeignCompany_Andorre',
  'acknowledgment_ForeignCompany_Argentine',
  'acknowledgment_FrenchCompanyWithoutSIRET',
  'acknowledgment_ContractualDisputeWithSIRET',
  'acknowledgment_Default',
]

export const playgroundTestCases = [
  'details',
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

  const tabParam = searchParams.get('testcase') as PlaygroundTestCase | null
  const companyKindParam = (searchParams.get('companykind') || 'SIRET') as CompanyKinds
  const [showLinks, setShowLinks] = useState(!tabParam)

  const navigateTo = (newTabParam: PlaygroundTestCase, companyKind?: CompanyKinds) => {
    let newUrl = `${pathname}?testcase=${newTabParam}`
    if (companyKind) {
      newUrl += `&companykind=${companyKind}`
    }
    console.log('navigation', newUrl)

    navigation.push(newUrl)
    setShowLinks(false)
  }

  const renderLinks = (links: any[]) => {
    return links.map(testCase => (
      <li key={testCase} onClick={() => navigateTo(testCase)} className="list-none cursor-pointer hover:text-blue-500">
        {testCase.replace(/_/g, ' ')}
      </li>
    ))
  }

  const renderComponent = () => {
    switch (tabParam) {
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
  const handleBackClick = () => {
    setShowLinks(true)
    navigation.push(pathname)
  }

  // const renderBackButton = () => (
  //   <button onClick={handleBackClick}>Retour</button>
  // );

  return (
    <ContentPageContainer>
      <h1>Playground</h1>

      {!showLinks && <Button onClick={handleBackClick}>Retour</Button>}

      {showLinks ? (
        <div>
          <p>Les liens ci-dessous permettent de naviguer vers les différentes sections du menu Playground.</p>
          <div className="flex mt-4">
            <div className="flex-1">
              <h5>Général</h5>
              <ul>{renderLinks(generalLinks)}</ul>
            </div>
            <div className="flex-1">
              <h5>Company</h5>
              <ul>{renderLinks(companyLinks)}</ul>
            </div>
            <div className="flex-1">
              <h5>Acknowledgment</h5>
              <ul>{renderLinks(acknowledgmentLinks)}</ul>
            </div>
          </div>
        </div>
      ) : (
        renderComponent()
      )}
    </ContentPageContainer>
  )
}

export default Playground
