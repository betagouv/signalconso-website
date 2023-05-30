import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {allVisibleLandings} from 'landings/landingDataUtils'
import {titleAndDescriptions} from 'core/titleAndDescriptions'
import {buildLinkLandingPage, buildLinkNewsArticle, pagesDefs} from 'core/pagesDefinitions'
import Head from 'next/head'
import Link from 'next/link'
import {newsArticlesData} from 'news/newsArticlesData'

const PlanDuSite = () => {
  return (
    <>
      <Head>
        <title>{titleAndDescriptions.planDuSite.title}</title>
        <meta name="description" content={titleAndDescriptions.planDuSite.description} />
      </Head>
      <ContentPageContainer>
        <h1>Plan du site</h1>
        <h2 className="fr-h4">Pages générales</h2>
        <ul>
          <li>
            <Link href={pagesDefs.index.url}>Accueil</Link>
          </li>
          <li>
            <Link href={pagesDefs.suiviEtViePrivee.url}>Suivi d'audience et vie privée</Link>
          </li>
          <li>
            <Link href={pagesDefs.cookies.url}>Gestion des cookies</Link>
          </li>
          <li>
            <Link href={pagesDefs.conditionsGeneralesUtilisation.url}>
              Conditions générales d'utilisation du site SignalConso
            </Link>
          </li>
          <li>
            <Link href={pagesDefs.accessibilite.url}>Déclaration d'accessibilité</Link>
          </li>
          <li>
            <Link href={pagesDefs.planDuSite.url}>Plan du site</Link>
          </li>
          <li>
            <Link href={pagesDefs.quiSommesNous.url}>Qui sommes-nous ?</Link>
          </li>
          <li>
            <Link href={pagesDefs.commentCaMarche.url}>Comment ça marche ?</Link>
          </li>
          <li>
            <Link href={pagesDefs.stats.url}>Statistiques</Link>
          </li>
          <li>
            <Link href={pagesDefs.centreAide.url}>Centre d'aide</Link>
          </li>
          <li>
            <Link href={pagesDefs.contact.url}>Contact</Link>
          </li>
          <li>
            <Link href={pagesDefs.delaiRetractation.url}>Calculez votre délai de rétractation</Link>
          </li>
          <li>
            <Link href={pagesDefs.litige.url}>Conseils pour résolution d'un problème individuel (litige)</Link>
          </li>
        </ul>
        <h2 className="fr-h4">Dépôt d'un signalement</h2>

        <ul className="">
          {allVisibleLandings().map(landingData => {
            return (
              <li key={landingData.url}>
                <Link href={buildLinkLandingPage(landingData)}>Faire un signalement pour {landingData.title}</Link>
              </li>
            )
          })}
        </ul>
        <hr className="mt-4" />
        <p className="mt-4">
          Voir aussi <Link href={pagesDefs.arborescence.url}>l'arborescence complète du dépot d'un signalement</Link>
        </p>

        <h3 className="fr-h6">Détails des étapes d'un signalement</h3>
        <ul>
          <li>Étape 1 - Le problème</li>
          <li>Étape 2 - La description</li>
          <li>Étape 3 - Le commerçant</li>
          <li>Étape 4 - Le consommateur</li>
          <li>Étape 5 - Confirmation</li>
        </ul>

        <h2 className="fr-h4">Espace pro</h2>
        <ul>
          <li>
            <Link href={pagesDefs.companyActivation.url}>Activation de l'espace entreprise</Link>
          </li>
          <li>
            <Link href={pagesDefs.connexion.url}>Connexion</Link>
          </li>
          <li>Suivi des signalements</li>
          <li>Détail du signalements</li>
          <li>Mes entreprises</li>
          <li>Gestion des accès</li>
          <li>Modification du mot de passe</li>
        </ul>
        <h2 className="fr-h4">Actualités</h2>
        <ul>
          <li>
            <Link href={pagesDefs.news.url}>Toutes les actualités</Link>
          </li>
          {newsArticlesData.map(article => {
            return (
              <li key={article.slug}>
                <Link href={buildLinkNewsArticle(article)}>{article.title}</Link>
              </li>
            )
          })}
        </ul>
        <h2 className="fr-h4">Espace DGCCRF</h2>
        <ul>
          <li>
            <Link href={pagesDefs.connexion.url}>Connexion</Link>
          </li>
          <li>Suivi des signalements</li>
          <li>Détail du signalements</li>
          <li>Suivi des entreprises</li>
          <li>Abonnements</li>
          <li>Modification du mot de passe</li>
        </ul>
      </ContentPageContainer>
    </>
  )
}

export default PlanDuSite
