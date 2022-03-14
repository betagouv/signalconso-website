import React from 'react'
import {Page} from '../shared/Page/Page'
import {PlaygroundDetails} from '../feature/Playground/PlaygroundDetails'
import {PlaygroundCompany} from '../feature/Playground/PlaygroundCompany'
import {PlaygroundConsumer} from '../feature/Playground/PlaygroundConsumer'
import {PlaygroundConfirmation} from '../feature/Playground/PlaygroundConfirmation'

const Playground = () => {
  return (
    <Page size="small">
      {/*<PlaygroundDetails/>*/}
      {/*<PlaygroundCompany/>*/}
      {/*<PlaygroundConsumer/>*/}
      <PlaygroundConfirmation/>
    </Page>
  )
}

export default Playground
