import {Card, CardContent} from '@mui/material'
import {DetailInput, DetailInputType} from '@signal-conso/signalconso-api-sdk-js'
import {_Details, specifyKeyword} from 'feature/Report/Details/Details'
import React, {useState} from 'react'

export class DetailsFixtureInput {

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

export class DetailsFixtureValue {
  static readonly date = '10/11/2019'
  static readonly text = 'some text'
  static readonly radio = (specifyValue: string) => DetailsFixtureInput.radioDetail.options![1].replace(specifyKeyword, `(${specifyValue})`)
  static readonly checkbox = (specifyValue: string) => [DetailsFixtureInput.checkboxDetail.options![0], DetailsFixtureInput.checkboxDetail.options![1].replace(specifyKeyword,
    `(${specifyValue})`)]
  static readonly textarea = 'some other text'
}

export const PlaygroundDetails = () => {
  const inputs: DetailInput[] = [DetailsFixtureInput.dateDetail]
  const [state, setState] = useState<any>({})
  return (
    <Card elevation={2}>
      <CardContent>
        {JSON.stringify(state)}
        <_Details
          initialValues={[
            // DetailsFixtureValue.date,
            // DetailsFixtureValue.text,
            // DetailsFixtureValue.textarea,
            DetailsFixtureValue.radio('test'),
            // DetailsFixtureValue.checkbox('TEst'),
          ]}
          inputs={[
            // DetailsFixtureInput.dateDetail,
            // DetailsFixtureInput.textDetail,
            // DetailsFixtureInput.textareaDetail,
            DetailsFixtureInput.radioDetail,
            // DetailsFixtureInput.checkboxDetail,
          ]}
          onSubmit={setState}/>
      </CardContent>
    </Card>
  )
}
