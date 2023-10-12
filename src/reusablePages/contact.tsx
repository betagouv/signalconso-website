import {ContentPageContainer} from 'components_simple/PageContainers'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import Link from 'next/link'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'
import {AppLang} from '../i18n/localization/AppLangs'
import {BigReportButtonWebView} from 'components_simple/buttons/BigReportButtonWebview'
import {BigReportButton} from 'components_simple/buttons/BigReportButton'
import {appConfig} from 'core/appConfig'

export function getMetadata(lang: AppLang): Metadata {
  const {messages: m} = getI18n(lang)

  return {
    title: m.titleAndDescriptions.contact.title,
    description: m.titleAndDescriptions.contact.description,
    robots: {
      index: false,
    },
  }
}

// https://trello.com/c/vrzDS1eK/1842-ajouter-des-ctas-je-signale-un-probl%C3%A8me-dans-les-pages-daide-et-comment-%C3%A7a-marche
// The mobile app isn't ready to handle this button yet
// We activate it on demo only so that Nicolas can test
// When all is good we should activate it all the time and remove this config
const withReportButton = appConfig.reportButtonOnContactPage

export const Contact = ({isWebView, params}: {isWebView: boolean; params: any}) => {
  const {messages: m} = getI18n(params.lang)

  return (
    <>
      <ContentPageContainer>
        <h1>{m.contact.title}</h1>
        <h2 className="fr-h4">{m.contact.problemMessage}</h2>
        <p>{withReportButton ? m.contact.problemSolutionWithButton : m.contact.problemSolution}</p>
        {withReportButton && (
          <div className="text-center mb-6">{isWebView ? <BigReportButtonWebView /> : <BigReportButton {...{m}} />}</div>
        )}
        <h2 className="fr-h4">{m.contact.technicalIssue}</h2>

        <div>
          {m.contact.exampleText}
          <ul>
            <li>{m.contact.example1}</li>
            <li>{m.contact.example2}</li>
            <li>{m.contact.example3}</li>
          </ul>
        </div>
        <div>
          {m.contact.emailText}&nbsp;
          <Link href="mailto:support@signal.conso.gouv.fr?subject=incident" rel="noreferrer" title={m.contact.emailTitle}>
            support@signal.conso.gouv.fr
          </Link>
          <Alert className="fr-mt-4w" severity="warning" description={m.contact.alertDescription} title={m.contact.alertTitle} />
        </div>
      </ContentPageContainer>
    </>
  )
}
