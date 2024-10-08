import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {BigReportButton} from '@/components_simple/buttons/BigReportButton'
import {BigReportButtonWebView} from '@/components_simple/buttons/BigReportButtonWebview'
import {Metadata} from 'next'
import Link from 'next/link'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLang, AppLangs} from '../i18n/localization/AppLangs'

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

export const Contact = ({isWebView, lang}: {isWebView: boolean; lang: AppLangs}) => {
  const {messages: m} = getI18n(lang)

  return (
    <>
      <ContentPageContainer>
        <h1>{m.contact.title}</h1>
        <h2 className="fr-h4">{m.contact.problemMessage}</h2>
        <p>{m.contact.problemSolution}</p>
        {<div className="text-center mb-6">{isWebView ? <BigReportButtonWebView /> : <BigReportButton {...{m}} />}</div>}
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
