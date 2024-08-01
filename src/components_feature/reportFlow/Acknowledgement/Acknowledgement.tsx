import {useGetCountries} from '@/clients/apiHooks'
import {externalLinks} from '@/core/externalLinks'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useEffect, useMemo} from 'react'
import {Country, countryLabel} from '../../../model/Country'
import {CreatedReport} from '../../../model/CreatedReport'
import {fnSwitch} from '../../../utils/FnSwitch'
import {useReportCreateContext} from '../ReportCreateContext'
import {useReportFlowContext} from '../ReportFlowContext'
import AcknowledgementLayout from './AcknowledgementLayout'

export enum AcknowledgmentCases {
  ReponseConso = 'ReponseConso',
  EmployeeReport = 'EmployeeReport',
  ForeignCompany = 'ForeignCompany',
  FrenchCompanyWithoutSIRET = 'FrenchCompanyWithoutSIRET',
  ContractualDisputeWithSIRET = 'ContractualDisputeWithSIRET',
  PostReportHelper = 'PostReportHelper',
  Default = 'Default',
}

export const Acknowledgement = ({isWebView}: {isWebView: boolean}) => {
  const {
    createReportMutation: {data: report},
  } = useReportCreateContext()
  const _reportFlow = useReportFlowContext()
  const {data: countries} = useGetCountries()

  useEffect(() => {
    // When this component is displayed, the draft should be cleared so we can't go back
    _reportFlow.resetReport()
  }, [])

  if (!report) {
    throw new Error(`No reported created.`)
  }

  const country = useMemo(() => {
    if (countries && report && report.companyAddress.country) {
      return countries?.find(_ => report.companyAddress.country?.code === _.code)
    }
  }, [countries, report])

  if (country || !report.companyAddress.country) {
    return <AcknowledgementInner createdReport={report} {...{isWebView, country}} />
  }

  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="sc-loader-big w-20 h-20"></div>
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
    } else if (!_.companySiret) {
      return AcknowledgmentCases.FrenchCompanyWithoutSIRET
    } else if (_.tags.includes('LitigeContractuel') && _.companySiret) {
      return AcknowledgmentCases.ContractualDisputeWithSIRET
    } else {
      return AcknowledgmentCases.Default
    }
  }, [createdReport])

  const subProps = {isWebView, createdReport}
  return fnSwitch(reportCase, {
    [AcknowledgmentCases.ReponseConso]: () => (
      <AcknowledgementLayout title={m.acknoledgment.whatWillHappenNow} {...subProps}>
        <List>
          <ListItem>
            <span dangerouslySetInnerHTML={{__html: m.acknoledgment.questionTransmittedToDGCCRF}} />
          </ListItem>
          <ListItem>
            <span dangerouslySetInnerHTML={{__html: m.acknoledgment.yourDetailsForInvestigators}} />
          </ListItem>
          <ListItem>{m.acknoledgment.fraudsResponseTime}</ListItem>
        </List>
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
        <List>
          <ListItem icon="ri-error-warning-line">{m.acknoledgment.fraudsNotHandlingIndividualIssues}</ListItem>
          <ListItem>{m.acknoledgment.companyHasThreeMonths}</ListItem>
          <ListItem>{m.acknoledgment.fraudsCanInvestigate}</ListItem>
          <ListItem icon="ri-mail-unread-line">{m.acknoledgment.emailWithNextSteps}</ListItem>
        </List>
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

function ListItem({icon, children}: {icon?: string; children: ReactNode}) {
  return (
    <li className="mb-2">
      <div className="flex items-center justify-start gap-4">
        <span className={`${icon ?? 'ri-arrow-right-line'}`} />
        {children}
      </div>
    </li>
  )
}

function List({children}: {children: ReactNode}) {
  return <ul className="list-none !p-0 mb-4">{children}</ul>
}
