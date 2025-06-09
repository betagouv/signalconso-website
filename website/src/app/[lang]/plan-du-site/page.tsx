import {getNewsArticleData} from '@/components_feature/actualites/newsArticlesData'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {buildLinkAirtableLandingPage, buildLinkManualLandingPage, buildLinkNewsArticle} from '@/core/buildLinks'
import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'
import {internalPageDefs, pagesDefs} from '@/core/pagesDefinitions'
import {AppLang, AppLangs} from '@/i18n/localization/AppLangs'
import {allVisibleAirtableLandings} from '@/landings/airtableLandings/airtableLandingsUtils'
import {getManualLandings} from '@/landings/manualLandings/manualLandingsUtils'
import Link from 'next/link'
import {getI18n} from '../../../i18n/I18nDictionnary'

export const generateMetadata = buildGenerateMetadata('planDuSite')

const PlanDuSite = async (props: PageComponentProps) => {
  const lang = (await props.params).lang
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
          <BasicPageLink page="litigeTelecom" label={m.planDuSite.telecomResolutionTips} {...{lang}} />
          <BasicPageLink
            page="consentementEnqueteSatisfaction"
            label={m.planDuSite.consentementEnqueteSatisfaction}
            {...{lang}}
          />
        </ul>
        <h2 className="fr-h4">{m.planDuSite.reportIncidentSection}</h2>
        <ul className="mb-6">
          {allVisibleAirtableLandings(lang).map(landingData => {
            return (
              <li key={landingData.url}>
                <Link href={buildLinkAirtableLandingPage(landingData)}>
                  {m.planDuSite.reportIncidentFor} {landingData.title}
                </Link>
              </li>
            )
          })}
        </ul>
        <hr />
        <ul>
          {getManualLandings(lang).map(landingData => {
            return (
              <li key={landingData.url}>
                <Link href={buildLinkManualLandingPage(landingData)}>{landingData.labelPlanDuSite}</Link>
              </li>
            )
          })}
        </ul>
        <h2 className="fr-h4">{m.planDuSite.proSpaceSection}</h2>
        <ul>
          <li>
            <Link href={pagesDefs.companyActivation.url}>{m.planDuSite.activateBusinessSpace}</Link>
          </li>
          <li>
            <Link href={pagesDefs.espaceProWelcome.url}>{m.planDuSite.login}</Link>
          </li>
        </ul>
        <h2 className="fr-h4">{m.planDuSite.newsSection}</h2>
        <ul>
          <li>
            <Link href={pagesDefs.actualites.url}>{m.planDuSite.allNews}</Link>
          </li>
          {getNewsArticleData()
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
        </ul>
      </ContentPageContainer>
    </>
  )
}

function BasicPageLink({page, label, lang}: {page: keyof typeof internalPageDefs; label: string; lang: AppLang}) {
  const pageDef = internalPageDefs[page]
  if (lang !== AppLangs.fr && !pageDef.hasEnglishVersion) {
    return null
  }
  const href = `/${lang}${pagesDefs[page].url}`
  return (
    <li>
      <Link {...{href}}>{label}</Link>
    </li>
  )
}

export default PlanDuSite
