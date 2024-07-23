import {DetailsInner, SpecifyFormUtils} from '@/components_feature/reportFlow/Details/Details'
import {parseReportDetails} from '@/feature/reportUtils2'
import {getEntries, getKeys} from '@/utils/utils'
import {Checkbox} from '@codegouvfr/react-dsfr/Checkbox'
import {ChangeEvent, useState} from 'react'
import {
  DetailInputDate,
  DetailInputDateNotInFuture,
  DetailInputText,
  DetailInputTextarea,
  DetailInputTimeslot,
  DetailInputType,
} from 'shared/anomalies/Anomaly'
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

export const PlaygroundDetails = () => {
  const {currentLang} = useI18n()

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
    .map(([k]) => inputsConfig(currentLang)[k])

  const [resultInputs, setResultInputs] = useState<DetailInputValue[] | undefined>()
  const [resultFiles, setResultFiles] = useState<UploadedFile[] | undefined>()

  const checkboxOptions = getKeys(inputsConfig(currentLang)).map(inputType => ({
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
      <div className="border border-dashed p-4 mb-8 bg-gray-100">
        <Checkbox legend="Configuration des inputs à afficher" options={checkboxOptions} orientation="horizontal" />
      </div>
      <DetailsInner
        inputs={[...chosenInputs]}
        transmissionStatus={'NOT_TRANSMITTABLE'}
        onSubmit={(res, files) => {
          setResultInputs(parseReportDetails(res, chosenInputs))
          setResultFiles(files)
        }}
        stepNavigation={dummyStepNavigation}
        consumerWish={undefined}
      />
      <pre className="text-sm text-gray-500">{JSON.stringify(resultInputs, undefined, 2)}</pre>
      <pre className="text-sm text-gray-500">{JSON.stringify(resultFiles, undefined, 2)}</pre>
    </>
  )
}
