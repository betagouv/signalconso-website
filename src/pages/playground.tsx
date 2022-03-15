import React from 'react'
import {Page} from '../shared/Page/Page'
import {CompanyFilled} from '../feature/Report/Company/Company'
import {genCompany} from '../test/fixture'
import {Acknowledgement} from '../feature/Report/Acknowledgement/Acknowledgement'

const Playground = () => {
  return (
    <Page size="small">
      {/*<PlaygroundDetails/>*/}
      {/*<PlaygroundCompany/>*/}
      {/*<PlaygroundConsumer/>*/}
      {/*<PlaygroundConfirmation/>*/}
      {/*<CompanyFilled draft={{*/}
      {/*  companyDraft: {*/}
      {/*    ...genCompany(),*/}
      {/*    website: 'http://blabla.fr',*/}
      {/*    phone: '0987654321',*/}
      {/*  }*/}
      {/*}} onClear={console.log}/>*/}
      <_Acknowledgement/>
    </Page>
  )
}

export default Playground
