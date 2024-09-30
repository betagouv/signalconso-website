import {getNewsArticleData} from '@/components_feature/actualites/newsArticlesData'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps, buildGenerateMetadata} from '@/core/metadatas'
import {buildLinkLandingPage, buildLinkNewsArticle, internalPageDefs, pagesDefs} from '@/core/pagesDefinitions'
import {AppLang, AppLangs} from '@/i18n/localization/AppLangs'
import {allVisibleLandings} from '@/landings/landingDataUtils'
import Link from 'next/link'
import {getI18n} from '../../../i18n/I18nDictionnary'
import {erreurDePrixEnCaisse} from '@/reusablePages/manual_landings/erreurDePrixEnCaisse'
import {repasSurPlaceCouvertsJetables} from '@/reusablePages/manual_landings/repasSurPlaceCouvertsJetables'
import {fournitureSystematiqueEchantillonsInternet} from '@/reusablePages/manual_landings/fournitureSystematiqueEchantillonsInternet'
import {distributionGratuiteBouteillesPlastique} from '@/reusablePages/manual_landings/distributionGratuiteBouteillesPlastique'
import {informationsEnvironnementalesVehiculesNeufs} from '@/reusablePages/manual_landings/informationsEnvironnementalesVehiculesNeufs'
import {allegationNeutraliteCompensationCarbone} from '@/reusablePages/manual_landings/allegationNeutraliteCompensationCarbone'
import {impressionSystematiqueTicketDeCaisse} from '@/reusablePages/manual_landings/impressionSystematiqueTicketDeCaisse'

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
          <BasicPageLink page="litigeTelecom" label={m.planDuSite.telecomResolutionTips} {...{lang}} />
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
          <BasicPageLink page="obligationFibre" label={m.planDuSite.obligationFibre} {...{lang}} />
          <BasicPageLink page="signalInfluenceur" label={m.planDuSite.signalInfluenceur} {...{lang}} />
          <BasicPageLink page="obsolescencePage" label={m.planDuSite.obsolescencePage} {...{lang}} />
          <BasicPageLink page="demarchageAbusif" label={m.planDuSite.demarchageAbusif} {...{lang}} />
          <BasicPageLink page="intoxAlimentaire" label={m.planDuSite.intoxAlimentaire} {...{lang}} />
          <BasicPageLink page="erreurDePrixEnCaisse" label={m.planDuSite.erreurDePrixEnCaisse} {...{lang}} />
          <BasicPageLink page="repasSurPlaceCouvertsJetables" label={m.planDuSite.repasSurPlaceCouvertsJetables} {...{lang}} />
          <BasicPageLink
            page="fournitureSystematiqueEchantillonsInternet"
            label={m.planDuSite.fournitureSystematiqueEchantillonsInternet}
            {...{lang}}
          />
          <BasicPageLink
            page="distributionGratuiteBouteillesPlastique"
            label={m.planDuSite.distributionGratuiteBouteillesPlastique}
            {...{lang}}
          />
          <BasicPageLink
            page="informationsEnvironnementalesVehiculesNeufs"
            label={m.planDuSite.informationsEnvironnementalesVehiculesNeufs}
            {...{lang}}
          />
          <BasicPageLink
            page="allegationNeutraliteCompensationCarbone"
            label={m.planDuSite.allegationNeutraliteCompensationCarbone}
            {...{lang}}
          />
          <BasicPageLink
            page="impressionSystematiqueTicketDeCaisse"
            label={m.planDuSite.impressionSystematiqueTicketDeCaisse}
            {...{lang}}
          />
          <hr className="mt-4" />
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
