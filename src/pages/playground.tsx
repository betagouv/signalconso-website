import {Tab, Tabs} from '@mui/material'
import {PlaygroundAcknowledgment} from 'components_feature/Playground/PlaygroundAcknoledgment'
import {PlaygroundCompany} from 'components_feature/Playground/PlaygroundCompany'
import {dummyStepNavigation, PlaygroundConfirmation} from 'components_feature/Playground/PlaygroundConfirmation'
import {PlaygroundConsumer} from 'components_feature/Playground/PlaygroundConsumer'
import {PlaygroundDetails} from 'components_feature/Playground/PlaygroundDetails'
import {PlaygroundDsfr} from 'components_feature/Playground/PlaygroundDsfr'
import {CompanyFilled} from 'components_feature/Report/Company/Company'
import {Page} from 'components_simple/Page/Page'
import React from 'react'
import {Fixture} from '../test/fixture'

const Playground = () => {
  const [value, setValue] = React.useState(0)

  const tabs = [
    {label: 'details', component: () => <PlaygroundDetails />},
    {label: 'company', component: () => <PlaygroundCompany />},
    {
      label: 'companyFilled',
      component: () => (
        <CompanyFilled
          draft={{
            companyDraft: {
              ...Fixture.genCompany(),
              website: 'http://blabla.fr',
              phone: '0987654321',
            },
          }}
          onClear={console.log}
          stepNavigation={dummyStepNavigation}
        />
      ),
    },
    {label: 'consumer', component: () => <PlaygroundConsumer />},
    {label: 'confirmation', component: () => <PlaygroundConfirmation />},
    {label: 'acknowledgment', component: () => <PlaygroundAcknowledgment />},
    {label: 'DSFR', component: () => <PlaygroundDsfr />},
  ]
  return (
    <>
      <Tabs centered value={value} onChange={(e, value) => setValue(value)}>
        {tabs.map(tab => (
          <Tab key={tab.label} label={tab.label} />
        ))}
      </Tabs>
      <Page maxWidth="small">{tabs[value].component()}</Page>
    </>
  )
}

export default Playground
