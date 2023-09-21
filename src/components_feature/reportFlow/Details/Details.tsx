import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {StepNavigation} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {Animate} from 'components_simple/Animate'
import {FriendlyHelpText} from 'components_simple/FriendlyHelpText'
import {RequiredFieldsLegend} from 'components_simple/RequiredFieldsLegend'
import {ReportFiles} from 'components_simple/reportFile/ReportFiles'
import {appConfig} from 'core/appConfig'
import {useI18n} from 'i18n/I18n'
import {DetailInputValues2} from 'model/ReportDraft2'
import {useEffect, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {last} from 'utils/lodashNamedExport'
import {DetailInput, ReportTag, StandardSubcategory} from '../../../anomalies/Anomaly'
import {ConsumerWish, ReportDraft} from '../../../model/ReportDraft'
import {FileOrigin, UploadedFile} from '../../../model/UploadedFile'
import {useReportFlowContext} from '../ReportFlowContext'
import {buildDefaultValues} from './DetailInputsUtils'
import {DetailsAlertProduitDangereux} from './DetailsAlertProduitDangereux'
import {DetailsInputRenderByType} from './DetailsInputRenderByType'
import {getDraftReportInputs} from './draftReportInputs'

export class SpecifyFormUtils {
  static readonly specifyKeywordFr = '(à préciser)'
  static readonly specifyKeywordEn = '(to be specified)'
  static readonly hasSpecifyKeyword = (option: string) =>
    option.includes(SpecifyFormUtils.specifyKeywordFr) || option.includes(SpecifyFormUtils.specifyKeywordEn)
  static readonly getInputName = (inputIndex: number) => `${inputIndex}_0_specify`
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

  const defaultValues = {
    ...buildDefaultValues(inputs),
    ...initialValues,
  }

  const {
    control,
    getValues,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<DetailInputValues2>({
    defaultValues,
  })

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
                {employeeConsumer && <p className="mb-0" dangerouslySetInnerHTML={{__html: m.detailsTextAreaEmployeeConsumer}} />}
              </>
            )}
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
                getValues,
              }}
            />
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
            disableAdd={uploadedFilesCount >= appConfig.maxNumberOfAttachments}
          />
          {/*<p*/}
          {/*  className="mt-2 text-sm"*/}
          {/*  id={ADD_FILE_HELP_ID}*/}
          {/*  dangerouslySetInnerHTML={{__html: m.attachmentsDescAllowedFormat(appConfig.upload_allowedExtensions)}}*/}
          {/*/>*/}
          {/*{uploadedFilesCount === 0 ? (*/}
          {/*  <p className="text-sm">{m.maxAttachmentsZero(appConfig.maxNumberOfAttachments)}</p>*/}
          {/*) : uploadedFilesCount === appConfig.maxNumberOfAttachments ? (*/}
          {/*  <Alert*/}
          {/*    description={m.maxAttachmentsReached(appConfig.maxNumberOfAttachments)}*/}
          {/*    severity="info"*/}
          {/*    title={<></>}*/}
          {/*    className="fr-mt-4w"*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <p className="text-sm">{m.maxAttachmentsCurrent(appConfig.maxNumberOfAttachments - uploadedFilesCount)}</p>*/}
          {/*)}*/}
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
