import {Page} from 'shared/Page/Page'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'

const PlanDuSite = () => {
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.planDuSite.title}</title>
        <meta name="description" content={pageDefinitions.planDuSite.description} />
      </Head>
      <h1>Plan du site</h1>
      <h2>Pages générales</h2>
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
      </ul>
      <h2>Dépôt d'un signalement</h2>
      <Link href={siteMap.arborescence}>Voir l'arborescence</Link>
      <ul>
        <li>Étape 1 - Le problème</li>
        <li>Étape 2 - La description</li>
        <li>Étape 3 - Le commerçant</li>
        <li>Étape 4 - Le consommateur</li>
        <li>Étape 5 - Confirmation</li>
      </ul>
      <h2>Espace pro</h2>
      <ul>
        <li>
          <Link href={siteMap.companyActivation}>Activation de l'espace entreprise</Link>
        </li>
        <li>
          <Link href={siteMap.connexion}>Connexion</Link>
        </li>
        <li>Suivi des signalements</li>
        <li>Détail du signalements</li>
        <li>Mes entreprises</li>
        <li>Gestion des accès</li>
        <li>Modification du mot de passe</li>
      </ul>
      <h2>Espace DGCCRF</h2>
      <ul>
        <li>
          <Link href={siteMap.connexion}>Connexion</Link>
        </li>
        <li>Suivi des signalements</li>
        <li>Détail du signalements</li>
        <li>Suivi des entreprises</li>
        <li>Abonnements</li>
        <li>Modification du mot de passe</li>
      </ul>
    </Page>
  )
}

export default PlanDuSite
