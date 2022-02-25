import React from 'react'
import {Page} from '../shared/Page/Page'
import {PlaygroundDetails} from '../feature/Playground/PlaygroundDetails'
import {PlaygroundCompany} from '../feature/Playground/PlaygroundCompany'

const Playground = () => {
  return (
    <Page>
      {/*<PlaygroundDetails/>*/}
      <PlaygroundCompany/>
    </Page>
  )
}

export default Playground
