import React, {useMemo} from 'react'
import {Alert, Txt} from 'mui-extension'
import {useReportFlowContext} from '../ReportFlowContext'
import {DetailInput, DetailInputType, DetailInputValue, FileOrigin, ReportDraft, ReportTag, SubcategoryInput} from '@signal-conso/signalconso-api-sdk-js'
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
import {DetailsAlertProduitDangereux} from './DetailsAlertProduitDangereux'
import {last} from '../../../core/lodashNamedExport'
import {getDraftReportInputs} from './draftReportInputs'
import {appConfig} from '../../../conf/appConfig'

interface Props {
  inputs: DetailInput[]
  onSubmit?: (values: DetailInputValue[]) => void
  initialValues?: (string | Date | string[])[]
  description?: string
  fileLabel?: string
  isTransmittable?: boolean
  tags?: ReportTag[]
}

export const precisionKeyword = '(à préciser)'

export const Details = () => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  const inputs = useMemo(() => {
    if (draft.subcategories) {
      return getDraftReportInputs({subcategories: draft.subcategories, tags: draft.tags})
    }
  }, [draft.subcategories, draft.tags])

  if (!inputs || draft.employeeConsumer === undefined) {
    return (
      <>{JSON.stringify(draft)}</>
    )
  }
  return (
    <_Details
      initialValues={draft.detailInputValues?.map(_ => _.value)}
      isTransmittable={ReportDraft.isTransmittableToPro(draft)}
      inputs={inputs}
      fileLabel={(last(draft.subcategories) as SubcategoryInput).fileLabel}
      tags={draft.tags ?? []}
      onSubmit={detailInputValues => _reportFlow.setReportDraft(_ => ({..._, detailInputValues}))}
    />
  )
}

const mapDateInput = ({value, onChange}: {value?: string, onChange: (_: string) => void}): {value?: Date, onChange: (_: Date) => void} => {
  return {
    value: value ? parse(value, appConfig.reportDateFormat, new Date()) : undefined,
    onChange: (_: Date) => onChange(format(_, appConfig.reportDateFormat))
  }
}

export const _Details = ({
  initialValues,
  inputs,
  fileLabel,
  tags,
  isTransmittable,
  description,
  onSubmit,
}: Props) => {
  const {m} = useI18n()
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
          {isTransmittable ? (
            <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittable}}/>
          ) : (
            <>
              <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaNotTransmittable}}/><br/>
              <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaEmployeeConsumer}}/>
            </>
          )}
        </Alert>
        {(tags ?? []).includes(ReportTag.ProduitDangereux) && (
          <DetailsAlertProduitDangereux/>
        )}

        {description && (
          <Alert type="info">
            <Txt dangerouslySetInnerHTML={{__html: description}}/>
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
              const storedValue = initialValues?.[i]
              return fnSwitch(input.type, {
                  [DetailInputType.DATE_NOT_IN_FUTURE]: () => (
                    <Controller
                      {...defaultControl}
                      defaultValue={storedValue ?? (input.defaultValue === 'SYSDATE' ? format(new Date(), appConfig.reportDateFormat) : input.defaultValue) ?? ''}
                      rules={{
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScDatepicker
                          {...field}
                          {...mapDateInput(field)}
                          // value={typeof field.value === 'string' ? new Date(field.value) : field.value}
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
                      defaultValue={storedValue ?? (input.defaultValue === 'SYSDATE' ? format(new Date(), appConfig.reportDateFormat) : input.defaultValue) ?? ''}
                      rules={{
                        required: {value: true, message: m.required + ' *'},
                      }}
                      render={({field}) => (
                        <ScDatepicker
                          {...field}
                          {...mapDateInput(field)}
                          // value={typeof field.value === 'string' ? new Date(field.value) : field.value}
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
                            <MenuItem onChange={(x: React.FormEvent<HTMLLIElement>) => console.log} key={i} value={`de ${i}h à ${i + 1}h`}>
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
                              value={option}
                              title={<span dangerouslySetInnerHTML={{__html: option}}/>}
                              description={
                                (field.value === option && option.includes(precisionKeyword))
                                  ? (<ScInput fullWidth placeholder={m.specify}/>)
                                  : undefined
                              }
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
                        type="text"
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
        <Txt block sx={{mt: 2}}>{fileLabel ?? m.attachments}</Txt>
        <Txt color="hint" size="small" block gutterBottom dangerouslySetInnerHTML={{__html: m.attachmentsDesc}}/>
        <Alert dense type="info" gutterBottom deletable persistentDelete>
          <Txt size="small" dangerouslySetInnerHTML={{__html: m.attachmentsDesc2}}/>
        </Alert>

        <ReportFiles fileOrigin={FileOrigin.Consumer}/>

        <StepperActions next={(next) => {
          handleSubmit((values: {[key: string]: any}) => {
            console.log('SUBMIT========================================================SUBMIT', values)
            onSubmit?.(Object.entries(values).map(([index, value]) => ({label: inputs[+index].label, value})))
            next()
          })()
        }}/>
      </Panel>
    </Animate>
  )
}
