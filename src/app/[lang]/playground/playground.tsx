'use client'

import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {PlaygroundAcknowledgment} from 'components_feature/playground/PlaygroundAcknoledgment'
import {PlaygroundCompany} from 'components_feature/playground/PlaygroundCompany'
import {PlaygroundConfirmation, dummyStepNavigation} from 'components_feature/playground/PlaygroundConfirmation'
import {PlaygroundConsumer} from 'components_feature/playground/PlaygroundConsumer'
import {PlaygroundDetails} from 'components_feature/playground/PlaygroundDetails'
import {PlaygroundOther} from 'components_feature/playground/PlaygroundOther'
import {CompanyFilled} from 'components_feature/reportFlow/Company/Company'
import {ContentPageContainer} from 'components_simple/PageContainers'

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
  return (
    <ContentPageContainer>
      <Tabs
        tabs={[
          {label: 'details', content: <PlaygroundDetails />},
          {label: 'company', content: <PlaygroundCompany />},
          {
            label: 'companyFilled',
            content: <CompanyFilled draft={{companyDraft}} onClear={console.log} stepNavigation={dummyStepNavigation} />,
          },
          {label: 'consumer', content: <PlaygroundConsumer />},
          {label: 'confirmation', content: <PlaygroundConfirmation />},
          {label: 'acknowledgment', content: <PlaygroundAcknowledgment />},
          {label: 'other', content: <PlaygroundOther />},
        ]}
      />
    </ContentPageContainer>
  )
}

export default Playground
