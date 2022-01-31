import React, {useMemo} from 'react'
import {Alert, Txt} from 'mui-extension'
import {useReportFlowContext} from '../ReportFlowContext'
import {AnomalyClient, DetailInput, DetailInputType, FileOrigin, ReportDraft, ReportTag, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {ScDatepicker} from '../../../shared/Datepicker/Datepicker'
import {fnSwitch, mapFor} from '@alexandreannic/ts-utils/lib/common'
import {useI18n} from '../../../core/i18n'
import {Controller, useForm} from 'react-hook-form'
import {ReportFiles} from '../../../shared/UploadFile/ReportFiles'
import {StepperActions} from '../../../shared/Stepper/StepperActions'
import {FormLayout} from '../../../shared/FormLayout/FormLayout'
import {Animate} from '../../../shared/Animate/Animate'
import {Panel} from '../../../shared/Panel/Panel'
import {format, parse} from 'date-fns'
import {MenuItem} from '@mui/material'
import {ScRadioGroup, ScRadioGroupItem} from '../../../shared/RadioGroup'
import {ScSelect} from '../../../shared/Select/Select'
import {ScInput} from '../../../shared/Input/ScInput'
import {config} from '../../../conf/config'

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
  const _reportFlow = useReportFlowContext()
  const inputs = useMemo(() => {
    return getInputs({subcategories, tags})
  }, [subcategories, tags])
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<any>()

  return (
    <Animate animate={true}>
      <Panel>
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
            <Txt dangerouslySetInnerHTML={{__html: lastSubcategories.description}}/>
          </Alert>
        )}

        <br/>

        {inputs.map((input, i) => (
          <FormLayout
            label={<span dangerouslySetInnerHTML={{__html: input.label}}/>}
            required={!input.optionnal}
            key={i}
            sx={{
              mb: 3,
            }}
          >
            {(() => {
              const defaultControl = {control, name: '' + i}
              const errorMessage = errors[i]?.message
              const hasErrors = !!errors[i]
              const storedValue = draft.detailInputValues?.[i]?.value
              return fnSwitch(input.type, {
                  [DetailInputType.DATE_NOT_IN_FUTURE]: () => (
                    <Controller
                      {...defaultControl}
                      defaultValue={(input.defaultValue === 'SYSDATE' ? new Date() : input.defaultValue) ?? ''}
                      rules={{
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScDatepicker
                          {...field}
                          value={typeof field.value === 'string' ? new Date(field.value) : field.value}
                          // value={parse(field.value, config.reportDateFormat, new Date())}
                          // onChange={date => {
                          //   field.onChange(format(date, config.reportDateFormat))
                          // }}
                          fullWidth placeholder={input.placeholder}
                          max={format(new Date(), 'yyyy-MM-dd')}
                          helperText={errorMessage}
                          error={hasErrors}
                        />
                      )}
                    />
                  ),
                  [DetailInputType.DATE]: () => (
                    <Controller
                      {...defaultControl}
                      defaultValue={storedValue ?? (input.defaultValue === 'SYSDATE' ? new Date() : input.defaultValue) ?? ''}
                      rules={{
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScDatepicker
                          {...field}
                          value={typeof field.value === 'string' ? new Date(field.value) : field.value}
                          // value={parse(field.value, config.reportDateFormat, new Date())}
                          // onChange={date => {
                          //   field.onChange(format(date, config.reportDateFormat))
                          // }}
                          fullWidth
                          placeholder={input.placeholder}
                          helperText={errorMessage}
                          error={hasErrors}
                        />
                      )}/>
                  ),
                  [DetailInputType.TIMESLOT]: () => (
                    <Controller
                      {...defaultControl}
                      defaultValue={storedValue ?? input.defaultValue ?? ''}
                      rules={{
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScSelect
                          {...field}
                          fullWidth
                          placeholder={input.placeholder}
                          helperText={errorMessage}
                          error={hasErrors}
                        >
                          {mapFor(24, i =>
                            <MenuItem key={i} value={`de ${i}h à ${i + 1}h`}>
                              {m.timeFromTo(i, i + 1)}
                            </MenuItem>
                          )}
                        </ScSelect>
                      )}/>
                  ),
                  [DetailInputType.RADIO]: () => (
                    <Controller
                      {...defaultControl}
                      defaultValue={storedValue ?? input.defaultValue ?? ''}
                      rules={{
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScRadioGroup
                          {...field}
                          sx={{mt: 1}} dense
                          helperText={errorMessage}
                          error={hasErrors}
                        >
                          {input.options?.map((option, i) =>
                            <ScRadioGroupItem
                              key={option}
                              value={i}
                              title={<span dangerouslySetInnerHTML={{__html: option}}/>}
                            />
                          )}
                        </ScRadioGroup>
                      )}/>
                  ),
                  [DetailInputType.CHECKBOX]: () => (
                    <Controller
                      {...defaultControl}
                      defaultValue={storedValue ?? input.defaultValue ?? ''}
                      rules={{
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScRadioGroup
                          {...field}
                          helperText={errorMessage}
                          error={hasErrors}
                          sx={{mt: 1}} dense multiple
                        >
                          {input.options?.map(option =>
                            <ScRadioGroupItem
                              key={option}
                              value={option}
                              title={<span dangerouslySetInnerHTML={{__html: option}}/>}
                            />
                          )}
                        </ScRadioGroup>
                      )}
                    />
                  ),
                  [DetailInputType.TEXTAREA]: () => (
                    <Controller
                      {...defaultControl}
                      defaultValue={storedValue ?? input.defaultValue ?? ''}
                      rules={{
                        maxLength: {value: 500, message: ''},
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScInput
                          {...field}
                          helperText={errors[i]?.type === 'required' ? m.required : `${getValues('' + i)?.length ?? 0} / 500`}
                          error={hasErrors}
                          multiline
                          minRows={3} maxRows={8} fullWidth placeholder={input.placeholder}
                        />
                      )}
                    />
                  )
                }, () => (
                  <Controller
                    {...defaultControl}
                    defaultValue={storedValue ?? input.defaultValue ?? ''}
                    rules={{
                      maxLength: {value: 500, message: ''},
                      required: {value: true, message: m.required + ' *'},
                    }}
                    render={({field}) => (
                      <ScInput
                        {...field}
                        helperText={errorMessage}
                        error={hasErrors}
                        fullWidth
                        placeholder={input.placeholder}
                      />
                    )}
                  />
                )
              )
            })()}
          </FormLayout>
        ))}
        <Txt block sx={{mt: 2}}>{m.attachments}</Txt>
        <Txt color="hint" size="small" block gutterBottom dangerouslySetInnerHTML={{__html: m.attachmentsDesc}}/>
        <Alert dense type="info" gutterBottom deletable persistentDelete>
          <Txt size="small" dangerouslySetInnerHTML={{__html: m.attachmentsDesc2}}/>
        </Alert>

        <ReportFiles fileOrigin={FileOrigin.Consumer}/>

        <StepperActions next={(next) => {
          console.log('next', errors, getValues())
          handleSubmit((values: {[key: string]: any}) => {
            const detailInputValues = Object.entries(values).map(([index, value]) => ({label: inputs[+index].label, value}))
            _reportFlow.setReportDraft(_ => ({..._, detailInputValues}))
            next()
          })()
        }}/>
      </Panel>
    </Animate>
  )
}
