import {Box, BoxProps, CircularProgress, Icon} from '@mui/material'
import {useGetCountries} from 'clients/apiHooks'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel'
import {Row} from 'components_simple/Row'
import {externalLinks} from 'core/externalLinks'
import {useI18n} from 'i18n/I18n'
import {useEffect, useMemo} from 'react'
import {Txt} from '../../../alexlibs/Txt'
import {LinkBackToHome} from '../../../components_simple/LinkBackToHome'
import {Country, countryLabel} from '../../../model/Country'
import {CreatedReport} from '../../../model/CreatedReport'
import {ReportDraft} from '../../../model/ReportDraft'
import {fnSwitch} from '../../../utils/FnSwitch'
import {useReportCreateContext} from '../ReportCreateContext'
import {useReportFlowContext} from '../ReportFlowContext'

export enum AcknowledgmentCases {
  ReponseConso = 'ReponseConso',
  EmployeeReport = 'EmployeeReport',
  ForeignCompany = 'ForeignCompany',
  NotTransmittable = 'NotTransmittable',
  FrenchCompanyWithoutSIRET = 'FrenchCompanyWithoutSIRET',
  ContractualDisputeWithSIRET = 'ContractualDisputeWithSIRET',
  Default = 'Default',
}

export const Acknowledgement = ({isWebView}: {isWebView: boolean}) => {
  const {
    createReportMutation: {data: report},
  } = useReportCreateContext()
  const _reportFlow = useReportFlowContext()
  const {data: countries} = useGetCountries()

  const {currentLang} = useI18n()

  useEffect(() => {
    // When this component is displayed, the draft should be cleared so we can't go back
    _reportFlow.resetFlow()
  }, [])

  if (!report) {
    throw new Error(`No reported created.`)
  }

  const country = useMemo(() => {
    if (countries && report && report.companyAddress.country) {
      return countries?.find(_ => report.companyAddress.country === countryLabel(currentLang, _))
    }
  }, [countries, report])

  if (country || !report.companyAddress.country) {
    return <AcknowledgementInner createdReport={report} {...{isWebView, country}} />
  }

  return (
    <div className="flex items-center mb-10">
      <CircularProgress size={90} className="mx-auto" />
    </div>
  )
}

export const AcknowledgementInner = ({
  createdReport,
  country,
  isWebView,
}: {
  createdReport: CreatedReport
  country: Country | undefined
  isWebView: boolean
}) => {
  const {m, currentLang} = useI18n()
  const reportCase = useMemo(() => {
    const _ = createdReport
    if (_.tags.includes('ReponseConso')) {
      return AcknowledgmentCases.ReponseConso
    } else if (_.employeeConsumer) {
      return AcknowledgmentCases.EmployeeReport
    } else if (_.companyAddress.country ?? 'France' !== 'France') {
      return AcknowledgmentCases.ForeignCompany
    } else if (!ReportDraft.isTransmittableToPro(_)) {
      return AcknowledgmentCases.NotTransmittable
    } else if (!_.companySiret) {
      return AcknowledgmentCases.FrenchCompanyWithoutSIRET
    } else if (_.tags.includes('LitigeContractuel') && _.companySiret) {
      return AcknowledgmentCases.ContractualDisputeWithSIRET
    } else {
      return AcknowledgmentCases.Default
    }
  }, [createdReport])

  const subProps = {isWebView}
  return fnSwitch(reportCase, {
    [AcknowledgmentCases.ReponseConso]: () => (
      <AcknowledgementLayout title={m.acknoledgment.whatWillHappenToCompany} {...subProps}>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>
          <span dangerouslySetInnerHTML={{__html: m.acknoledgment.questionTransmittedToDGCCRF}} />
        </Row>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>
          {' '}
          <span dangerouslySetInnerHTML={{__html: m.acknoledgment.yourDetailsForInvestigators}} />
        </Row>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>{m.acknoledgment.fraudsResponseTime}</Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.EmployeeReport]: () => (
      <AcknowledgementLayout title={m.acknoledgment.whatWillHappenToCompany} {...subProps}>
        <p>{m.acknoledgment.youIndicatedEmployment}</p>
        <p dangerouslySetInnerHTML={{__html: m.acknoledgment.jobSecurityGuarantee}} />
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.ForeignCompany]: () => (
      <AcknowledgementLayout
        title={m.acknoledgment.whatWillHappenToCompany}
        showChargeBack={createdReport.tags.includes('LitigeContractuel') && !!createdReport.websiteURL}
        {...subProps}
      >
        <p>{m.acknoledgment.foreignCompanyReport(country ? countryLabel(currentLang, country) : '')}</p>
        <p>{m.acknoledgment.notSentReport}</p>
        {country?.european && (
          <p>
            {m.acknoledgment.reportToEuropeanConsumers}
            <br />
            <a
              href={externalLinks.centreEuropeenConso}
              target="_blank"
              title="europe-consommateurs.eu (nouvelle fenêtre)"
              rel="noreferrer"
            >
              {externalLinks.centreEuropeenConso}
            </a>
          </p>
        )}
        {country?.transfer && country.code === 'AD' && (
          <p>
            {m.acknoledgment.reportToAndorraCommerce}
            :<br />
            <a href={externalLinks.consoAndorre} rel="noreferrer" target="_blank" title="comerc.ad (nouvelle fenêtre)">
              {externalLinks.consoAndorre}
            </a>
          </p>
        )}
        {country?.transfer && country.code !== 'AD' && <p>{m.acknoledgment.investigatorsTransferToAuthorities}</p>}
        {!country?.european && !country?.transfer && (
          <p>
            {m.acknoledgment.reportToEConsumer} <a href={externalLinks.econsumer}>{externalLinks.econsumer}</a>
          </p>
        )}
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.NotTransmittable]: () => (
      <AcknowledgementLayout title={m.acknoledgment.whatWillHappenNow} {...subProps}>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>
          {' '}
          <span dangerouslySetInnerHTML={{__html: m.acknoledgment.reportReadByDGCCRF}} />
        </Row>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>
          {' '}
          <span dangerouslySetInnerHTML={{__html: m.acknoledgment.yourDetailsForInvestigators}} />
        </Row>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>{m.acknoledgment.investigatorContactPossible}</Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.FrenchCompanyWithoutSIRET]: () => (
      <AcknowledgementLayout title={m.acknoledgment.whatWillHappenToCompany} {...subProps}>
        <p dangerouslySetInnerHTML={{__html: m.acknoledgment.reportTransmittedToDGCCRF}} />
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.ContractualDisputeWithSIRET]: () => (
      <AcknowledgementLayout
        title={m.acknoledgment.whatWillHappenToCompany}
        showChargeBack={createdReport.tags.includes('LitigeContractuel') && !!createdReport.websiteURL}
        {...subProps}
      >
        <Row icon={<Icon aria-hidden="true">warning</Icon>}>{m.acknoledgment.fraudsNotHandlingIndividualIssues}</Row>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>{m.acknoledgment.companyHasThreeMonths}</Row>
        <Row icon={<Icon aria-hidden="true">check_circle</Icon>}>{m.acknoledgment.fraudsCanInvestigate}</Row>
        <Row icon={<Icon aria-hidden="true">mail_outline</Icon>}>{m.acknoledgment.emailWithNextSteps}</Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.Default]: () => (
      <AcknowledgementLayout title={m.acknoledgment.whatWillHappenToCompany} {...subProps}>
        {createdReport.contactAgreement ? (
          <>
            <p dangerouslySetInnerHTML={{__html: m.acknoledgment.companyReceivesReport}} />
          </>
        ) : (
          <>
            <p dangerouslySetInnerHTML={{__html: m.acknoledgment.companyReceivesReportWithoutIdentity}} />
          </>
        )}
      </AcknowledgementLayout>
    ),
  })
}

const AcknowledgementLayout = ({
  title,
  children,
  showChargeBack,
  isWebView,
}: {
  showChargeBack?: boolean
  title?: string
  isWebView: boolean
} & BoxProps) => {
  const {m, currentLang} = useI18n()
  return (
    <>
      <img
        src="/image/illustrations/company.png"
        alt="consultation-pro-illustration"
        style={{
          display: 'block',
          margin: 'auto',
          height: 160,
        }}
      />

      <Panel
        title={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Icon sx={{mr: 1}}>check_circle</Icon>
            <span dangerouslySetInnerHTML={{__html: m.acknoledgment.sentReport}} />
          </Box>
        }
      >
        <PanelBody>
          {title && (
            <Txt size="big" bold block sx={{mb: 2}}>
              {title}
            </Txt>
          )}
          {children}
          {showChargeBack && (
            <>
              <p>
                <strong>{m.acknoledgment.paidWithCreditCard}</strong>
              </p>
              <p>
                {m.acknoledgment.chargeBack}
                <br />
                <a href={externalLinks.chargeBack}>{externalLinks.chargeBack}</a>
              </p>
            </>
          )}
          <p>
            {m.acknoledgment.emailForErrorInReport}
            <Txt link span>
              <a href="mailto:support@signal.conso.gouv.fr?subject=incident">support@signal.conso.gouv.fr</a>
            </Txt>
          </p>
        </PanelBody>
        <PanelActions sx={{justifyContent: 'flex-start'}}>
          <LinkBackToHome isWebView={isWebView} lang={currentLang} />
        </PanelActions>
      </Panel>
    </>
  )
}
