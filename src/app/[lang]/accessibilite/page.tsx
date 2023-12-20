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

        <p>- {m.accessibilite.digitalAccessibilityLi1}</p>
        <p>- {m.accessibilite.digitalAccessibilityLi2}</p>
        <p>- {m.accessibilite.digitalAccessibilityLi3}</p>
        <p>- {m.accessibilite.digitalAccessibilityLi4}</p>
        <p>- {m.accessibilite.digitalAccessibilityLi5}</p>

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

        <p>- {m.accessibilite.testResultsLi1}</p>
        <p>- {m.accessibilite.testResultsLi2}</p>

        <h3 className="fr-h3">{m.accessibilite.nonAccessibleContentTitle}</h3>
        <h4 className="fr-h6">{m.accessibilite.nonConformityTitle}</h4>
        <p>{m.accessibilite.nonConformityText1}</p>
        <p>{m.accessibilite.nonConformityText2}</p>
        <p>{m.accessibilite.nonConformityText3}</p>
        <h3 className="fr-h3">{m.accessibilite.declarationEstablishmentTitle}</h3>
        <p>{m.accessibilite.declarationEstablishmentText}</p>
        <h4 className="fr-h6">{m.accessibilite.usedTechnologiesTitle}</h4>
        <p>{m.accessibilite.usedTechnologiesText}</p>

        <p>- HTML</p>
        <p>- WAI-ARIA</p>
        <p>- CSS</p>
        <p>- JavaScript</p>

        <h4 className="fr-h6">{m.accessibilite.assistiveTechnologiesTitle}</h4>
        <p>{m.accessibilite.assistiveTechnologiesText}</p>

        <p>- {m.accessibilite.assistiveTechnologiesList1}</p>
        <p>- {m.accessibilite.assistiveTechnologiesList2}</p>
        <p>- {m.accessibilite.assistiveTechnologiesList3}</p>
        <p>- {m.accessibilite.assistiveTechnologiesList4}</p>

        <h4 className="fr-h6">{m.accessibilite.AccessibilityAssessmentToolsTitle}</h4>

        <p>- {m.accessibilite.AccessibilityAssessmentToolsList1}</p>
        <p>- {m.accessibilite.AccessibilityAssessmentToolsList2}</p>
        <p>- {m.accessibilite.AccessibilityAssessmentToolsList3}</p>

        <h4 className="fr-h6">{m.accessibilite.complianceVerificationPagesTitle}</h4>

        <p>
          1-
          <Link href="/"> {m.accessibilite.home}</Link>
        </p>
        <p>
          2-
          <Link href={pagesDefs.planDuSite.url}> {m.accessibilite.planDuSite}</Link>
        </p>
        <p>
          3-
          <Link href={pagesDefs.conditionsGeneralesUtilisation.url}> {m.accessibilite.MentionsLegales}</Link>
        </p>
        <p>
          4-
          <Link href={pagesDefs.quiSommesNous.url}> {m.accessibilite.quiSommesNous}</Link>
        </p>

        <p>
          5-
          <Link href={pagesDefs.commentCaMarche.url}> {m.accessibilite.commentCaMarche}</Link>
        </p>
        <p>
          7-
          <Link href={pagesDefs.stats.url}> {m.accessibilite.stats}</Link>
        </p>
        <p>8- {m.accessibilite.etape1}</p>
        <p>9- {m.accessibilite.etape2}</p>
        <p>10- {m.accessibilite.etape3}</p>
        <p>11- {m.accessibilite.etape4}</p>
        <p>12- {m.accessibilite.etape5}</p>

        <h3 className="fr-h3">{m.accessibilite.improvementContactTitle}</h3>
        <p dangerouslySetInnerHTML={{__html: m.accessibilite.improvementContactText}}></p>

        <p>{m.accessibilite.supportEmail}</p>

        <h2 className="fr-h3">{m.accessibilite.recourseTitle}</h2>
        <p>{m.accessibilite.recourseText}</p>
        <p>{m.accessibilite.recourseOptions}</p>

        <p>
          - {m.accessibilite.defenseurDesDroits}
          <Link target="_blank" href={externalLinks.defenseurDesDroits}>
            {m.accessibilite.defenseurDesDroitsLink}
          </Link>
        </p>
        <p>
          - {m.accessibilite.defenseurDesDroitsDelegue}
          <Link target="_blank" href={externalLinks.defenseurDesDroitsDelegue}>
            {m.accessibilite.defenseurDesDroitsDelegueLink}
          </Link>
        </p>
        <p>
          - {m.accessibilite.postalAddress}:
          <br />
          &nbsp; Défenseur des droits
          <br />
          &nbsp; Libre réponse
          <br />
          &nbsp; 71120 75342 Paris CEDEX 07
        </p>
      </ContentPageContainer>
    </>
  )
}

export default Accessibilite
