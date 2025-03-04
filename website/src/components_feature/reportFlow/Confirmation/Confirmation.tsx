import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {NextStepButton} from '@/components_feature/reportFlow/reportFlowStepper/NextStepButton'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {Animate} from '@/components_simple/Animate'
import {Step2Recap} from '@/components_simple/CompanyRecap/Step2Recap'
import {ScAlert} from '@/components_simple/ScAlert'
import {ReportFilesConfirmation} from '@/components_simple/reportFile/ReportFilesConfirmation'
import {
  getAnomaly,
  getSubcategories,
  getTags,
  getTransmissionStatus,
  hasStep0,
  hasStep1Full,
  hasStep2,
  hasStep4,
} from '@/feature/reportUtils'
import {parseReportDetails} from '@/feature/reportUtils2'
import {getApiErrorId, useToastError} from '@/hooks/useToastError'
import {useI18n} from '@/i18n/I18n'
import {Report} from '@/model/Report'
import {BuildingStep, buildingReportSteps} from '@/model/ReportStep'
import {ApiReport} from '@/model/reportsFromApi'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow'
import {FileOrigin} from '../../../model/UploadedFile'
import {getReportInputs} from '../Details/draftReportInputs'
import {useReportCreateContext} from '../ReportCreateContext'
import {useReportFlowContext} from '../ReportFlowContext'
import {ConfirmationStep, ConfirmationStepper} from './ConfirmationStepper'
import {buildReportMetadata} from '@/utils/buildReportMetadata'

export const Confirmation = ({stepNavigation, isWebView}: {stepNavigation: StepNavigation; isWebView: boolean}) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.report as Report
  return <ConfirmationInner draft={draft} {...{isWebView, stepNavigation}} />
}

export const ConfirmationInner = ({
  draft,
  stepNavigation,
  isWebView,
}: {
  draft: Report
  stepNavigation: StepNavigation
  isWebView: boolean
}) => {
  if (!hasStep0(draft) || !hasStep1Full(draft) || !hasStep2(draft) || !hasStep4(draft)) {
    throw new Error('This draft is not ready for the Confirmation step')
  }
  const {m} = useI18n()
  const toastError = useToastError()
  const _reportFlow = useReportFlowContext()
  const _reportCreate = useReportCreateContext()
  const _analytic = useAnalyticContext()

  const employeeConsumer = draft.step1.employeeConsumer
  const transmissionStatus = getTransmissionStatus(draft)
  const isTransmittable = transmissionStatus === 'WILL_BE_TRANSMITTED' || transmissionStatus === 'MAY_BE_TRANSMITTED'

  return (
    <Animate autoScrollTo={true}>
      <div>
        <div className="mb-4 space-y-2">
          <p dangerouslySetInnerHTML={{__html: isTransmittable ? m.confirmationAlertTransmittable : m.confirmationAlert}} />
          {employeeConsumer ? (
            <div>
              <ScAlert type="warning">
                <p className="mb-0" dangerouslySetInnerHTML={{__html: m.confirmationAlertEmployeeConsumer}}></p>
              </ScAlert>
            </div>
          ) : null}
        </div>

        <ConfirmationStepper>
          {buildingReportSteps.map((step, index) => {
            return <RenderEachStep key={step} {...{draft, stepNavigation, index}} step={step} />
          })}
        </ConfirmationStepper>
        <NextStepButton
          nextIconSend
          loadingNext={_reportCreate.createReportMutation.isPending}
          nextButtonLabel={draft.step1.consumerWish === 'getAnswer' ? m.confirmationBtnReponseConso : m.confirmationBtn}
          onNext={next => {
            _reportFlow.sendReportEvent('Confirmation')
            const metadata = buildReportMetadata({isWebView})
            _reportCreate.createReportMutation
              .mutateAsync({draft, metadata})
              .then(() => {
                next()
                _reportFlow.sendReportEvent('Done')
              })
              .catch(e => {
                _analytic.trackEvent(EventCategories.report, ReportEventActions.reportSendFail)
                toastError(getApiErrorId(e) === 'SC-0025' ? m.thereAreSimilarReports : undefined)
              })
          }}
          {...{stepNavigation}}
        />
      </div>
    </Animate>
  )
}

function RenderEachStep({
  step,
  draft,
  stepNavigation,
  index,
}: {
  step: BuildingStep
  draft: Report
  stepNavigation: StepNavigation
  index: number
}) {
  const goToStep = stepNavigation.goTo
  const {m, currentLang} = useI18n()
  const anomaly = getAnomaly(draft)
  const transmissionStatus = getTransmissionStatus(draft)
  const isTransmittable = transmissionStatus === 'WILL_BE_TRANSMITTED' || transmissionStatus === 'MAY_BE_TRANSMITTED'
  const subcategories = getSubcategories(draft)
  const inputs = getReportInputs(draft, currentLang)
  const detailsParsed = parseReportDetails(draft.step3.details, inputs)
  switch (step) {
    case 'BuildingProblem':
      const choices = [anomaly.title, ...subcategories.map(_ => _.title)]
      return (
        <ConfirmationStep title={m.step_problem} {...{goToStep, index}}>
          <ul className="pl-0 list-none">
            {choices.map(_ => (
              <li key={_} className="flex gap-2">
                <i className="ri-corner-down-right-line" />
                {_}
              </li>
            ))}
          </ul>
        </ConfirmationStep>
      )

    case 'BuildingCompany':
      const {step2} = draft
      switch (step2.kind) {
        case 'influencer':
        case 'influencerOtherSocialNetwork':
          return (
            <ConfirmationStep title={m.step_influencer} {...{goToStep, index}}>
              <p className="mb-1 font-bold">Réseau social</p>
              <SocialNetworkRow socialNetwork={step2.socialNetwork} gray className="mb-2" />
              <p className="mb-1 font-bold">Nom de l'influenceur ou influenceuse</p>
              <div className="flex gap-2">
                <i className="ri-account-box-line text-gray-400" />
                <span className="text-gray-500">{step2.influencerName}</span>
              </div>
            </ConfirmationStep>
          )
        default:
          return (
            <ConfirmationStep title={m.step_company} {...{goToStep, index}}>
              <Step2Recap {...{step2, tags: getTags(draft)}} />
            </ConfirmationStep>
          )
      }
    case 'BuildingDetails':
      return (
        <ConfirmationStep title={m.step_description} {...{goToStep, index}}>
          <div className="space-y-4">
            <div>
              {detailsParsed.map(({label, value}) => (
                <div className="mb-2" key={label}>
                  <p className="mb-0 font-bold text-sm" dangerouslySetInnerHTML={{__html: label}} />{' '}
                  <p className="mb-0 whitespace-pre-line ">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="mb-0 font-bold text-sm">{m.attachments}</p>
              <ReportFilesConfirmation fileOrigin={FileOrigin.Consumer} files={draft.step3.uploadedFiles} />
            </div>
          </div>
        </ConfirmationStep>
      )
    case 'BuildingConsumer':
      const {consumer} = draft.step4
      return (
        <ConfirmationStep title={m.step_consumer} {...{goToStep, index}}>
          <ul className="list-none p-0">
            <li className="p-0 flex gap-2">
              <div className="flex gap-2">
                <i className="ri-account-box-line text-gray-400" />
                {consumer.firstName} {consumer.lastName}
              </div>
            </li>
            <li className="p-0 flex gap-2">
              <i className="ri-mail-line text-gray-400" />
              <span>{consumer.email}</span>
            </li>
            {consumer.phone && (
              <li className="p-0 flex gap-2">
                <i className="ri-phone-line text-gray-400" />
                <span>{consumer.phone}</span>
              </li>
            )}
            {consumer.referenceNumber && (
              <li className="p-0 flex gap-2">
                <i className="ri-bill-line text-gray-400" />
                <span>{consumer.referenceNumber}</span>
              </li>
            )}
            {isTransmittable && (
              <li className="p-0 flex gap-2">
                <span className={`font-bold ${draft.step4.contactAgreement ? 'text-scgreensuccess' : 'text-scorangewarn'}`}>
                  {draft.step4.contactAgreement ? m.companyWillHaveYourIdentity : m.companyWillNotHaveYourIdentity}
                </span>
              </li>
            )}
          </ul>
        </ConfirmationStep>
      )
  }
}
