import {ContentPageContainer} from 'components_simple/PageContainers'
import {externalLinks} from 'core/externalLinks'
import {pagesDefs} from 'core/pagesDefinitions'
import Link from 'next/link'
import {getI18n} from '../../../i18n/I18nDictionnary'

export async function generateMetadata({params}: any) {
  const {messages: m} = getI18n(params.lang)
  return {
    title: m.titleAndDescriptions.accessibilite.title,
    description: m.titleAndDescriptions.accessibilite.description,
  }
}

const Accessibilite = ({params}: any) => {
  const {messages: m} = getI18n(params.lang)

  return (
    <>
      <ContentPageContainer>
        <h1>{m.accessibilite.pageTitle}</h1>
        <p>{m.accessibilite.paragraph1}</p>
        <p>{m.accessibilite.paragraph2}</p>
        <h2 className="fr-h3">{m.accessibilite.conformityStatusTitle}</h2>
        <p dangerouslySetInnerHTML={{__html: m.accessibilite.conformityStatusText}}></p>
        <h2 className="fr-h3">{m.accessibilite.testResultsTitle}</h2>
        <p>{m.accessibilite.testResultsText}</p>
        <h2 className="fr-h3">{m.accessibilite.nonAccessibleContentTitle}</h2>
        <p>{m.accessibilite.nonAccessibleContentText}</p>
        <h3 className="fr-h6">{m.accessibilite.nonConformityTitle}</h3>
        {m.accessibilite.nonConformityText}
        <ul>
          <li>{m.accessibilite.monthStats}</li>
        </ul>
        <h3 className="fr-h6">{m.accessibilite.disproportionateBurdenTitle}</h3>
        <p>{m.accessibilite.disproportionateBurdenText1}</p>
        <p>{m.accessibilite.disproportionateBurdenText2}</p>
        <h2 className="fr-h3">{m.accessibilite.accessibilityReportTitle}</h2>
        <p>
          {m.accessibilite.accessibilityReportText}{' '}
          <Link target="_blank" href="https://rebeca-documentation.finances.gouv.fr">
            {m.accessibilite.rebecaPlatform}
          </Link>
          {m.accessibilite.evaluationGridText}
        </p>
        <h2 className="fr-h3">{m.accessibilite.declarationEstablishmentTitle}</h2>
        <p>{m.accessibilite.declarationEstablishmentText}</p>
        <h3 className="fr-h6">{m.accessibilite.usedTechnologiesTitle}</h3>
        <p>{m.accessibilite.usedTechnologiesText}</p>
        <ul>
          <li>HTML</li>
          <li>WAI-ARIA</li>
          <li>JavaScript</li>
        </ul>
        <h3 className="fr-h6">{m.accessibilite.assistiveTechnologiesTitle}</h3>
        <p>{m.accessibilite.assistiveTechnologiesText}</p>
        <ul>
          <li>{m.accessibilite.assistiveTechnologiesList1}</li>
          <li>{m.accessibilite.assistiveTechnologiesList2}</li>
        </ul>
        <h2 className="fr-h3">{m.accessibilite.complianceVerificationPagesTitle}</h2>
        <ol>
          <li>
            <Link href="/">{m.accessibilite.home}</Link>
          </li>
          <li>
            <Link href={pagesDefs.quiSommesNous.url}>{m.accessibilite.quiSommesNous}</Link>
          </li>
          <li>
            <Link href={pagesDefs.commentCaMarche.url}>{m.accessibilite.commentCaMarche}</Link>
          </li>
          <li>
            <Link href={pagesDefs.stats.url}>{m.accessibilite.stats}</Link>
          </li>
          <li>
            <Link href={pagesDefs.centreAide.url}>{m.accessibilite.aide}</Link>
          </li>
          <li>{m.accessibilite.etape1}</li>
          <li>{m.accessibilite.etape2}</li>
          <li>{m.accessibilite.etape3}</li>
          <li>{m.accessibilite.etape4}</li>
          <li>{m.accessibilite.etape5}</li>
          <li>
            <Link href={pagesDefs.espaceProWelcome.url}>{m.accessibilite.connexionEspacePro}</Link>
          </li>
          <li>{m.accessibilite.espaceProSuivi}</li>
          <li>{m.accessibilite.espaceProDetail}</li>
          <li>{m.accessibilite.espaceProEntreprises}</li>
          <li>{m.accessibilite.espaceProGestionAcces}</li>
        </ol>
        <h2 className="fr-h3">{m.accessibilite.improvementContactTitle}</h2>
        <p>{m.accessibilite.improvementContactText}</p>
        <ul>
          <li>{m.accessibilite.supportEmail}</li>
        </ul>
        <h2 className="fr-h3">{m.accessibilite.recourseTitle}</h2>
        <p>{m.accessibilite.recourseText}</p>
        <p>{m.accessibilite.recourseOptions}</p>
        <ul>
          <li>
            {m.accessibilite.defenseurDesDroits}
            <Link target="_blank" href={externalLinks.defenseurDesDroits}>
              {m.accessibilite.defenseurDesDroitsLink}
            </Link>
          </li>
          <li>
            {m.accessibilite.defenseurDesDroitsDelegue}
            <Link target="_blank" href={externalLinks.defenseurDesDroitsDelegue}>
              {m.accessibilite.defenseurDesDroitsDelegueLink}
            </Link>
          </li>
          <li>
            {m.accessibilite.postalAddress}:
            <br />
            Défenseur des droits
            <br />
            Libre réponse
            <br />
            71120 75342 Paris CEDEX 07
          </li>
        </ul>
      </ContentPageContainer>
    </>
  )
}

export default Accessibilite
