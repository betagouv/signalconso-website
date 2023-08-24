import {MenuItem} from '@mui/material'
import {FriendlyHelpText} from 'components_simple/FriendlyHelpText'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {Animate} from 'components_simple/Animate'
import {ScDatepickerFr} from 'components_simple/formInputs/ScDatepickerFr'
import {FormLayout} from 'components_simple/FormLayout'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {StepNavigation} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {ScSelect} from 'components_simple/formInputs/ScSelect'
import {ReportFiles} from 'components_simple/reportFile/ReportFiles'
import {appConfig} from 'core/appConfig'
import {useI18n} from 'i18n/I18n'
import {DetailInputValues2} from 'model/ReportDraft2'
import {useEffect, useMemo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {ControllerProps} from 'react-hook-form/dist/types/controller'
import {last} from 'utils/lodashNamedExport'
import {dateToFrenchFormat, isDateInRange} from 'utils/utils'
import {DetailInput, DetailInputType, ReportTag, StandardSubcategory} from '../../../anomalies/Anomaly'
import {ConsumerWish, ReportDraft} from '../../../model/ReportDraft'
import {FileOrigin, UploadedFile} from '../../../model/UploadedFile'
import {fnSwitch} from '../../../utils/FnSwitch'
import {mapNTimes} from '../../../utils/utils'
import {useReportFlowContext} from '../ReportFlowContext'
import {getDefaultValueFromInput, getOptionsFromInput, getPlaceholderFromInput} from './DetailInputsUtils'
import {DetailsAlertProduitDangereux} from './DetailsAlertProduitDangereux'
import {DetailsSpecifyInput} from './DetailsSpecifyInput'
import {getDraftReportInputs} from './draftReportInputs'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {ScCheckbox} from '../../../components_simple/formInputs/ScCheckbox'
import {Alert} from '@codegouvfr/react-dsfr/Alert'

export class SpecifyFormUtils {
  static readonly specifyKeywordFr = '(à préciser)'
  static readonly specifyKeywordEn = '(to be specified)'
  static readonly hasSpecifyKeyword = (option: string) =>
    option.includes(SpecifyFormUtils.specifyKeywordFr) || option.includes(SpecifyFormUtils.specifyKeywordEn)
  static readonly getInputName = (index: number) => `${index}_specify`
}

export const isSpecifyInputName = (name: string) => name.includes('_specify')

export const Details = ({stepNavigation}: {stepNavigation: StepNavigation}) => {
  const _reportFlow = useReportFlowContext()
  const _analytic = useAnalyticContext()
  const {currentLang} = useI18n()
  const draft = _reportFlow.reportDraft
  const inputs = useMemo(() => {
    if (draft.subcategories) {
      return getDraftReportInputs(draft, currentLang)
    }
  }, [draft.subcategories, draft.tags, draft.consumerWish])

  if (!inputs || draft.employeeConsumer === undefined) {
    throw new Error(`This step should not be accessible ${draft.employeeConsumer} - ${JSON.stringify(inputs)}`)
  }
  return (
    <DetailsInner
      initialValues={draft.details}
      initialFiles={draft.uploadedFiles}
      isTransmittable={ReportDraft.isTransmittableToPro(draft)}
      inputs={inputs}
      fileLabel={(last(draft.subcategories) as StandardSubcategory).fileLabel}
      employeeConsumer={draft.employeeConsumer}
      tags={draft.tags ?? []}
      onSubmit={(detailInputValues, uploadedFiles) => {
        _reportFlow.setReportDraft(_ => ({..._, uploadedFiles, details: detailInputValues}))
        stepNavigation.next()
        _analytic.trackEvent(EventCategories.report, ReportEventActions.validateDetails)
      }}
      {...{stepNavigation}}
      consumerWish={draft.consumerWish}
    />
  )
}

export const DetailsInner = ({
  initialValues,
  initialFiles,
  inputs,
  fileLabel,
  tags,
  isTransmittable,
  employeeConsumer,
  onSubmit,
  stepNavigation,
  consumerWish,
}: {
  inputs: DetailInput[]
  onSubmit: (values: DetailInputValues2, files?: UploadedFile[]) => void
  initialValues?: DetailInputValues2
  initialFiles?: UploadedFile[]
  fileLabel?: string
  isTransmittable?: boolean
  employeeConsumer?: boolean
  tags?: ReportTag[]
  stepNavigation: StepNavigation
  consumerWish?: ConsumerWish
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

  const displayAlertProduitDangereux = (tags ?? []).includes('ProduitDangereux')

  const uploadedFilesCount = uploadedFiles?.length ?? 0

  return (
    <>
      <Animate autoScrollTo={false}>
        <div>
          {displayAlertProduitDangereux && <DetailsAlertProduitDangereux />}

          <FriendlyHelpText>
            {isTransmittable ? (
              <>
                <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittable}} />
                {consumerWish !== 'fixContractualDispute' && (
                  <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittableAnonymous}} />
                )}
              </>
            ) : (
              <>
                <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaNotTransmittable}} />
                <br />
                {employeeConsumer && <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaEmployeeConsumer}} />}
              </>
            )}
          </FriendlyHelpText>

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
                          <ScRadioButtons
                            {...field}
                            errorMessage={errorMessage}
                            error={hasErrors}
                            options={
                              getOptionsFromInput(input)?.map((option, i) => {
                                return {
                                  label: <span dangerouslySetInnerHTML={{__html: option}} />,
                                  value: option,
                                  specify:
                                    field.value === option && SpecifyFormUtils.hasSpecifyKeyword(option) ? (
                                      <DetailsSpecifyInput
                                        control={control}
                                        error={errors[SpecifyFormUtils.getInputName(inputIndex)]}
                                        defaultValue={initialValues?.[SpecifyFormUtils.getInputName(inputIndex)]}
                                        name={SpecifyFormUtils.getInputName(inputIndex)}
                                      />
                                    ) : undefined,
                                }
                              }) ?? []
                            }
                          />
                        ),
                      }),
                    [DetailInputType.CHECKBOX]: () =>
                      controller({
                        render: ({field}) => (
                          <ScCheckbox
                            {...field}
                            options={
                              getOptionsFromInput(input)?.map(option => {
                                return {
                                  label: <span dangerouslySetInnerHTML={{__html: option}} />,
                                  value: option,
                                  specify:
                                    (field.value as string[] | undefined)?.includes(option) &&
                                    SpecifyFormUtils.hasSpecifyKeyword(option) ? (
                                      <DetailsSpecifyInput
                                        control={control}
                                        error={errors[SpecifyFormUtils.getInputName(inputIndex)]}
                                        defaultValue={initialValues?.[SpecifyFormUtils.getInputName(inputIndex)]}
                                        name={SpecifyFormUtils.getInputName(inputIndex)}
                                      />
                                    ) : undefined,
                                }
                              }) ?? []
                            }
                          />
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
        </div>
      </Animate>
      <Animate autoScrollTo={false}>
        <div>
          <h4 className="mt-4">{fileLabel ?? m.attachments}</h4>
          {ReportDraft.isTransmittableToPro({tags, employeeConsumer, consumerWish}) && (
            <>
              <FriendlyHelpText>
                <p className="mb-0" dangerouslySetInnerHTML={{__html: m.attachmentsDesc2}} />
              </FriendlyHelpText>
              {consumerWish !== 'fixContractualDispute' && <p dangerouslySetInnerHTML={{__html: m.attachmentsDescAnonymous}} />}
            </>
          )}
          <ReportFiles
            files={uploadedFiles}
            fileOrigin={FileOrigin.Consumer}
            onRemoveFile={f => setUploadedFiles(files => files?.filter(_ => _.id !== f.id))}
            onNewFile={f => setUploadedFiles(_ => [...(_ ?? []), f])}
            hideAddBtn={uploadedFilesCount >= appConfig.maxNumberOfAttachments}
          />
          <p
            className="fr-mt-2w"
            dangerouslySetInnerHTML={{__html: m.attachmentsDescAllowedFormat(appConfig.upload_allowedExtensions)}}
          />
          {uploadedFilesCount === 0 ? (
            <p>{m.maxAttachmentsZero(appConfig.maxNumberOfAttachments)}</p>
          ) : uploadedFilesCount === appConfig.maxNumberOfAttachments ? (
            <Alert
              description={m.maxAttachmentsReached(appConfig.maxNumberOfAttachments)}
              severity="info"
              title={<></>}
              className="fr-mt-4w"
            />
          ) : (
            <p>{m.maxAttachmentsCurrent(appConfig.maxNumberOfAttachments - uploadedFilesCount)}</p>
          )}
        </div>
      </Animate>
      <ReportFlowStepperActions
        next={() => {
          handleSubmit(detailInputValues => {
            onSubmit(detailInputValues, uploadedFiles)
          })()
        }}
        {...{stepNavigation}}
      />
    </>
  )
}
