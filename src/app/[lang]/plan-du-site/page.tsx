import {newsArticlesData} from '@/components_feature/actualites/newsArticlesData'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'
import {buildLinkLandingPage, buildLinkNewsArticle, internalPageDefs, pagesDefs} from '@/core/pagesDefinitions'
import {allVisibleLandings} from '@/landings/landingDataUtils'
import Link from 'next/link'
import {I18nMessages, getI18n} from '../../../i18n/I18nDictionnary'
import {AppLang, AppLangs} from '@/i18n/localization/AppLangs'

export const generateMetadata = buildGenerateMetadata('planDuSite')

const PlanDuSite = (props: PageComponentProps) => {
  const lang = props.params.lang
  const {messages: m} = getI18n(lang)

  return (
    <>
      <ContentPageContainer>
        <h1>{m.planDuSite.pageTitle}</h1>
        <h2 className="fr-h4">{m.planDuSite.generalPagesSection}</h2>
        <ul>
          <BasicPageLink page="index" label={m.planDuSite.reportIncident} {...{lang}} />
          <BasicPageLink page="suiviEtViePrivee" label={m.planDuSite.audiencePrivacy} {...{lang}} />
          <BasicPageLink page="cookies" label={m.planDuSite.cookieManagement} {...{lang}} />
          <BasicPageLink page="conditionsGeneralesUtilisation" label={m.planDuSite.generalConditions} {...{lang}} />
          <BasicPageLink page="accessibilite" label={m.planDuSite.accessibilityDeclaration} {...{lang}} />
          <BasicPageLink page="planDuSite" label={m.planDuSite.siteMap} {...{lang}} />
          <BasicPageLink page="quiSommesNous" label={m.planDuSite.aboutUs} {...{lang}} />
          <BasicPageLink page="commentCaMarche" label={m.planDuSite.howItWorks} {...{lang}} />
          <BasicPageLink page="stats" label={m.planDuSite.statistics} {...{lang}} />
          <BasicPageLink page="contact" label={m.planDuSite.contact} {...{lang}} />
          <BasicPageLink page="delaiRetractation" label={m.planDuSite.calcRetractionDelay} {...{lang}} />
          <BasicPageLink page="litige" label={m.planDuSite.resolutionTips} {...{lang}} />
        </ul>
        <h2 className="fr-h4">{m.planDuSite.reportIncidentSection}</h2>
        <ul className="">
          {allVisibleLandings(lang).map(landingData => {
            return (
              <li key={landingData.url}>
                <Link href={buildLinkLandingPage(landingData)}>
                  {m.planDuSite.reportIncidentFor} {landingData.title}
                </Link>
              </li>
            )
          })}
          <hr className="mt-4" />
        </ul>
        <p className="mt-4">
          {m.planDuSite.seeFullTree} <Link href={pagesDefs.arborescence.url}>{m.planDuSite.completeTree}</Link>
        </p>

        <h3 className="fr-h6">{m.planDuSite.incidentSteps}</h3>
        <ul>
          <li>{m.planDuSite.step1}</li>
          <li>{m.planDuSite.step2}</li>
          <li>{m.planDuSite.step3}</li>
          <li>{m.planDuSite.step4}</li>
          <li>{m.planDuSite.step5}</li>
        </ul>

        <h2 className="fr-h4">{m.planDuSite.proSpaceSection}</h2>
        <ul>
          <li>
            <Link href={pagesDefs.companyActivation.url}>{m.planDuSite.activateBusinessSpace}</Link>
          </li>
          <li>
            <Link href={pagesDefs.espaceProWelcome.url}>{m.planDuSite.login}</Link>
          </li>
          <li>{m.planDuSite.incidentTracking}</li>
          <li>{m.planDuSite.incidentDetails}</li>
          <li>{m.planDuSite.myCompanies}</li>
          <li>{m.planDuSite.accessManagement}</li>
          <li>{m.planDuSite.passwordModification}</li>
        </ul>
        <h2 className="fr-h4">{m.planDuSite.newsSection}</h2>
        <ul>
          <li>
            <Link href={pagesDefs.actualites.url}>{m.planDuSite.allNews}</Link>
          </li>
          {newsArticlesData
            .filter(_ => _.lang === lang)
            .map(article => {
              return (
                <li key={article.slug}>
                  <Link href={buildLinkNewsArticle(article, {withLangPrefix: true})}>{article.title}</Link>
                </li>
              )
            })}
        </ul>
        <h2 className="fr-h4">{m.planDuSite.dgccrfSpaceSection}</h2>
        <ul>
          <li>
            <Link href={pagesDefs.espaceProWelcome.url}>{m.planDuSite.login}</Link>
          </li>
          <li>{m.planDuSite.incidentTracking}</li>
          <li>{m.planDuSite.incidentDetails}</li>
          <li>{m.planDuSite.companyTracking}</li>
          <li>{m.planDuSite.subscriptions}</li>
          <li>{m.planDuSite.passwordModification}</li>
        </ul>
      </ContentPageContainer>
    </>
  )
}

function BasicPageLink({page, label, lang}: {page: keyof typeof internalPageDefs; label: string; lang: AppLang}) {
  const pageDef = internalPageDefs[page]
  if (lang !== AppLangs.fr && !pageDef.hasAlternate) {
    return null
  }
  return (
    <li>
      <Link href={pagesDefs[page].url}>{label}</Link>
    </li>
  )
}

export default PlanDuSite
