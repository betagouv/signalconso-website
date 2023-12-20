import {ContentPageContainer} from '@/components_simple/PageContainers'
import {externalLinks} from '@/core/externalLinks'
import {pagesDefs} from '@/core/pagesDefinitions'
import Link from 'next/link'
import {getI18n} from '../../../i18n/I18nDictionnary'
import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'

export const generateMetadata = buildGenerateMetadata('accessibilite')

const Accessibilite = (props: PageComponentProps) => {
  const {messages: m} = getI18n(props.params.lang)

  return (
    <>
      <ContentPageContainer>
        <h1>{m.accessibilite.pageTitle}</h1>
        <p>{m.accessibilite.paragraph1}</p>
        <p>{m.accessibilite.paragraph2}</p>
        <h2>{m.accessibilite.digitalAccessibilityTitle}</h2>
        <p>{m.accessibilite.digitalAccessibilityTexte1}</p>
        <p>{m.accessibilite.digitalAccessibilityTexte2}</p>
        <p>{m.accessibilite.digitalAccessibilityTexte3}</p>
        <ul>
          <li>{m.accessibilite.digitalAccessibilityLi1}</li>
          <li>{m.accessibilite.digitalAccessibilityLi2}</li>
          <li>{m.accessibilite.digitalAccessibilityLi3}</li>
          <li>{m.accessibilite.digitalAccessibilityLi4}</li>
          <li>{m.accessibilite.digitalAccessibilityLi5}</li>
        </ul>
        <h2>{m.accessibilite.digitalAccessibilityCommitmentsTitle}</h2>
        <p>
          {m.accessibilite.digitalAccessibilityCommitmentsTexte1}{' '}
          <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037388867">
            {m.accessibilite.digitalAccessibilityCommitmentsLink}
          </a>{' '}
        </p>
        <h2>{m.accessibilite.partialRgaaComplianceDeclarationTitle}</h2>
        <p>
          {m.accessibilite.partialRgaaComplianceDeclarationTexte}{' '}
          <a href="https://signal.conso.gouv.fr">{m.accessibilite.partialRgaaComplianceDeclarationLink}</a>{' '}
        </p>

        <h3 className="fr-h3">{m.accessibilite.conformityStatusTitle}</h3>
        <p dangerouslySetInnerHTML={{__html: m.accessibilite.conformityStatusText}}></p>
        <h3 className="fr-h3">{m.accessibilite.testResultsTitle}</h3>
        <p>{m.accessibilite.testResultsText}</p>
        <ul>
          <li>{m.accessibilite.testResultsLi1}</li>
          <li>{m.accessibilite.testResultsLi2}</li>
        </ul>
        <h3 className="fr-h3">{m.accessibilite.nonAccessibleContentTitle}</h3>
        <h4 className="fr-h6">{m.accessibilite.nonConformityTitle}</h4>
        <p>{m.accessibilite.nonConformityText1}</p>
        <p>{m.accessibilite.nonConformityText2}</p>
        <p>{m.accessibilite.nonConformityText3}</p>
        <h3 className="fr-h3">{m.accessibilite.declarationEstablishmentTitle}</h3>
        <p>{m.accessibilite.declarationEstablishmentText}</p>
        <h4 className="fr-h6">{m.accessibilite.usedTechnologiesTitle}</h4>
        <p>{m.accessibilite.usedTechnologiesText}</p>
        <ul>
          <li>HTML</li>
          <li>WAI-ARIA</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        <h4 className="fr-h6">{m.accessibilite.assistiveTechnologiesTitle}</h4>
        <p>{m.accessibilite.assistiveTechnologiesText}</p>
        <ul>
          <li>{m.accessibilite.assistiveTechnologiesList1}</li>
          <li>{m.accessibilite.assistiveTechnologiesList2}</li>
          <li>{m.accessibilite.assistiveTechnologiesList3}</li>
          <li>{m.accessibilite.assistiveTechnologiesList4}</li>
        </ul>
        <h4 className="fr-h6">{m.accessibilite.AccessibilityAssessmentToolsTitle}</h4>
        <ul>
          <li>{m.accessibilite.AccessibilityAssessmentToolsList1}</li>
          <li>{m.accessibilite.AccessibilityAssessmentToolsList2}</li>
          <li>{m.accessibilite.AccessibilityAssessmentToolsList3}</li>
        </ul>

        <h4 className="fr-h6">{m.accessibilite.complianceVerificationPagesTitle}</h4>
        <ol>
          <li>
            <Link href="/">{m.accessibilite.home}</Link>
          </li>
          <li>
            <Link href={pagesDefs.planDuSite.url}>{m.accessibilite.planDuSite}</Link>
          </li>
          <li>
            <Link href={pagesDefs.conditionsGeneralesUtilisation.url}>{m.accessibilite.MentionsLegales}</Link>
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
          <li>{m.accessibilite.etape1}</li>
          <li>{m.accessibilite.etape2}</li>
          <li>{m.accessibilite.etape3}</li>
          <li>{m.accessibilite.etape4}</li>
          <li>{m.accessibilite.etape5}</li>
        </ol>
        <h3 className="fr-h3">{m.accessibilite.improvementContactTitle}</h3>
        <p dangerouslySetInnerHTML={{__html: m.accessibilite.improvementContactText}}></p>
        
          <p>{m.accessibilite.supportEmail}</p>
        
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
