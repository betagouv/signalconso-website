import { useAnalyticContext } from '@/analytic/AnalyticContext'
import { EventCategories, ReportEventActions } from '@/analytic/analytic'
import { StepNavigation } from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import { ReportFlowStepperActions } from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import { Animate } from '@/components_simple/Animate'
import { CompanyRecapWithProduct } from '@/components_simple/CompanyRecap/CompanyRecap'
import { FriendlyHelpText } from '@/components_simple/FriendlyHelpText'
import { ReportFilesConfirmation } from '@/components_simple/reportFile/ReportFilesConfirmation'
import { getAnomaly, getSubcategories, getTransmissionStatus } from '@/feature/reportDraftUtils'
import { getApiErrorId, useToastError } from '@/hooks/useToastError'
import { useI18n } from '@/i18n/I18n'
import { ReportDraft2 } from '@/model/ReportDraft2'
import { BuildingStep, buildingReportSteps } from '@/model/ReportStep'
import { ApiReportDraft } from '@/model/reportsFromApi'
import Image from 'next/image'
import { SocialNetworkRow } from '../../../components_simple/SocialNetworkRow'
import { ReportDraft } from '../../../model/ReportDraft'
import { FileOrigin } from '../../../model/UploadedFile'
import { useReportCreateContext } from '../ReportCreateContext'
import { useReportFlowContext } from '../ReportFlowContext'
import { ConfirmationStep, ConfirmationStepper } from './ConfirmationStepper'

export const Confirmation = ({stepNavigation, isWebView}: {stepNavigation: StepNavigation; isWebView: boolean}) => {
  const _reportFlow = useReportFlowContext()
  const {currentLang} = useI18n()
  const draft = _reportFlow.reportDraft as ReportDraft2
  const parsedDraft = ReportDraft2.toReportDraft(draft, currentLang)
  return <ConfirmationInner draft={parsedDraft} {...{isWebView, stepNavigation}} />
}

export const ConfirmationInner = ({
  draft,
  stepNavigation,
  isWebView,
}: {
  draft: ReportDraft
  stepNavigation: StepNavigation
  isWebView: boolean
}) => {
  const {m} = useI18n()
  const toastError = useToastError()
  const _reportFlow = useReportFlowContext()
  const _reportCreate = useReportCreateContext()
  const _analytic = useAnalyticContext()

  const transmissionStatus = getTransmissionStatus(draft)
  const isTransmittable = transmissionStatus === 'WILL_BE_TRANSMITTED' || transmissionStatus === 'MAY_BE_TRANSMITTED'

  return (
    <Animate autoScrollTo={true}>
      <div>
        <h2 className="fr-h4">{m.confirmationTitle}</h2>
        <FriendlyHelpText>
          <p className="mb-0">{isTransmittable ? m.confirmationAlertTransmittable : m.confirmationAlert}</p>
        </FriendlyHelpText>

        <ConfirmationStepper>
          {buildingReportSteps.map((step, index) => {
            return <RenderEachStep key={step} {...{draft, stepNavigation, index}} step={step} />
          })}
        </ConfirmationStepper>
        <ReportFlowStepperActions
          nextIconSend
          loadingNext={_reportCreate.createReportMutation.isPending}
          nextButtonLabel={draft.consumerWish === 'getAnswer' ? m.confirmationBtnReponseConso : m.confirmationBtn}
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
  draft: ReportDraft
  stepNavigation: StepNavigation
  index: number
}) {
  const goToStep = stepNavigation.goTo
  const {m} = useI18n()
  const anomaly = getAnomaly(draft)
  const transmissionStatus = getTransmissionStatus(draft)
  const isTransmittable = transmissionStatus === 'WILL_BE_TRANSMITTED' || transmissionStatus === 'MAY_BE_TRANSMITTED'
  const subcategories = getSubcategories(draft)
  switch (step) {
    case 'BuildingProblem':
      return (
        <ConfirmationStep title={m.step_problem} {...{goToStep, index}}>
          <div className="flex">
            <Image className="mr-4" width={72} height={72} src={`/image/pictos/${anomaly.img}.png`} alt="" />
            <div>
              <h3 className="fr-h6 !mb-2 !text-gray-500">{anomaly.title}</h3>
              <ul className="pl-0 list-none">
                {subcategories.map(_ => (
                  <li key={_.title} className="text-gray-500">
                    <i className="ri-corner-down-right-line mr-2 " />
                    {_.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ConfirmationStep>
      )
    case 'BuildingDetails':
      return (
        <ConfirmationStep title={m.step_description} {...{goToStep, index}}>
          <dl>
            {draft.step3.details.map(({label, value}) => (
              <div key={label} className="mb-2">
                <dt className="font-medium" dangerouslySetInnerHTML={{__html: label}} />
                <dd className="text-schint">{value}</dd>
              </div>
            ))}
            <div className="mb-2">
              <dt className="font-medium mb-1">{m.attachments}</dt>
              <dd>
                <ReportFilesConfirmation fileOrigin={FileOrigin.Consumer} files={draft.step3.uploadedFiles} />
              </dd>
            </div>
          </dl>
        </ConfirmationStep>
      )
    case 'BuildingCompany':
      const {step2} = draft

      switch(step2.kind) {
        case 'basic':
          return (
            <ConfirmationStep title={m.step_company} {...{goToStep, index}}>
              <CompanyRecapWithProduct company={step2.companyIdentification.} reportDraft={draft} />
            </ConfirmationStep>
          )
      }
      return (
        <>
          {draft.companyDraft && (
            <ConfirmationStep title={m.step_company} {...{goToStep, index}}>
              <CompanyRecapWithProduct company={draft.companyDraft} barcodeProduct={draft.barcodeProduct} reportDraft={draft} />
            </ConfirmationStep>
          )}
          {draft.influencer && (
            <ConfirmationStep title={m.step_influencer} {...{goToStep, index}}>
              <p className="mb-1 font-bold">Réseau social</p>
              <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} gray className="mb-2" />
              <p className="mb-1 font-bold">Nom de l'influenceur ou influenceuse</p>
              <div className="flex gap-2">
                <i className="ri-account-box-line text-gray-400" />
                <span className="text-gray-500">{draft.influencer.name}</span>
              </div>
            </ConfirmationStep>
          )}
        </>
      )
    case 'BuildingConsumer':
      const {consumer} = draft.step4
      return (
        <ConfirmationStep title={m.step_consumer} {...{goToStep, index}}>
          <ul className="list-none">
            <li className="p-0 flex gap-2">
              <div className="flex gap-2">
                <i className="ri-account-box-line text-gray-400" />
                {consumer.gender ? m.gender[consumer.gender] + ' ' : ''}
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
                <i className="ri-lock-line text-gray-400" />
                <span>{m.contactAgreement} : </span>
                <span className="font-bold">
                  {draft.step4.contactAgreement ? (
                    <span className=" text-green-700">
                      {m.yes.toLowerCase()}
                      <i className="ri-checkbox-circle-fill ml-1" />
                    </span>
                  ) : (
                    <span className=" text-red-700">
                      {m.no.toLowerCase()}
                      <i className="ri-close-circle-fill ml-1" />
                    </span>
                  )}
                </span>
              </li>
            )}
          </ul>
        </ConfirmationStep>
      )
  }
}

function buildReportMetadata({isWebView}: {isWebView: boolean}): ApiReportDraft['metadata'] {
  if (isWebView) {
    return {
      isMobileApp: true,
      os: detectMobileOs(),
    }
  }
  return {isMobileApp: false}
}

function detectMobileOs(): 'Ios' | 'Android' | undefined {
  if (/android/i.test(navigator.userAgent)) {
    return 'Android'
  }

  if (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  ) {
    return 'Ios'
  }
  // could happen in case of weird settings, browser extensions
  // or if our user agent detection isn't perfect
  return undefined
}
