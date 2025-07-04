import {ArticleAMF} from '@/components_feature/actualites/ArticleAMF'
import {ArticleAppMobileV2} from '@/components_feature/actualites/ArticleAppMobileV2'
import {ArticleBauxPrecaires} from '@/components_feature/actualites/ArticleBauxPrecaires'
import {ArticleConsommationDurable} from '@/components_feature/actualites/ArticleConsommationDurable'
import {ArticleErreurDePrixEnCaisse} from '@/components_feature/actualites/ArticleErreurDePrixEnCaisse'
import {ArticleEvolutionsQuantitePrix} from '@/components_feature/actualites/ArticleEvolutionsQuantitePrix'
import {ArticleFauxAvis} from '@/components_feature/actualites/ArticleFauxAvis'
import {ArticleFauxSitesDeVenteThesee} from '@/components_feature/actualites/ArticleFauxSitesDeVenteThesee'
import {ArticleHalloweenConfiseries} from '@/components_feature/actualites/ArticleHalloweenConfiseries'
import {ArticleLanceurAlerte} from '@/components_feature/actualites/ArticleLanceurAlerte'
import {ArticleMagasinsEphemeres} from '@/components_feature/actualites/ArticleMagasinsEphemeres'
import {ArticleOccasionReconditionnes} from '@/components_feature/actualites/ArticleOccasionReconditionnes'
import {ArticleProcesSFAM} from '@/components_feature/actualites/ArticleProcesSFAM'
import {ArticleRappelAirbagTakata} from '@/components_feature/actualites/ArticleRappelAirbagTakata'
import {ArticleAccessibilite} from './ArticleAccessibilite'
import {ArticleAchatInternet} from './ArticleAchatInternet'
import {ArticleAmeliorationAccessibilite} from './ArticleAmeliorationAccessibilite'
import {ArticleAppMobile} from './ArticleAppMobile'
import {ArticleCodeBarres} from './ArticleCodeBarres'
import {ArticleConseilsVacancesHiver} from './ArticleConseilsVacancesHiver'
import {ArticleDeuxSitesFrauduleuxBloques} from './ArticleDeuxSitesFrauduleuxBloques'
import {ArticleFauxSitesAdministratifs} from './ArticleFauxSitesAdministratifs'
import {ArticleJourneeAveuglesMalvoyants} from './ArticleJourneeAveuglesMalvoyants'
import {ArticleQuestionnaireSiteDgccrf} from './ArticleQuestionnaireSiteDgccrf'
import {ArticleResilierContratsEnLigne} from './ArticleResilierContratsEnLigne'
import {ArticleSavBlackFriday} from './ArticleSavBlackFriday'
import {ArticleSignalConsoTraduit} from './ArticleSignalConsoTraduit'
import {ArticleSignalConsoTranslated} from './ArticleSignalConsoTranslated'
import {NewsArticle} from './newsArticlesData'
import {ArticleLivraisonBlackFriday} from './ArticleLivraisonBlackFriday'
import {ArticleFaussesPromosBlackFriday} from '@/components_feature/actualites/ArticleFaussesPromosBlackFriday'
import {ArticleAbonnementsCachesBlackFriday} from '@/components_feature/actualites/ArticleAbonnementsCachesBlackFriday'
import {ArticleAteliersUtilisateurs} from '@/components_feature/actualites/ArticleAteliersUtilisateurs'
import {ArticleDarkPatterns} from '@/components_feature/actualites/ArticleDarkPatterns'
import {ArticleDroitDeRetractation} from '@/components_feature/actualites/ArticleDroitDeRetractation'
import {ArticleMarchesDeNoel} from '@/components_feature/actualites/ArticleMarchesDeNoel'
import {ArticleCoffretsCadeaux} from '@/components_feature/actualites/ArticleCoffretsCadeaux'
import {ArticleSecuriteDesJouets} from '@/components_feature/actualites/ArticleSecuriteDesJouets'
import {ArticleDecorationsDeNoel} from '@/components_feature/actualites/ArticleDecorationsDeNoel'
import {ArticleInterdictionPlastiques} from '@/components_feature/actualites/ArticleInterdictionPlastiques'
import {ArticleCondamnationIndexia} from '@/components_feature/actualites/ArticleCondamnationIndexia'
import {ArticleTarificationDynamique} from '@/components_feature/actualites/ArticleTarificationDynamique'
import {ArticleProduitsDeLaPeche} from '@/components_feature/actualites/ArticleProduitsDeLaPeche'
import {ArticleLivraisonColis} from '@/components_feature/actualites/ArticleLivraisonColis'
import {ArticlePlacementsFinanciers} from '@/components_feature/actualites/ArticlePlacementsFinanciers'
import {ArticleUnMillion} from '@/components_feature/actualites/ArticleUnMillion'
import {ArticleConsultationPublique} from '@/components_feature/actualites/ArticleConsultationPublique'
import {ArticleUsurpationDIdentite} from '@/components_feature/actualites/ArticleUsurpationDIdentite'
import {ArticleIndicationsGeographiques} from '@/components_feature/actualites/ArticleIndicationsGeographiques'
import {ArticleCheapflation} from '@/components_feature/actualites/ArticleCheapflation'
import {ArticlePlanStrategique} from '@/components_feature/actualites/ArticlePlanStrategique'
import {ArticleBilan2024} from '@/components_feature/actualites/ArticleBilan2024'
import {ArticleMadeInFrance} from '@/components_feature/actualites/ArticleMadeInFrance'
import {ArticleRestaurantsDroitsConso} from '@/components_feature/actualites/ArticleRestaurantsDroitsConso'
import {ArticleSante} from '@/components_feature/actualites/ArticleSante'
import {ArticleLocationOptionAchat} from '@/components_feature/actualites/ArticleLocationOptionAchat'
import {ArticleArnaqueRenoEnergetique} from '@/components_feature/actualites/ArticleArnaqueRenoEnergetique'

import type {JSX} from 'react'

// We can't put import these JSX directly into the "newsArticlesData"
// it causes too much import problems in the sitemap generation script
export function getArticleContent(slug: NewsArticle['slug']): () => JSX.Element {
  switch (slug) {
    case 'arnaque-reno-energetique':
      return ArticleArnaqueRenoEnergetique
    case 'location-option-achat':
      return ArticleLocationOptionAchat
    case 'sante-100-pourcent':
      return ArticleSante
    case 'restaurants-droits-conso':
      return ArticleRestaurantsDroitsConso
    case 'made-in-france':
      return ArticleMadeInFrance
    case 'bilan-2024':
      return ArticleBilan2024
    case 'plan-strategique':
      return ArticlePlanStrategique
    case 'cheapflation':
      return ArticleCheapflation
    case 'igp':
      return ArticleIndicationsGeographiques
    case 'usurpation-d-identite':
      return ArticleUsurpationDIdentite
    case 'consultation-publique-produits-non-preemballes':
      return ArticleConsultationPublique
    case 'un-million-de-signalements':
      return ArticleUnMillion
    case 'placements-financiers':
      return ArticlePlacementsFinanciers
    case 'livraison-colis':
      return ArticleLivraisonColis
    case 'produits-de-la-peche':
      return ArticleProduitsDeLaPeche
    case 'tarification-dynamique':
      return ArticleTarificationDynamique
    case 'condamnation-indexia':
      return ArticleCondamnationIndexia
    case 'plastique-usage-unique':
      return ArticleInterdictionPlastiques
    case 'decoration-noel':
      return ArticleDecorationsDeNoel
    case 'securite-des-jouets':
      return ArticleSecuriteDesJouets
    case 'coffrets-cadeaux':
      return ArticleCoffretsCadeaux
    case 'marche-noel':
      return ArticleMarchesDeNoel
    case 'droit-de-retractation':
      return ArticleDroitDeRetractation
    case 'dark-patterns':
      return ArticleDarkPatterns
    case 'ateliers-utilisateurs':
      return ArticleAteliersUtilisateurs
    case 'abonnements-caches-black-friday':
      return ArticleAbonnementsCachesBlackFriday
    case 'fausse-promo-black-friday':
      return ArticleFaussesPromosBlackFriday
    case 'livraison-black-friday':
      return ArticleLivraisonBlackFriday
    case 'sav-black-friday':
      return ArticleSavBlackFriday
    case 'faux-avis':
      return ArticleFauxAvis
    case 'halloween-confiseries':
      return ArticleHalloweenConfiseries
    case 'lanceur-d-alerte':
      return ArticleLanceurAlerte
    case 'proces-sfam':
      return ArticleProcesSFAM
    case 'baux-precaires':
      return ArticleBauxPrecaires
    case 'journee-aveugles-malvoyants':
      return ArticleJourneeAveuglesMalvoyants
    case 'deux-sites-frauduleux-bloques':
      return ArticleDeuxSitesFrauduleuxBloques
    case 'consommation-durable':
      return ArticleConsommationDurable
    case 'erreur-de-prix-en-caisse':
      return ArticleErreurDePrixEnCaisse
    case 'faux-sites-de-vente-thesee':
      return ArticleFauxSitesDeVenteThesee
    case 'rappel-airbag-takata':
      return ArticleRappelAirbagTakata
    case 'signalconso-mobile-app-v2':
      return ArticleAppMobileV2
    case 'magasins-ephemeres':
      return ArticleMagasinsEphemeres
    case 'amf':
      return ArticleAMF
    case 'objets-occasion-reconditionnes':
      return ArticleOccasionReconditionnes
    case 'faux-sites-administratifs':
      return ArticleFauxSitesAdministratifs
    case 'conseils-de-consommation-pour-des-vacances-dhiver-sereines':
      return ArticleConseilsVacancesHiver
    case 'amelioration-de-laccessibilite-de-la-plateforme-signalconso':
      return ArticleAmeliorationAccessibilite
    case 'signalement-par-code-barres':
      return ArticleCodeBarres
    case 'resilier-contrats-en-ligne':
      return ArticleResilierContratsEnLigne
    case 'signalconso-mobile-app-available':
      return ArticleResilierContratsEnLigne
    case 'signalconso-disponible-en-anglais':
      return ArticleSignalConsoTraduit
    case 'signalconso-available-in-english':
      return ArticleSignalConsoTranslated
    case 'signalconso-une-accessibilite-renforcee-pour-tous-les-consommateurs':
      return ArticleAccessibilite
    case 'acheter-sur-internet-en-toute-securite':
      return ArticleAchatInternet
    case 'site-dgccrf-votre-avis-nous-interesse':
      return ArticleQuestionnaireSiteDgccrf
    case 'signalconso-desormais-disponible-en-application-mobile':
      return ArticleAppMobile
    case 'signalconso-reduflation':
      return ArticleEvolutionsQuantitePrix
    default:
      throw new Error(`No article content found for slug: ${slug}`)
  }
}
