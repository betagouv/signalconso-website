import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import Head from 'next/head'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import Link from 'next/link'
import {BigReportButton} from 'components_simple/Buttons'
import {useI18n} from 'i18n/I18n'

export const Contact = ({isWebView}: {isWebView: boolean}) => {
  const {m} = useI18n()
  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.contact.title}</title>
        <meta name="description" content={m.titleAndDescriptions.contact.description} />
      </Head>
      <ContentPageContainer>
        <h1>{m.contact.title}</h1>
        <h2 className="fr-h4">{m.contact.problemMessage}</h2>
        <p>{m.contact.problemSolution}</p>
        <div className="text-center mb-6">
          <BigReportButton {...{isWebView}} />
        </div>
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
