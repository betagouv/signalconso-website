import {NextStepButton} from '@/components_feature/reportFlow/reportFlowStepper/NextStepButton'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {ReportFiles} from '@/components_simple/reportFile/ReportFiles'
import {appConfig} from '@/core/appConfig'
import {getSubcategories, getTags, getTransmissionStatus, hasStep0, hasStep1Full, hasStep2} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {DetailInputValues2} from '@/model/Report'
import {fnSwitch} from '@/utils/FnSwitch'
import {last} from '@/utils/lodashNamedExport'
import {useEffect, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {DetailInput, ReportTag, StandardSubcategory} from 'shared/anomalies/Anomaly'
import {ConsumerWish, TransmissionStatus} from '../../../model/Report'
import {FileOrigin, UploadedFile} from '../../../model/UploadedFile'
import {useReportFlowContext} from '../ReportFlowContext'
import {buildDefaultValues} from './DetailInputsUtils'
import {DetailsAlertProduitDangereux} from './DetailsAlertProduitDangereux'
import {DetailsInputRenderByType} from './DetailsInputRenderByType'
import {getReportInputs} from './draftReportInputs'

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
  const {currentLang} = useI18n()
  const report = _reportFlow.report
  if (!hasStep0(report) || !hasStep1Full(report) || !hasStep2(report)) {
    throw new Error(`The draft is not ready to display Details step`)
  }
  const inputs = useMemo(() => {
    return getReportInputs(report, currentLang)
  }, [report.step1.subcategoriesIndexes, getTags(report), report.step1.consumerWish])

  const subcategories = getSubcategories(report)
  const lastSubcategory = last(subcategories) as StandardSubcategory
  return (
    <DetailsInner
      initialValues={report.step3?.details}
      initialFiles={report.step3?.uploadedFiles}
      transmissionStatus={getTransmissionStatus(report)}
      inputs={inputs}
      fileLabel={lastSubcategory.fileLabel}
      employeeConsumer={report.step1.employeeConsumer}
      tags={getTags(report)}
      onSubmit={(detailInputValues, uploadedFiles) => {
        _reportFlow.setReport(_ => ({..._, step3: {uploadedFiles, details: detailInputValues}}))
        _reportFlow.sendReportEvent(stepNavigation.currentStep)
        stepNavigation.next()
      }}
      {...{stepNavigation}}
      consumerWish={report.step1.consumerWish}
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
      <NextStepButton
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
