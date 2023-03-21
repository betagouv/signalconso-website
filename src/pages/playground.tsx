import React from 'react'
import {Page} from 'components_simple/Page/Page'
import {CompanyFilled} from 'components_feature/Report/Company/Company'
import {PlaygroundAcknowledgment} from 'components_feature/Playground/PlaygroundAcknoledgment'
import {PlaygroundDetails} from 'components_feature/Playground/PlaygroundDetails'
import {PlaygroundConsumer} from 'components_feature/Playground/PlaygroundConsumer'
import {PlaygroundCompany} from 'components_feature/Playground/PlaygroundCompany'
import {dummyStepNavigation, PlaygroundConfirmation} from 'components_feature/Playground/PlaygroundConfirmation'
import {Fixture} from '../test/fixture'
import {Divider, Tab, Tabs} from '@mui/material'

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
  ]
  return (
    <Page maxWidth="small">
      <Tabs value={value} onChange={(e, value) => setValue(value)}>
        {tabs.map(tab => (
          <Tab key={tab.label} label={tab.label} />
        ))}
      </Tabs>
      <Divider sx={{mb: 3}} />
      {tabs[value].component()}
    </Page>
  )
}

export default Playground
