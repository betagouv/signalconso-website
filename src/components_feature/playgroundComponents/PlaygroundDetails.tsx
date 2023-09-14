import {Checkbox} from '@codegouvfr/react-dsfr/Checkbox'
import {useTheme} from '@mui/material'
import {DetailsInner, SpecifyFormUtils} from 'components_feature/reportFlow/Details/Details'
import {styleUtils} from 'core/theme'
import {ReportDraft2} from 'model/ReportDraft2'
import {ChangeEvent, useState} from 'react'
import {getEntries, getKeys} from 'utils/utils'
import {
  DetailInputDate,
  DetailInputDateNotInFuture,
  DetailInputText,
  DetailInputTextarea,
  DetailInputTimeslot,
  DetailInputType,
} from '../../anomalies/Anomaly'
import {useI18n} from '../../i18n/I18n'
import {AppLang, AppLangs} from '../../i18n/localization/AppLangs'
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
    label: 'Date label (defaults to SYSDATE)',
    type: DetailInputType.DATE,
    defaultValue: 'SYSDATE',
  }

  static readonly dateNotInFuture: DetailInputDateNotInFuture = {
    label: 'Date label (defaults to SYSDATE, not in future)',
    type: DetailInputType.DATE_NOT_IN_FUTURE,
    defaultValue: 'SYSDATE',
  }

  static readonly dateWithNoDefault: DetailInputDate = {
    label: 'Date label (without default to SYSDATE)',
    type: DetailInputType.DATE,
  }

  static readonly radio = (lang: AppLang) => {
    return {
      label: 'Radio label',
      type: DetailInputType.RADIO,
      options: [
        'OPTION1',
        `OPTION2 ${lang === AppLangs.fr ? SpecifyFormUtils.specifyKeywordFr : SpecifyFormUtils.specifyKeywordEn}`,
      ],
    }
  }

  static readonly checkbox = (lang: AppLang) => {
    return {
      label: 'Checkbox label',
      type: DetailInputType.CHECKBOX,
      options: [
        'CHECKBOX1',
        `CHECKBOX2 ${lang === AppLangs.fr ? SpecifyFormUtils.specifyKeywordFr : SpecifyFormUtils.specifyKeywordEn}`,
        'CHECKBOX3',
      ],
    }
  }

  static readonly textarea: DetailInputTextarea = {
    label: 'Description',
    type: DetailInputType.TEXTAREA,
  }
}

const inputsConfig = (lang: AppLang) => {
  return {
    text: DetailsFixtureInput.text,
    date: DetailsFixtureInput.date,
    dateNotInFuture: DetailsFixtureInput.dateNotInFuture,
    dateWithNoDefault: DetailsFixtureInput.dateWithNoDefault,
    radio: DetailsFixtureInput.radio(lang),
    checkbox: DetailsFixtureInput.checkbox(lang),
    textarea: DetailsFixtureInput.textarea,
    timeslot: DetailsFixtureInput.timeslot,
  }
}

type InputType = keyof typeof inputsConfig

export const PlaygroundDetails = () => {
  const theme = useTheme()
  const {currentLang} = useI18n()

  const [inputChoices, setInputChoices] = useState({
    text: true,
    date: true,
    dateNotInFuture: false,
    dateWithNoDefault: false,
    radio: true,
    checkbox: true,
    textarea: true,
    timeslot: false,
  })
  const chosenInputs = getEntries(inputChoices)
    .filter(([, v]) => !!v)
    .map(([k]) => inputsConfig(currentLang)[k])

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
      <pre
        style={{
          fontSize: styleUtils(theme).fontSize.small,
          lineHeight: 1.3,
        }}
      >
        {JSON.stringify(resultFiles, undefined, 2)}
      </pre>
    </>
  )
}
