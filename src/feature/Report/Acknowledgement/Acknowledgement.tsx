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
          Votre question est transmise ?? la r??pression des fraudes (
          <abbr title="Direction G??n??rale de la Concurrence, Consommation et R??pression des Fraudes">DGCCRF</abbr>).
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Vos coordonn??es sont ?? destination des enqu??teurs <b>uniquement</b>.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          La repression des fraudes vous r??pondra dans les plus brefs d??lais.
        </Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.EmployeeReport]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer pour l'entreprise ?">
        <p>Vous avez indiqu?? ??tre employ?? de l'entreprise que vous avez signal??.</p>
        <p>
          Afin de garantir la s??curit?? de votre emploi, votre signalement ne sera pas transmis ?? l'entreprise. Par contre, il a
          bien ??t?? enregistr?? dans la base de donn??es de la r??pression des fraudes (
          <abbr title="Direction G??n??rale de la Concurrence, Consommation et R??pression des Fraudes">DGCCRF</abbr>).
        </p>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.ForeignCompany]: () => (
      <AcknowledgementLayout
        title="Que va-t-il se passer pour l'entreprise ?"
        showChargeBack={createdReport.tags.includes(ReportTag.LitigeContractuel) && !!createdReport.websiteURL}
      >
        <p>Vous avez indiqu?? que l???entreprise est une entreprise ??trang??re ({country?.name}).</p>
        <p>Votre signalement ne sera pas transmis ?? cette entreprise.</p>
        {country?.european && (
          <p>
            Nous vous invitons ?? faire votre signalement directement aupr??s du Centre Europ??en des Consommateurs. Il vous
            apportera une assistance pour r??gler votre probl??me.
            <br />
            <a
              href={externalLinks.centreEuropeenConso}
              target="_blank"
              title="europe-consommateurs.eu (nouvelle fen??tre)"
              rel="noreferrer"
            >
              {externalLinks.centreEuropeenConso}
            </a>
          </p>
        )}
        {country?.transfer && country.code === 'AD' && (
          <p>
            Nous vous invitons ?? faire votre signalement directement aupr??s du service du commerce et de la consommation d???Andorre
            :<br />
            <a href={externalLinks.consoAndorre} rel="noreferrer" target="_blank" title="comerc.ad (nouvelle fen??tre)">
              {externalLinks.consoAndorre}
            </a>
          </p>
        )}
        {country?.transfer && country.code !== 'AD' && (
          <p>Par contre les enqu??teurs de la r??pression des fraudes vont le transf??rer aux autorit??s comp??tentes de ce pays.</p>
        )}
        {!country?.european && !country?.transfer && (
          <p>
            Nous vous invitons ?? faire votre signalement aupr??s de econsumer.gov afin d???aider les autorit??s internationales ??
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
          Votre signalement sera lu <b>uniquement</b> par la r??pression des fraudes (
          <abbr title="Direction G??n??rale de la Concurrence, Consommation et R??pression des Fraudes">DGCCRF</abbr>).
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Vos coordonn??es sont ?? destination des enqu??teurs <b>uniquement</b>.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          Les enqu??teurs pourront ??tre amen??s ?? vous contacter afin de v??rifier votre identit?? ou de vous demander des ??l??ments
          compl??mentaires ?? votre signalement.
        </Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.FrenchCompanyWithoutSIRET]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer pour l'entreprise ?">
        <p>
          Votre signalement est transmis ?? la r??pression des fraudes (
          <abbr title="Direction G??n??rale de la Concurrence, Consommation et R??pression des Fraudes">DGCCRF</abbr>).
        </p>
        <p>
          Il ne pourra en revanche pas ??tre transmis ?? l'entreprise signal??e, sauf si cette derni??re est fran??aise et identifiable
          par l'??quipe de SignalConso. Dans ce cas, vous recevrez une notification.
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
          La r??pression des fraudes ne g??re pas directement les probl??mes individuels (litiges) entre un consommateur et une
          entreprise.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          L???entreprise a trois mois pour prendre connaissance du signalement.
        </Row>
        <Row
          icon={
            <Icon aria-hidden="true" sx={{color: t => t.palette.success.light}}>
              check_circle
            </Icon>
          }
        >
          La r??pression des fraudes pourra ouvrir une enqu??te aupr??s de l'??tablissement si de nombreux consommateurs sont
          concern??s ou si la pratique est particuli??rement grave.
        </Row>
        <Row icon={<Icon aria-hidden="true">mail_outline</Icon>}>
          Vous allez recevoir un mail avec les d??marches que SignalConso vous invite ?? commencer en parall??le.
        </Row>
      </AcknowledgementLayout>
    ),
    [AcknowledgmentCases.Default]: () => (
      <AcknowledgementLayout title="Que va-t-il se passer pour l'entreprise ?">
        {createdReport.contactAgreement ? (
          <>
            <p>
              L'entreprise recevra votre signalement. Elle aura la possibilit?? de corriger directement le probl??me gr??ce ?? vos
              informations. Votre nom et vos coordonn??es lui seront communiqu??s s???il souhaite vous r??pondre.
            </p>
            <p>
              Votre signalement est aussi transmis ?? la r??pression des fraudes (
              <abbr title="Direction G??n??rale de la Concurrence, Consommation et R??pression des Fraudes">DGCCRF</abbr>). Si votre
              probl??me concerne d???autres consommateurs, la r??pression des fraudes fera un contr??le de l?????tablissement.
            </p>
          </>
        ) : (
          <>
            <p>
              L'entreprise recevra votre signalement sans conna??tre votre identit??. Elle aura la possibilit?? de corriger
              directement le probl??me gr??ce ?? vos informations.
            </p>
            <p>
              Votre signalement est aussi transmis ?? la r??pression des fraudes (
              <abbr title="Direction G??n??rale de la Concurrence, Consommation et R??pression des Fraudes">DGCCRF</abbr>). Si votre
              probl??me concerne d???autres consommateurs, la r??pression des fraudes fera un contr??le de l?????tablissement.
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
            Votre signalement a ??t?? envoy??.
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
                <strong>Vous avez pay?? avec votre carte bancaire ?</strong>
              </p>
              <p>
                Gr??ce ?? la proc??dure de charge-back vous pouvez ??tre rembours?? gratuitement suite ?? un achat effectu?? en ligne :
                <br />
                <a href={externalLinks.chargeBack}>{externalLinks.chargeBack}</a>
              </p>
            </>
          )}

          <p>
            En cas d???erreur sur votre signalement, envoyez un email ??<br />
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
