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

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CompanyKinds } from '../../anomalies/Anomaly';


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

const Playground = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedTabId, setSelectedTabId] = useState('details');
  const [selectedCompanyKind, setSelectedCompanyKind] = useState('SIRET');

  useEffect(() => {
    let tabParam = searchParams.get('testcase') || 'details';
    let companyKindParam = searchParams.get('companykind') || 'SIRET';

    setSelectedTabId(tabParam);
    setSelectedCompanyKind(companyKindParam);

    updateURL(tabParam, companyKindParam);
  }, [pathname, searchParams]);

  const updateURL = (tabId:string, companyKind:string) => {
    let newUrl = `${pathname}?testcase=${tabId}`;
    if (tabId === 'company') {
      newUrl += `&companykind=${companyKind}`;
    }
    history.pushState({}, '', newUrl);
  };

  const handleTabChange = (tabId:string) => {
    setSelectedTabId(tabId);
    updateURL(tabId, selectedCompanyKind);
  };

  const handleCompanyKindChange = (companyKind:string) => {
    setSelectedCompanyKind(companyKind);
    if (selectedTabId === 'company') {
      updateURL(selectedTabId, companyKind);
    }
  };

  return (
    <ContentPageContainer>
      <Tabs
        tabs={[
          { tabId: 'details', label: 'Details' },
          { tabId: 'company', label: 'Company' },
          { tabId: 'companyFilled', label: 'CompanyFilled' },
          { tabId: 'consumer', label: 'Consumer' },
          { tabId: 'confirmation', label: 'Confirmation' },
          { tabId: 'acknowledgment', label: 'Acknowledgment' },
          { tabId: 'other', label: 'Other' },
        ]}
        selectedTabId={selectedTabId}
        onTabChange={handleTabChange}
      >
        {selectedTabId === 'details' && <PlaygroundDetails />}
        {selectedTabId === 'company' && <PlaygroundCompany onCompanyKindChange={handleCompanyKindChange} />}
        {selectedTabId === 'companyFilled' && <CompanyFilled draft={{companyDraft}} onClear={console.log} stepNavigation={dummyStepNavigation} />}
        {selectedTabId === 'consumer' && <PlaygroundConsumer />}
        {selectedTabId === 'confirmation' && <PlaygroundConfirmation />}
        {selectedTabId === 'acknowledgment' && <PlaygroundAcknowledgment />}
        {selectedTabId === 'other' && <PlaygroundOther />}
      </Tabs>
    </ContentPageContainer>
  );
};

export default Playground;