import React from 'react'
import {Page} from '../shared/Page/Page'
import {PlaygroundDetails} from '../feature/Playground/PlaygroundDetails'
import {PlaygroundCompany} from '../feature/Playground/PlaygroundCompany'
import {PlaygroundConsumer} from '../feature/Playground/PlaygroundConsumer'

const Playground = () => {
  return (
    <Page size="small">
      {/*<PlaygroundDetails/>*/}
      {/*<PlaygroundCompany/>*/}
      <PlaygroundConsumer/>
    </Page>
  )
}

export default Playground
