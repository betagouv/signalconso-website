import {Panel, PanelActions, PanelBody} from 'shared/Panel/Panel'
import {Fender, Txt} from '../../../alexlibs/mui-extension'
import {Box, BoxProps, Icon} from '@mui/material'
import {useReportFlowContext} from '../ReportFlowContext'
import {useEffectFn, useMemoFn} from '../../../alexlibs/react-hooks-lib'
import {useEffect, useMemo} from 'react'
import {fnSwitch} from '../../../alexlibs/ts-utils'
import {useConstantContext} from 'core/context/ConstantContext'
import {useToast} from 'core/toast'
import {Row} from 'shared/Row/Row'
import {externalLinks} from 'core/externalLinks'
import {ScButton} from 'shared/Button/Button'
import {useI18n} from 'core/i18n'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import {ReportTag} from '../../../anomaly/Anomaly'
import {ReportDraft} from '../../../client/report/ReportDraft'
import {Report} from '../../../client/report/Report'
import {Country} from '../../../client/constant/Country'

export enum AcknowledgmentCases {
  ReponseConso = 'ReponseConso',
  EmployeeReport = 'EmployeeReport',
  ForeignCompany = 'ForeignCompany',
  NotTransmittable = 'NotTransmittable',
  FrenchCompanyWithoutSIRET = 'FrenchCompanyWithoutSIRET',
  ContractualDisputeWithSIRET = 'ContractualDisputeWithSIRET',
  Default = 'Default',
}

export const Acknowledgement = () => {
  const {
    createReport: {entity: report},
  } = useReportFlowContext()
  const {countries} = useConstantContext()
  const {toastError} = useToast()
  if (!report) {
    throw new Error(`No reported created.`)
  }

  useEffect(() => {
    countries.fetch({force: false, clean: false})
  }, [])
  const country = useMemo(() => {
    if (countries.entity && report && report.companyAddress.country) {
      return countries.entity?.find(_ => report.companyAddress.country === _.name)
    }
  }, [countries, report])

  useEffectFn(countries.error, toastError)

  if (country || !report.companyAddress.country) {
    return <_Acknowledgement createdReport={report} country={country} />
  }
  return <Fender type="loading" />
}

export const _Acknowledgement = ({createdReport, country}: {createdReport: Report; country: Country | undefined}) => {
  const reportCase = useMemoFn(createdReport, _ => {
    if (_.tags.includes(ReportTag.ReponseConso)) {
      return AcknowledgmentCases.ReponseConso
    } else if (_.employeeConsumer) {
      return AcknowledgmentCases.EmployeeReport
    } else if (_.companyAddress.country ?? 'France' !== 'France') {
      return AcknowledgmentCases.ForeignCompany
    } else if (!ReportDraft.isTransmittableToPro(_)) {
      return AcknowledgmentCases.NotTransmittable
    } else if (!_.companySiret) {
      return AcknowledgmentCases.FrenchCompanyWithoutSIRET
    } else if (_.tags.includes(ReportTag.LitigeContractuel) && _.companySiret) {
      return AcknowledgmentCases.ContractualDisputeWithSIRET
    } else {
      return AcknowledgmentCases.Default
    }
  })

  return fnSwitch(reportCase, {
    [AcknowledgmentCases.ReponseConso]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer pour l'entreprise ?">
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Votre question est transmise à la répression des fraudes (
          <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>).
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Vos coordonnées sont à destination des enquêteurs <b>uniquement</b>.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          La repression des fraudes vous répondra dans les plus brefs délais.
        </Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.EmployeeReport]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer pour l'entreprise ?">
        <p>Vous avez indiqué être employé de l'entreprise que vous avez signalé.</p>
        <p>
          Afin de garantir la sécurité de votre emploi, votre signalement ne sera pas transmis à l'entreprise. Par contre, il a
          bien été enregistré dans la base de données de la répression des fraudes (
          <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>).
        </p>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.ForeignCompany]: () => (
      <AcknowledgementLayout
        title="Que va-t-il se passer pour l'entreprise ?"
        showChargeBack={createdReport.tags.includes(ReportTag.LitigeContractuel) && !!createdReport.websiteURL}
      >
        <p>Vous avez indiqué que l’entreprise est une entreprise étrangère ({country?.name}).</p>
        <p>Votre signalement ne sera pas transmis à cette entreprise.</p>
        {country?.european && (
          <p>
            Nous vous invitons à faire votre signalement directement auprès du Centre Européen des Consommateurs. Il vous
            apportera une assistance pour régler votre problème.
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
            Nous vous invitons à faire votre signalement directement auprès du service du commerce et de la consommation d’Andorre
            :<br />
            <a href={externalLinks.consoAndorre} rel="noreferrer" target="_blank" title="comerc.ad (nouvelle fenêtre)">
              {externalLinks.consoAndorre}
            </a>
          </p>
        )}
        {country?.transfer && country.code !== 'AD' && (
          <p>Par contre les enquêteurs de la répression des fraudes vont le transférer aux autorités compétentes de ce pays.</p>
        )}
        {!country?.european && !country?.transfer && (
          <p>
            Nous vous invitons à faire votre signalement auprès de econsumer.gov afin d’aider les autorités internationales à
            lutter contre la fraude.
            <a href={externalLinks.econsumer}>{externalLinks.econsumer}</a>
          </p>
        )}
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.NotTransmittable]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer maintenant ?">
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Votre signalement sera lu <b>uniquement</b> par la répression des fraudes (
          <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>).
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Vos coordonnées sont à destination des enquêteurs <b>uniquement</b>.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Les enquêteurs pourront être amenés à vous contacter afin de vérifier votre identité ou de vous demander des éléments
          complémentaires à votre signalement.
        </Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.FrenchCompanyWithoutSIRET]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer pour l'entreprise ?">
        <p>
          Votre signalement est transmis à la répression des fraudes (
          <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>).
        </p>
        <p>
          Il ne pourra en revanche pas être transmis à l'entreprise signalée, sauf si cette dernière est française et identifiable
          par l'équipe de SignalConso. Dans ce cas, vous recevrez une notification.
        </p>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.ContractualDisputeWithSIRET]: () => (
      <AcknowledgementLayout
        title="Que va-t-il se passer pour l'entreprise ?"
        showChargeBack={createdReport.tags.includes(ReportTag.LitigeContractuel) && !!createdReport.websiteURL}
      >
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.warning.main}}>
              warning
            </Icon>
          }
        >
          La répression des fraudes ne gère pas directement les problèmes individuels (litiges) entre un consommateur et une
          entreprise.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          L’entreprise a trois mois pour prendre connaissance du signalement.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          La répression des fraudes pourra ouvrir une enquête auprès de l'établissement si de nombreux consommateurs sont
          concernés ou si la pratique est particulièrement grave.
        </Row>
        <Row icon={<Icon aria-hidden="true">mail_outline</Icon>}>
          Vous allez recevoir un mail avec les démarches que SignalConso vous invite à commencer en parallèle.
        </Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.Default]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer pour l'entreprise ?">
        {createdReport.contactAgreement ? (
          <>
            <p>
              L'entreprise recevra votre signalement. Elle aura la possibilité de corriger directement le problème grâce à vos
              informations. Votre nom et vos coordonnées lui seront communiqués s’il souhaite vous répondre.
            </p>
            <p>
              Votre signalement est aussi transmis à la répression des fraudes (
              <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>). Si votre
              problème concerne d’autres consommateurs, la répression des fraudes fera un contrôle de l’établissement.
            </p>
          </>
        ) : (
          <>
            <p>
              L'entreprise recevra votre signalement sans connaître votre identité. Elle aura la possibilité de corriger
              directement le problème grâce à vos informations.
            </p>
            <p>
              Votre signalement est aussi transmis à la répression des fraudes (
              <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>). Si votre
              problème concerne d’autres consommateurs, la répression des fraudes fera un contrôle de l’établissement.
            </p>
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
}: {
  showChargeBack?: boolean
  title?: string
} & BoxProps) => {
  const {m} = useI18n()
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
          <Box sx={{display: 'flex', alignItems: 'center', color: t => t.palette.success.light}}>
            <Icon sx={{mr: 1}}>check_circle</Icon>
            Votre signalement a été envoyé.
          </Box>
        }
      >
        <PanelBody className="blog">
          {title && (
            <Txt size="big" bold block sx={{mb: 2}}>
              {title}
            </Txt>
          )}
          {children}

          {showChargeBack && (
            <>
              <p>
                <strong>Vous avez payé avec votre carte bancaire ?</strong>
              </p>
              <p>
                Grâce à la procédure de charge-back vous pouvez être remboursé gratuitement suite à un achat effectué en ligne :
                <br />
                <a href={externalLinks.chargeBack}>{externalLinks.chargeBack}</a>
              </p>
            </>
          )}

          <p>
            En cas d’erreur sur votre signalement, envoyez un email à<br />
            <Txt link>
              <a href="mailto:support@signal.conso.gouv.fr?subject=incident">support@signal.conso.gouv.fr</a>
            </Txt>
          </p>
        </PanelBody>
        <PanelActions sx={{justifyContent: 'flex-start'}}>
          <Link href={siteMap.index}>
            <ScButton color="primary" variant="contained" icon="home">
              {m.backToHome}
            </ScButton>
          </Link>
        </PanelActions>
      </Panel>
    </>
  )
}
