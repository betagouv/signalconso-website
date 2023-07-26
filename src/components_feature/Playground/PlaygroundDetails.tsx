import {Checkbox} from '@codegouvfr/react-dsfr/Checkbox'
import {useTheme} from '@mui/material'
import {DetailsInner} from 'components_feature/Report/Details/Details'
import {styleUtils} from 'core/theme'
import {ReportDraft2} from 'model/ReportDraft2'
import {ChangeEvent, useState} from 'react'
import {getEntries, getKeys} from 'utils/utils'
import {
  DetailInputCheckbox,
  DetailInputDate,
  DetailInputDateNotInFuture,
  DetailInputRadio,
  DetailInputText,
  DetailInputTextarea,
  DetailInputTimeslot,
  DetailInputType,
} from '../../anomalies/Anomaly'
import {DetailInputValue} from '../../model/CreatedReport'
import {UploadedFile} from '../../model/UploadedFile'
import {dummyStepNavigation} from './PlaygroundConfirmation'

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

const inputsConfig = {
  text: DetailsFixtureInput.text,
  date: DetailsFixtureInput.date,
  dateNotInFuture: DetailsFixtureInput.dateNotInFuture,
  dateWithNoDefault: DetailsFixtureInput.dateWithNoDefault,
  radio: DetailsFixtureInput.radio,
  checkbox: DetailsFixtureInput.checkbox,
  textarea: DetailsFixtureInput.textarea,
  timeslot: DetailsFixtureInput.timeslot,
}

type InputType = keyof typeof inputsConfig

export const PlaygroundDetails = () => {
  const theme = useTheme()

  const [inputChoices, setInputChoices] = useState({
    text: true,
    date: true,
    dateNotInFuture: true,
    dateWithNoDefault: true,
    radio: true,
    checkbox: true,
    textarea: true,
    timeslot: true,
  })
  const chosenInputs = getEntries(inputChoices)
    .filter(([, v]) => !!v)
    .map(([k]) => inputsConfig[k])

  const [resultInputs, setResultInputs] = useState<DetailInputValue[] | undefined>()
  const [resultFiles, setResultFiles] = useState<UploadedFile[] | undefined>()

  const checkboxOptions = getKeys(inputsConfig).map(inputType => ({
    label: inputType,
    nativeInputProps: {
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setInputChoices(_ => ({..._, [inputType]: e.target.checked}))
      },
      checked: inputChoices[inputType],
    },
  }))

  return (
    <>
      <Checkbox legend="Configuration des inputs à afficher" options={checkboxOptions} orientation="horizontal" />
      <hr className="border-t-2 border-black border-solid bg-none" />
      <DetailsInner
        inputs={[...chosenInputs]}
        onSubmit={(res, files) => {
          setResultInputs(ReportDraft2.parseDetails(res, chosenInputs))
          setResultFiles(files)
        }}
        stepNavigation={dummyStepNavigation}
        consumerWish={undefined}
      />
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>
        {JSON.stringify(resultInputs, undefined, 2)}
      </pre>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>{JSON.stringify(resultFiles, undefined, 2)}</pre>
    </>
  )
}
