import {Card, CardContent, Checkbox, Divider, FormControlLabel, useTheme} from '@mui/material'
import {_Details} from 'feature/Report/Details/Details'
import React, {useState} from 'react'
import {styleUtils} from 'core/theme/theme'
import {ReportDraft2} from 'core/model/ReportDraft'
import {
  DetailInput,
  DetailInputCheckbox,
  DetailInputDate,
  DetailInputDateNotInFuture,
  DetailInputRadio,
  DetailInputText,
  DetailInputTextarea,
  DetailInputTimeslot,
  DetailInputType,
} from '../../anomaly/Anomaly'
import {UploadedFile} from '../../client/file/UploadedFile'
import {DetailInputValue} from '../../client/report/Report'

export class DetailsFixtureInput {
  static readonly text: DetailInputText = {
    label: 'Texte label',
    type: DetailInputType.TEXT,
  }

  static readonly timeslot: DetailInputTimeslot = {
    label: 'Time',
    type: DetailInputType.TIMESLOT,
  }

  static readonly date: DetailInputDate = {
    label: 'Date label',
    type: DetailInputType.DATE,
    defaultValue: 'SYSDATE',
  }

  static readonly dateNotInFuture: DetailInputDateNotInFuture = {
    label: 'Date (not in future) label',
    type: DetailInputType.DATE_NOT_IN_FUTURE,
    defaultValue: 'SYSDATE',
  }

  static readonly dateWithNoDefault: DetailInputDate = {
    label: 'Date (without default to SYSDATE) label',
    type: DetailInputType.DATE,
  }

  static readonly radio: DetailInputRadio = {
    label: 'Radio label',
    type: DetailInputType.RADIO,
    options: ['OPTION1', 'OPTION2 (à préciser)'],
  }

  static readonly checkbox: DetailInputCheckbox = {
    label: 'Checkbox label',
    type: DetailInputType.CHECKBOX,
    options: ['CHECKBOX1', 'CHECKBOX2 (à préciser)', 'CHECKBOX3'],
  }

  static readonly textarea: DetailInputTextarea = {
    label: 'Description',
    type: DetailInputType.TEXTAREA,
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
    dateNotInFuture: DetailsFixtureInput.dateNotInFuture,
    dateWithNoDefault: DetailsFixtureInput.dateWithNoDefault,
    radio: DetailsFixtureInput.radio,
    checkbox: DetailsFixtureInput.checkbox,
    textarea: DetailsFixtureInput.textarea,
    timeslot: DetailsFixtureInput.timeslot,
  }
  const [picked, setPicked]: any = useState({
    text: true,
    date: true,
    dateNotInFuture: true,
    dateWithNoDefault: true,
    radio: true,
    checkbox: true,
    textarea: true,
    timeslot: true,
  })
  const inputs = Object.entries(picked)
    .filter(([k, v]) => !!v)
    .map(([k, v]) => (config as any)[k])
  const [resultInputs, setResultInputs] = useState<DetailInputValue[] | undefined>()
  const [resultFiles, setResultFiles] = useState<UploadedFile[] | undefined>()
  return (
    <>
      {Object.keys(config).map((key: any) => (
        <FormControlLabel
          key={key}
          control={<Checkbox checked={picked[key]} onChange={e => setPicked((_: any) => ({..._, [key]: e.target.checked}))} />}
          label={key}
        />
      ))}
      <Card elevation={2}>
        <CardContent>
          <_Details
            inputs={[...inputs]}
            onSubmit={(res, files) => {
              setResultInputs(ReportDraft2.parseDetails(res, inputs))
              setResultFiles(files)
            }}
          />
        </CardContent>
      </Card>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>
        {JSON.stringify(resultInputs, undefined, 2)}
      </pre>
      <Divider />
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>{JSON.stringify(resultFiles, undefined, 2)}</pre>
    </>
  )
}
