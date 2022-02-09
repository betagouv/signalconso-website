import {_Details} from '../feature/Report/Details/Details'
import {Page} from '../shared/Page/Page'
import {Card, CardContent} from '@mui/material'
import {DetailInput, DetailInputType} from '../../../signalconso-api-sdk-js'

export class DetailsFixture {

  static readonly textDetail: DetailInput = {
    label: 'texte label',
    rank: 1,
    type: DetailInputType.TEXT
  }

  static readonly dateDetail: DetailInput = {
    label: 'date label',
    rank: 2,
    type: DetailInputType.DATE_NOT_IN_FUTURE,
    defaultValue: 'SYSDATE'
  }

  static readonly radioDetail: DetailInput = {
    label: 'radio label',
    rank: 3,
    type: DetailInputType.RADIO,
    options: ['OPTION1', 'OPTION2 (à préciser)']
  }

  static readonly checkboxDetail: DetailInput = {
    label: 'checkbox label',
    rank: 5,
    type: DetailInputType.CHECKBOX,
    options: ['CHECKBOX1', 'CHECKBOX2 (à préciser)', 'CHECKBOX3']
  }

  static readonly textareaDetail: DetailInput = {
    label: 'description',
    rank: 4,
    type: DetailInputType.TEXTAREA
  }
}

export default () => {
  const inputs: DetailInput[] = [DetailsFixture.radioDetail]
  return (
    <Page>
      <Card elevation={2}>
        <CardContent>
          <_Details inputs={inputs}/>
        </CardContent>
      </Card>
    </Page>
  )
}
