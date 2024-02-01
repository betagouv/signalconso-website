import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {ReportFiles} from '@/components_simple/reportFile/ReportFiles'
import {useI18n} from '@/i18n/I18n'
import {DetailInputValues2} from '@/model/ReportDraft2'
import {useEffect, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {last} from '@/utils/lodashNamedExport'
import {DetailInput, ReportTag, StandardSubcategory} from '../../../anomalies/Anomaly'
import {ConsumerWish, ReportDraft, TransmissionStatus} from '../../../model/ReportDraft'
import {FileOrigin, UploadedFile} from '../../../model/UploadedFile'
import {useReportFlowContext} from '../ReportFlowContext'
import {buildDefaultValues} from './DetailInputsUtils'
import {DetailsAlertProduitDangereux} from './DetailsAlertProduitDangereux'
import {DetailsInputRenderByType} from './DetailsInputRenderByType'
import {getDraftReportInputs} from './draftReportInputs'
import {appConfig} from '@/core/appConfig'
import {fnSwitch} from '@/utils/FnSwitch'

export class SpecifyFormUtils {
  static readonly specifyKeywordFr = '(à préciser)'
  static readonly specifyKeywordEn = '(to be specified)'
  static readonly hasSpecifyKeyword = (option: string) =>
    option.includes(SpecifyFormUtils.specifyKeywordFr) || option.includes(SpecifyFormUtils.specifyKeywordEn)
  static readonly getInputName = (inputIndex: number, optionIndex: number) => `${inputIndex}_${optionIndex}_specify`
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
      transmissionStatus={ReportDraft.transmissionStatus(draft)}
      inputs={inputs}
      fileLabel={(last(draft.subcategories) as StandardSubcategory).fileLabel}
      employeeConsumer={draft.employeeConsumer}
      tags={draft.tags ?? []}
      onSubmit={(detailInputValues, uploadedFiles) => {
        _reportFlow.setReportDraft(_ => ({..._, uploadedFiles, details: detailInputValues}))
        _reportFlow.sendReportEvent(stepNavigation.currentStep)
        stepNavigation.next()
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
  transmissionStatus,
  employeeConsumer,
  onSubmit,
  stepNavigation,
  consumerWish,
}: {
  inputs: DetailInput[]
  onSubmit: (values: DetailInputValues2, files?: UploadedFile[]) => void
  transmissionStatus: TransmissionStatus
  initialValues?: DetailInputValues2
  initialFiles?: UploadedFile[]
  fileLabel?: string
  employeeConsumer?: boolean
  tags?: ReportTag[]
  stepNavigation: StepNavigation
  consumerWish?: ConsumerWish
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<undefined | UploadedFile[]>()
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false)
  // can happen by uploading multiple files at once
  const tooManyFiles = (uploadedFiles ?? []).length > appConfig.maxNumberOfAttachments
  const showTooManyFilesError = tooManyFiles && hasTriedToSubmit
  const {m} = useI18n()

  const defaultValues = {
    ...buildDefaultValues(inputs),
    ...initialValues,
  }

  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
    watch,
  } = useForm<DetailInputValues2>({
    defaultValues,
  })

  useEffect(() => {
    if (initialFiles) setUploadedFiles(initialFiles)
  }, [initialFiles])

  const displayAlertProduitDangereux = (tags ?? []).includes('ProduitDangereux')

  return (
    <>
      <Animate autoScrollTo={false}>
        <div>
          {displayAlertProduitDangereux && <DetailsAlertProduitDangereux />}

          <FriendlyHelpText>
            {fnSwitch(transmissionStatus, {
              ['WILL_BE_TRANSMITTED']: (
                <>
                  <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaWillBeTransmitted}} />
                  {consumerWish !== 'fixContractualDispute' && (
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittableAnonymous}} />
                  )}
                </>
              ),
              ['MAY_BE_TRANSMITTED']: (
                <>
                  <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaMayBeTransmitted}} />
                  {consumerWish !== 'fixContractualDispute' && (
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaTransmittableAnonymous}} />
                  )}
                </>
              ),
              ['CANNOT_BE_TRANSMITTED']: (
                <>
                  <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaCannotBeTransmitted}} />
                </>
              ),
              ['NOT_TRANSMITTABLE']: (
                <>
                  <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaNotTransmittable}} />
                  {employeeConsumer && (
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaEmployeeConsumer}} />
                  )}
                </>
              ),
            })}
          </FriendlyHelpText>
          <RequiredFieldsLegend />
          {inputs.map((input, inputIndex) => (
            <DetailsInputRenderByType
              key={inputIndex}
              {...{
                control,
                register,
                inputIndex,
                input,
                errors,
                watch,
              }}
            />
          ))}
        </div>
      </Animate>
      <Animate autoScrollTo={false}>
        <div>
          <h4 className="mt-4">{fileLabel ?? m.attachments}</h4>
          {transmissionStatus !== 'NOT_TRANSMITTABLE' && (
            <>
              <FriendlyHelpText>
                <p className="mb-0" dangerouslySetInnerHTML={{__html: m.attachmentsDesc2}} />
              </FriendlyHelpText>
              {consumerWish !== 'fixContractualDispute' && <p dangerouslySetInnerHTML={{__html: m.attachmentsDescAnonymous}} />}
            </>
          )}
          <ReportFiles
            files={uploadedFiles ?? []}
            fileOrigin={FileOrigin.Consumer}
            onRemoveFile={f => setUploadedFiles(files => files?.filter(_ => _.id !== f.id))}
            onNewFile={f => setUploadedFiles(_ => [...(_ ?? []), f])}
            tooManyFilesError={showTooManyFilesError}
          />
        </div>
      </Animate>
      <ReportFlowStepperActions
        onNext={next => {
          if (tooManyFiles) {
            setHasTriedToSubmit(true)
          } else {
            handleSubmit(detailInputValues => {
              onSubmit(detailInputValues, uploadedFiles)
            })()
          }
        }}
        {...{stepNavigation}}
      />
    </>
  )
}
