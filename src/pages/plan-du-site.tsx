import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {pageDefinitions} from 'core/pageDefinition'
import {buildLinkLandingPage, siteMap, siteMapExternal} from 'core/siteMap'
import {allVisibleLandings} from 'landings/landingDataUtils'
import Head from 'next/head'
import Link from 'next/link'

const PlanDuSite = () => {
  return (
    <>
      <Head>
        <title>{pageDefinitions.planDuSite.title}</title>
        <meta name="description" content={pageDefinitions.planDuSite.description} />
      </Head>
      <ContentPageContainer>
        <h1>Plan du site</h1>
        <h2 className="fr-h4">Pages générales</h2>
        <ul>
          <li>
            <Link href={siteMap.index}>Accueil</Link>
          </li>
          <li>
            <Link href={siteMap.suiviEtViePrivee}>Suivi d'audience et vie privée</Link>
          </li>
          <li>
            <Link href={siteMap.cookies}>Gestion des cookies</Link>
          </li>
          <li>
            <Link href={siteMap.conditionsGeneralesUtilisation}>Conditions générales d'utilisation du site SignalConso</Link>
          </li>
          <li>
            <Link href={siteMap.accessibilite}>Déclaration d'accessibilité</Link>
          </li>
          <li>
            <Link href={siteMap.planDuSite}>Plan du site</Link>
          </li>
          <li>
            <Link href={siteMap.quiSommesNous}>Qui sommes-nous ?</Link>
          </li>
          <li>
            <Link href={siteMap.commentCaMarche}>Comment ça marche ?</Link>
          </li>
          <li>
            <Link href={siteMap.stats}>Statistiques</Link>
          </li>
          <li>
            <Link href={siteMap.centreAide}>Centre d'aide</Link>
          </li>
          <li>
            <Link href={siteMap.contact}>Contact</Link>
          </li>
          <li>
            <Link href={siteMap.delaiRetractation}>Calculez votre délai de rétractation</Link>
          </li>
          <li>
            <Link href={siteMap.litige}>Conseils pour résolution d'un problème individuel (litige)</Link>
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
          Voir aussi <Link href={siteMap.arborescence}>l'arborescence complète du dépot d'un signalement</Link>
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
            <Link href={siteMapExternal.companyActivation}>Activation de l'espace entreprise</Link>
          </li>
          <li>
            <Link href={siteMapExternal.connexion}>Connexion</Link>
          </li>
          <li>Suivi des signalements</li>
          <li>Détail du signalements</li>
          <li>Mes entreprises</li>
          <li>Gestion des accès</li>
          <li>Modification du mot de passe</li>
        </ul>
        <h2 className="fr-h4">Espace DGCCRF</h2>
        <ul>
          <li>
            <Link href={siteMapExternal.connexion}>Connexion</Link>
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
