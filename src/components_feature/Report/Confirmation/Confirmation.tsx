import {Box, Chip, Icon} from '@mui/material'
import {FriendlyHelpText} from 'alexlibs/mui-extension/Alert/FriendlyHelpText'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {findAnomaly} from 'anomalies/Anomalies'
import {AddressComponent} from 'components_simple/Address/Address'
import {Animate} from 'components_simple/Animate/Animate'
import {AnomalyImage} from 'components_simple/AnomalyTile/AnomalyImage'
import {StepNavigation} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_simple/ReportFlowStepper/ReportFlowStepperActions'
import {Row} from 'components_simple/Row/Row'
import {ReportFiles} from 'components_simple/UploadFile/ReportFiles'
import {getApiErrorId, translateApiError, useToastError} from 'hooks/useToastError'
import {useI18n} from 'i18n/I18n'
import {ReportDraft2} from 'model/ReportDraft2'
import {ApiReportDraft} from 'model/reportsFromApi'
import {useEffect} from 'react'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {Anomaly} from '../../../anomalies/Anomaly'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow/SocialNetworkRow'
import {ReportDraft} from '../../../model/ReportDraft'
import {FileOrigin} from '../../../model/UploadedFile'
import {useReportCreateContext} from '../ReportCreateContext'
import {useReportFlowContext} from '../ReportFlowContext'
import {ConfirmationStep, ConfirmationStepper} from './ConfirmationStepper'

export const Confirmation = ({stepNavigation, isWebView}: {stepNavigation: StepNavigation; isWebView: boolean}) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft as ReportDraft2
  const parsedDraft = ReportDraft2.toReportDraft(draft)
  return <_Confirmation anomaly={draft.anomaly} draft={parsedDraft} {...{isWebView, stepNavigation}} />
}

export const _Confirmation = ({
  draft,
  anomaly,
  stepNavigation,
  isWebView,
}: {
  anomaly: Pick<Anomaly, 'img'>
  draft: ReportDraft
  stepNavigation: StepNavigation
  isWebView: boolean
}) => {
  const {m} = useI18n()
  const toastError = useToastError()
  const _reportFlow = useReportFlowContext()
  const _reportCreate = useReportCreateContext()
  const _analytic = useAnalyticContext()

  useEffect(_reportCreate.createReport.clearCache, [])

  const goToStep = stepNavigation.goTo
  return (
    <Animate autoScrollTo={true}>
      <div>
        <Txt sx={{mb: 2}} block size="title">
          {m.confirmationTitle}
        </Txt>
        <FriendlyHelpText>
          {ReportDraft.isTransmittableToPro(draft) ? m.confirmationAlertTransmittable : m.confirmationAlert}
        </FriendlyHelpText>

        <ConfirmationStepper>
          <ConfirmationStep title={m.step_problem} {...{goToStep}}>
            <Box sx={{display: 'flex'}}>
              <AnomalyImage anomaly={anomaly} sx={{mr: 2}} />
              <Box>
                <Txt block size="big" bold sx={{mb: 1}}>
                  {findAnomaly(draft.category).title}
                </Txt>
                {draft.subcategories.map(_ => (
                  <Row dense icon="subdirectory_arrow_right" key={_.title}>
                    {_.title}
                  </Row>
                ))}
              </Box>
            </Box>
          </ConfirmationStep>
          <ConfirmationStep title={m.step_description} {...{goToStep}}>
            {draft.details.map(({label, value}) => (
              <Box key={label} sx={{mb: 1}}>
                <Txt block bold sx={{mr: 1}} dangerouslySetInnerHTML={{__html: label}} />
                <Txt color="hint">{value}</Txt>
              </Box>
            ))}
            <Box sx={{mb: 1}}>
              <Txt block bold sx={{mb: 1}}>
                {m.attachments}
              </Txt>
              <ReportFiles fileOrigin={FileOrigin.Consumer} hideAddBtn files={draft.uploadedFiles} />
            </Box>
          </ConfirmationStep>
          {draft.companyDraft && (
            <ConfirmationStep title={m.step_company} {...{goToStep}}>
              <Txt size="big" bold block>
                {draft.companyDraft.name} {draft.companyDraft.brand ?? ''}
              </Txt>

              {draft.companyDraft.siret && (
                <Txt color="hint" block sx={{mb: 1}}>
                  <Txt>SIRET:&nbsp;</Txt>
                  <Txt bold>{draft.companyDraft.siret}</Txt>
                </Txt>
              )}
              <Row dense icon="location_on">
                <Txt color="hint">
                  <AddressComponent address={draft.companyDraft.address} />
                </Txt>
              </Row>
              {draft.companyDraft.website && (
                <Row dense icon="link">
                  <Txt color="hint">{draft.companyDraft.website}</Txt>
                </Row>
              )}
              {draft.companyDraft.phone && (
                <Row dense icon="phone">
                  <Txt color="hint">{draft.companyDraft.phone}</Txt>
                </Row>
              )}
            </ConfirmationStep>
          )}
          {draft.influencer && (
            <ConfirmationStep title={m.step_influencer} {...{goToStep}}>
              <Txt size="big" bold block>
                Réseau social
              </Txt>
              <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} color="hint" />
              <Txt size="big" bold block>
                Nom de l'influenceur ou influenceuse
              </Txt>
              <Row dense icon="portrait">
                <Txt color="hint">{draft.influencer.name}</Txt>
              </Row>
            </ConfirmationStep>
          )}
          <ConfirmationStep title={m.step_consumer} {...{goToStep}}>
            <Row icon="person">
              {draft.consumer.gender ? m.gender[draft.consumer.gender] + ' ' : ''}
              {draft.consumer.firstName} {draft.consumer.lastName}
            </Row>
            <Row icon="email">{draft.consumer.email}</Row>
            {draft.consumer.phone && <Row icon="phone">{draft.consumer.phone}</Row>}
            {draft.consumer.referenceNumber && <Row icon="receipt">{draft.consumer.referenceNumber}</Row>}
            {ReportDraft.isTransmittableToPro(draft) && (
              <Row icon="https">
                {m.contactAgreement}:&nbsp;
                <Txt bold>
                  {draft.contactAgreement ? (
                    <Chip size="small" label={m.yes} color="success" variant="outlined" icon={<Icon>check_circle</Icon>} />
                  ) : (
                    <Chip size="small" label={m.no} color="error" variant="outlined" icon={<Icon>remove_circle</Icon>} />
                  )}
                </Txt>
              </Row>
            )}
          </ConfirmationStep>
        </ConfirmationStepper>
        <ReportFlowStepperActions
          nextIconSend
          loadingNext={_reportCreate.createReport.loading}
          nextButtonLabel={draft.consumerWish === 'getAnswer' ? m.confirmationBtnReponseConso : m.confirmationBtn}
          next={next => {
            _analytic.trackEvent(EventCategories.report, ReportEventActions.validateConfirmation)
            const metadata = buildReportMetadata({isWebView})
            _reportCreate.createReport
              .fetch({}, draft, metadata)
              .then(() => {
                _analytic.trackEvent(EventCategories.report, ReportEventActions.reportSendSuccess)
                next()
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
