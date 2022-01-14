import React, {useMemo} from 'react'
import {Alert, Txt} from 'mui-extension'
import {useReportFlowContext} from '../ReportFlowContext'
import {AnomalyClient, DetailInput, DetailInputType, ReportTag, Subcategory} from '../../../../../signalconso-api-sdk-js'
import {ScInput} from '../../../shared/Input/ScInput'
import {Box, MenuItem} from '@mui/material'
import {ScDatepicker} from '../../../shared/Datepicker/Datepicker'
import {ScSelect} from '../../../shared/Select/Select'
import {mapFor} from '@alexandreannic/ts-utils/lib/common'
import {useI18n} from '../../../core/i18n'
import {ScRadioGroupItem} from '../../../shared/RadioGroup/RadioGroupItem'
import {ScRadioGroup} from '../../../shared/RadioGroup/RadioGroup'
import {ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {format} from 'date-fns'
import {Controller, useForm} from 'react-hook-form'

const reponseConsoQuestion = {
  label: 'Votre question',
  type: DetailInputType.TEXTAREA,
}

const defaultDetailInputs: DetailInput[] = [
  {
    label: 'Description',
    type: DetailInputType.TEXTAREA
  },
  {
    label: 'Date du constat',
    type: DetailInputType.DATE,
    defaultValue: 'SYSDATE'
  }
]

const getInputs = ({subcategories, tags}: {subcategories: Subcategory[], tags?: ReportTag[]}): DetailInput[] => {
  const lastSubcategories = subcategories[subcategories.length - 1]
  const res: DetailInput[] = []
  if (AnomalyClient.instanceOfSubcategoryInput(lastSubcategories)) {
    res.push(...lastSubcategories.detailInputs)
    if (!lastSubcategories.detailInputs.some(_ => _.type === DetailInputType.TEXTAREA)) {
      res.push({
        label: 'Description',
        type: DetailInputType.TEXTAREA,
        optionnal: true
      })
    }
  } else {
    res.push(...defaultDetailInputs)
  }
  if (tags?.includes(ReportTag.ReponseConso)) {
    res.push(reponseConsoQuestion)
  }
  return res
}

interface Props {
  draft: Readonly<Partial<ReportDraft>>
  subcategories: Subcategory[]
  tags: ReportTag[]
  employeeConsumer: boolean
}

export const Details = () => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  if (!draft.subcategories || draft.employeeConsumer === undefined) {
    return (
      <>{JSON.stringify(draft)}</>
    )
  }
  return (
    <DetailsWithRequiredProps draft={draft} employeeConsumer={draft.employeeConsumer} subcategories={draft.subcategories} tags={draft.tags ?? []}/>
  )
}

const DetailsWithRequiredProps = ({draft, subcategories, tags, employeeConsumer}: Props) => {
  const lastSubcategories = subcategories[subcategories.length - 1]
  const {m} = useI18n()
  const inputs = useMemo(() => {
    return getInputs({subcategories, tags})
  }, [subcategories, tags])
  const {
    control,
    register,
    getValues,
    handleSubmit
  } = useForm<any>({mode: 'onChange'})

  console.log(getValues())
  return (
    <>
      <Alert gutterBottom type="warning">
        {ReportDraft.isTransmittableToPro({tags, employeeConsumer}) ? (
          <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittable}}/>
        ) : (
          <>
            <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaNotTransmittable}}/><br/>
            <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaEmployeeConsumer}}/>
          </>
        )}
      </Alert>
      {(tags ?? []).includes(ReportTag.ProduitDangereux) && (
        <Alert type="info" gutterBottom>
          En cas d'une urgence vitale ou importante, appelez le <b>112</b>.
          <br/>
          Si vous êtes blessé ou souffrant, appelez le Samu: <b>15</b>.
          <br/>
          Si vous subissez ou vous avez subi une agression ou des violences, appelez Police Secours: <b>17</b>.
          <br/>
          En cas d'incendie ou d'une fuite de gaz, appelez les pompiers: <b>18</b>.
          <br/>
          Si vous êtes sourd ou malentendant, contactez le <b>114</b> par visiophonie, par chat, par SMS ou par FAX.
          <br/>
          Ces numéros sont joignables 24H/24 et 7J/7.
          <br/>
          <br/>
          Plus d'informations sur<br/>
          <a href="https://www.gouvernement.fr/risques/connaitre-les-numeros-d-urgence">https://www.gouvernement.fr/risques/connaitre-les-numeros-d-urgence</a>
        </Alert>
      )}

      {lastSubcategories.description && (
        <Alert type="info">
          {lastSubcategories.description}
        </Alert>
      )}

      {inputs.map((input, i) => (
        <Box key={i} sx={{
          mb: 3,
        }}>
          <Txt dangerouslySetInnerHTML={{__html: input.label}} block/>
          <Controller
            name={input.label}
            defaultValue={(input.defaultValue === 'SYSDATE' ? new Date() : input.defaultValue) ?? ''}
            control={control}
            rules={{
              required: {value: !input.optionnal, message: m.required},
              ...(input.type === DetailInputType.TEXTAREA ? {minLength: {value: 8, message: m.limitTo500chars}} : {}),
            }}
            render={({field}) => (
              (() => {
                switch (input.type) {
                  case DetailInputType.DATE_NOT_IN_FUTURE: {
                    return (
                      <ScDatepicker
                        {...field}
                        fullWidth placeholder={input.placeholder}
                        max={format(new Date(), 'yyyy-MM-dd')}/>
                    )
                  }
                  case DetailInputType.DATE: {
                    return (
                      <ScDatepicker {...field} fullWidth placeholder={input.placeholder}/>
                    )
                  }
                  case DetailInputType.TIMESLOT: {
                    return (
                      <ScSelect {...field} fullWidth placeholder={input.placeholder}>
                        {mapFor(24, i =>
                          <MenuItem key={i} value={`de ${i}h à ${i + 1}h`}>
                            {m.timeFromTo(i, i + 1)}
                          </MenuItem>
                        )}
                      </ScSelect>
                    )
                  }
                  case DetailInputType.RADIO: {
                    return (
                      <ScRadioGroup {...field} sx={{mt: 1}} dense>
                        {input.options?.map(option =>
                          <ScRadioGroupItem
                            key={option}
                            value={option}
                            title={<span dangerouslySetInnerHTML={{__html: option}}/>}
                          />
                        )}
                      </ScRadioGroup>
                    )
                  }
                  case DetailInputType.CHECKBOX: {
                    return (
                      <ScRadioGroup {...field} sx={{mt: 1}} dense multiple>
                        {input.options?.map(option =>
                          <ScRadioGroupItem
                            key={option}
                            value={option}
                            title={<span dangerouslySetInnerHTML={{__html: option}}/>}
                          />
                        )}
                      </ScRadioGroup>
                    )
                  }
                  case DetailInputType.TEXTAREA: {
                    return (
                      <ScInput
                        {...field}
                        multiline
                        minRows={3} maxRows={8} fullWidth placeholder={input.placeholder}
                        helperText={`0 / 100`}/>
                    )
                  }
                  default: {
                    return (
                      <ScInput {...field} fullWidth placeholder={input.placeholder}/>
                    )
                  }
                }
              })()
            )}
          />
        </Box>
      ))}
    </>
  )
}
