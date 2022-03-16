import {Card, CardContent, Checkbox, Divider, FormControlLabel, useTheme} from '@mui/material'
import {DetailInput, DetailInputType, DetailInputValue, UploadedFile} from '@signal-conso/signalconso-api-sdk-js'
import {_Details} from 'feature/Report/Details/Details'
import React, {useState} from 'react'
import {styleUtils} from '../../core/theme/theme'
import {DetailInputValues2, ReportDraft2} from '../../core/model/ReportDraft'
import {DraftReportDefaultInputs} from '../Report/Details/draftReportInputs'


export class DetailsFixtureInput {

  static readonly text: DetailInput = {
    label: 'Texte label',
    rank: 1,
    type: DetailInputType.TEXT
  }

  static readonly timeslot: DetailInput = {
    label: 'Time',
    rank: 2,
    type: DetailInputType.TIMESLOT,
    defaultValue: 'SYSDATE'
  }

  static readonly date: DetailInput = {
    label: 'Date label',
    rank: 2,
    type: DetailInputType.DATE_NOT_IN_FUTURE,
    defaultValue: 'SYSDATE'
  }

  static readonly radio: DetailInput = {
    label: 'Radio label',
    rank: 3,
    type: DetailInputType.RADIO,
    options: ['OPTION1', 'OPTION2 (à préciser)']
  }

  static readonly checkbox: DetailInput = {
    label: 'Checkbox label',
    rank: 5,
    type: DetailInputType.CHECKBOX,
    options: ['CHECKBOX1', 'CHECKBOX2 (à préciser)', 'CHECKBOX3']
  }

  static readonly textarea: DetailInput = {
    label: 'Description',
    rank: 4,
    type: DetailInputType.TEXTAREA
  }
}

export class DetailsFixtureValue {
  static readonly date = '10/11/2019'
  static readonly text = 'some text'
  static readonly radio = DetailsFixtureInput.radio.options![1]
  static readonly checkbox = [DetailsFixtureInput.checkbox.options![0], DetailsFixtureInput.checkbox.options![1]]
  static readonly textarea = 'some other text'
}

export const PlaygroundDetails = () => {
  const theme = useTheme()
  const config = {
    text: DetailsFixtureInput.text,
    date: DetailsFixtureInput.date,
    radio: DetailsFixtureInput.radio,
    checkbox: DetailsFixtureInput.checkbox,
    textarea: DetailsFixtureInput.textarea,
    timeslot: DetailsFixtureInput.timeslot,
  }
  const [picked, setPicked]: any = useState({
    text: true,
    date: true,
    radio: true,
    checkbox: true,
    textarea: true,
    timeslot: true,
  })
  const inputs = Object.entries(picked).filter(([k, v]) => !!v).map(([k, v]) => (config as any)[k])
  const [resultInputs, setResultInputs] = useState<DetailInputValue[] | undefined>()
  const [resultFiles, setResultFiles] = useState<UploadedFile[] | undefined>()
  return (
    <>
      {Object.keys(config).map((key: any) =>
        <FormControlLabel key={key} control={<Checkbox checked={picked[key]} onChange={e => setPicked((_: any) => ({..._, [key]: e.target.checked}))}/>} label={key}/>
      )}
      <Card elevation={2}>
        <CardContent>
          <_Details
            inputs={[
              // ...DraftReportDefaultInputs.defaults,
              ...inputs
            ]}
            onSubmit={(res, files) => {
              setResultInputs(ReportDraft2.parseDetails(res, inputs))
              setResultFiles(files)
            }}/>
        </CardContent>
      </Card>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.2}}>
        {JSON.stringify(resultInputs, undefined, 2)}
      </pre>
      <Divider/>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.2}}>
        {JSON.stringify(resultFiles, undefined, 2)}
      </pre>
    </>
  )
}
