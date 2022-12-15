import {MenuItem} from '@mui/material'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {Animate} from 'components_simple/Animate/Animate'
import {ScDatepickerFr} from 'components_simple/Datepicker/ScDatepickerFr'
import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {ScRadioGroupItem} from 'components_simple/RadioGroup/RadioGroupItem'
import {ScRadioGroup} from 'components_simple/RadioGroup/RadioGroup'
import {useReportFlowStepperContext} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_simple/ReportFlowStepper/ReportFlowStepperActions'
import {ScSelect} from 'components_simple/Select/Select'
import {ReportFiles} from 'components_simple/UploadFile/ReportFiles'
import {appConfig} from 'core/appConfig'
import {useI18n} from 'i18n/I18n'
import {DetailInputValues2} from 'model/ReportDraft2'
import {useEffect, useMemo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {ControllerProps} from 'react-hook-form/dist/types/controller'
import {last} from 'utils/lodashNamedExport'
import {dateToFrenchFormat, isDateInRange} from 'utils/utils'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {Alert} from '../../../alexlibs/mui-extension/Alert/Alert'
import {DetailInput, DetailInputType, ReportTag, SubcategoryInput} from '../../../anomalies/Anomaly'
import {ReportDraft} from '../../../model/ReportDraft'
import {FileOrigin, UploadedFile} from '../../../model/UploadedFile'
import {fnSwitch} from '../../../utils/FnSwitch'
import {mapNTimes} from '../../../utils/utils'
import {useReportFlowContext} from '../ReportFlowContext'
import {getDefaultValueFromInput, getOptionsFromInput, getPlaceholderFromInput} from './DetailInputsUtils'
import {DetailsAlertProduitDangereux} from './DetailsAlertProduitDangereux'
import {DetailsSpecifyInput} from './DetailsSpecifyInput'
import {getDraftReportInputs} from './draftReportInputs'

export class SpecifyFormUtils {
  static readonly keyword = '(à préciser)'
  static readonly getInputName = (index: number) => `${index}_specify`
}

export const isSpecifyInputName = (name: string) => name.includes('_specify')

export const Details = () => {
  const _reportFlow = useReportFlowContext()
  const _analytic = useAnalyticContext()
  const _stepper = useReportFlowStepperContext()
  const draft = _reportFlow.reportDraft
  const inputs = useMemo(() => {
    if (draft.subcategories) {
      return getDraftReportInputs({subcategories: draft.subcategories, tags: draft.tags})
    }
  }, [draft.subcategories, draft.tags, draft.forwardToReponseConso])

  useEffect(() => {
    _reportFlow.setReportDraft(_ => ({..._, details: undefined}))
  }, [draft.subcategories, draft.tags, draft.forwardToReponseConso])

  if (!inputs || draft.employeeConsumer === undefined) {
    throw new Error(`This step should not be accessible ${draft.employeeConsumer} - ${JSON.stringify(inputs)}`)
  }
  return (
    <_Details
      initialValues={draft.details}
      initialFiles={draft.uploadedFiles}
      isTransmittable={ReportDraft.isTransmittableToPro(draft)}
      inputs={inputs}
      fileLabel={(last(draft.subcategories) as SubcategoryInput).fileLabel}
      employeeConsumer={draft.employeeConsumer}
      contractualDispute={draft.contractualDispute}
      tags={draft.tags ?? []}
      onSubmit={(detailInputValues, uploadedFiles) => {
        _reportFlow.setReportDraft(_ => ({..._, uploadedFiles, details: detailInputValues}))
        _stepper.next()
        _analytic.trackEvent(EventCategories.report, ReportEventActions.validateDetails)
      }}
    />
  )
}

export const _Details = ({
  initialValues,
  initialFiles,
  inputs,
  fileLabel,
  tags,
  isTransmittable,
  contractualDispute,
  employeeConsumer,
  onSubmit,
}: {
  inputs: DetailInput[]
  onSubmit: (values: DetailInputValues2, files?: UploadedFile[]) => void
  initialValues?: DetailInputValues2
  initialFiles?: UploadedFile[]
  fileLabel?: string
  isTransmittable?: boolean
  contractualDispute?: boolean
  employeeConsumer?: boolean
  tags?: ReportTag[]
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<undefined | UploadedFile[]>()
  const {m} = useI18n()
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<DetailInputValues2>()

  useEffect(() => {
    if (initialValues) {
      const formValues = Object.keys(initialValues).reduce((acc, key) => ({...acc, [key]: initialValues[key] ?? ''}), {})
      reset(formValues)
    }
  }, [initialValues])

  useEffect(() => {
    if (initialFiles) setUploadedFiles(initialFiles)
  }, [initialFiles])

  return (
    <>
      <Animate autoScrollTo={false}>
        <Panel>
          <Alert gutterBottom type="warning">
            {isTransmittable ? (
              <>
                <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittable}} />
                {!contractualDispute && <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittableAnonymous}} />}
              </>
            ) : (
              <>
                <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaNotTransmittable}} />
                <br />
                {employeeConsumer && <span dangerouslySetInnerHTML={{__html: m.detailsTextAreaEmployeeConsumer}} />}
              </>
            )}
          </Alert>
          {(tags ?? []).includes('ProduitDangereux') && <DetailsAlertProduitDangereux />}

          <br />

          {inputs.map((input, inputIndex) => (
            <FormLayout
              label={<span dangerouslySetInnerHTML={{__html: input.label}} />}
              required={!input.optional}
              key={inputIndex}
              sx={{
                mb: 3,
              }}
            >
              {(() => {
                const controller = ({
                  defaultValue,
                  rules,
                  render,
                }: {
                  defaultValue?: string
                  rules?: ControllerProps<any, any>['rules']
                  render: ControllerProps<any, any>['render']
                }) => {
                  return (
                    <Controller
                      control={control}
                      name={'' + inputIndex}
                      defaultValue={defaultValue ?? getDefaultValueFromInput(input)}
                      rules={{
                        required: {value: !input.optional, message: m.required + ' *'},
                        ...rules,
                      }}
                      render={render}
                    />
                  )
                }
                const errorMessage = errors[inputIndex]?.message
                const hasErrors = !!errors[inputIndex]

                const renderDateVariant = ({max}: {max: string}) => {
                  const min = '01/01/1970'
                  return controller({
                    defaultValue: getDefaultValueFromInput(input) === 'SYSDATE' ? dateToFrenchFormat(new Date()) : undefined,
                    rules: {
                      validate: (d: string) => {
                        return isDateInRange(d, min, max) ? true : m.invalidDate
                      },
                    },
                    render: ({field}) => (
                      <ScDatepickerFr
                        {...field}
                        fullWidth
                        placeholder={getPlaceholderFromInput(input)}
                        min={min}
                        max={max}
                        helperText={errorMessage}
                        error={hasErrors}
                      />
                    ),
                  })
                }

                return fnSwitch(
                  input.type,
                  {
                    [DetailInputType.DATE_NOT_IN_FUTURE]: () =>
                      renderDateVariant({
                        max: dateToFrenchFormat(new Date()),
                      }),
                    [DetailInputType.DATE]: () =>
                      renderDateVariant({
                        max: '01/01/2100',
                      }),
                    [DetailInputType.TIMESLOT]: () =>
                      controller({
                        render: ({field}) => (
                          <ScSelect
                            {...field}
                            fullWidth
                            placeholder={getPlaceholderFromInput(input)}
                            helperText={errorMessage}
                            error={hasErrors}
                          >
                            {mapNTimes(24, i => (
                              <MenuItem key={i} value={`de ${i}h à ${i + 1}h`}>
                                {m.timeFromTo(i, i + 1)}
                              </MenuItem>
                            ))}
                          </ScSelect>
                        ),
                      }),
                    [DetailInputType.RADIO]: () =>
                      controller({
                        render: ({field}) => (
                          <ScRadioGroup {...field} sx={{mt: 1}} dense helperText={errorMessage} error={hasErrors}>
                            {getOptionsFromInput(input)?.map((option, i) => (
                              <ScRadioGroupItem
                                key={option}
                                value={option}
                                title={<span dangerouslySetInnerHTML={{__html: option}} />}
                                description={
                                  field.value === option && option.includes(SpecifyFormUtils.keyword) ? (
                                    <DetailsSpecifyInput
                                      control={control}
                                      error={errors[SpecifyFormUtils.getInputName(inputIndex)]}
                                      defaultValue={initialValues?.[SpecifyFormUtils.getInputName(inputIndex)]}
                                      name={SpecifyFormUtils.getInputName(inputIndex)}
                                    />
                                  ) : undefined
                                }
                              />
                            ))}
                          </ScRadioGroup>
                        ),
                      }),
                    [DetailInputType.CHECKBOX]: () =>
                      controller({
                        render: ({field}) => (
                          <ScRadioGroup {...field} multiple helperText={errorMessage} error={hasErrors} sx={{mt: 1}} dense>
                            {getOptionsFromInput(input)?.map(option => (
                              <ScRadioGroupItem
                                key={option}
                                value={option}
                                title={<span dangerouslySetInnerHTML={{__html: option}} />}
                                description={
                                  (field.value as string[] | undefined)?.includes(option) &&
                                  option.includes(SpecifyFormUtils.keyword) ? (
                                    <DetailsSpecifyInput
                                      control={control}
                                      error={errors[SpecifyFormUtils.getInputName(inputIndex)]}
                                      defaultValue={initialValues?.[SpecifyFormUtils.getInputName(inputIndex)]}
                                      name={SpecifyFormUtils.getInputName(inputIndex)}
                                    />
                                  ) : undefined
                                }
                              />
                            ))}
                          </ScRadioGroup>
                        ),
                      }),
                    [DetailInputType.TEXT]: () =>
                      controller({
                        rules: {
                          maxLength: {value: appConfig.maxDescriptionInputLength, message: ''},
                        },
                        render: ({field}) => (
                          <ScInput {...field} error={hasErrors} fullWidth placeholder={getPlaceholderFromInput(input)} />
                        ),
                      }),
                  },
                  () =>
                    controller({
                      rules: {
                        maxLength: {value: appConfig.maxDescriptionInputLength, message: ''},
                      },
                      render: ({field}) => (
                        <ScInput
                          {...field}
                          helperText={
                            errors[inputIndex]?.type === 'required'
                              ? m.required
                              : `${getValues('' + inputIndex)?.length ?? 0} / ${appConfig.maxDescriptionInputLength}`
                          }
                          error={hasErrors}
                          multiline
                          minRows={5}
                          maxRows={10}
                          fullWidth
                          placeholder={getPlaceholderFromInput(input)}
                        />
                      ),
                    }),
                )
              })()}
            </FormLayout>
          ))}
        </Panel>
      </Animate>
      <Animate autoScrollTo={false}>
        <Panel title={fileLabel ?? m.attachments}>
          <PanelBody>
            {ReportDraft.isTransmittableToPro({tags, employeeConsumer}) && (
              <>
                {!contractualDispute && (
                  <Txt color="hint" block gutterBottom dangerouslySetInnerHTML={{__html: m.attachmentsDescAnonymous}} />
                )}
                <Alert dense type="info" sx={{mb: 2}} deletable>
                  <Txt size="small" dangerouslySetInnerHTML={{__html: m.attachmentsDesc2}} />
                </Alert>
              </>
            )}

            <ReportFiles
              files={uploadedFiles}
              fileOrigin={FileOrigin.Consumer}
              onRemoveFile={f => setUploadedFiles(files => files?.filter(_ => _.id !== f.id))}
              onNewFile={f => setUploadedFiles(_ => [...(_ ?? []), f])}
            />
          </PanelBody>
        </Panel>
      </Animate>
      <ReportFlowStepperActions
        next={() => {
          handleSubmit(detailInputValues => {
            onSubmit(detailInputValues, uploadedFiles)
          })()
        }}
      />
    </>
  )
}
