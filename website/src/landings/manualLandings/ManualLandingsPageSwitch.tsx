import {achatSite} from '@/reusablePages/manual_landings/achatSite'
import {allegationNeutraliteCompensationCarbone} from '@/reusablePages/manual_landings/allegationNeutraliteCompensationCarbone'
import {blackFridayAboFraisCaches} from '@/reusablePages/manual_landings/blackFridayAboFraisCaches'
import {blackFridayColis} from '@/reusablePages/manual_landings/blackFridayColis'
import {blackFridayDarkPatterns} from '@/reusablePages/manual_landings/blackFridayDarkPatterns'
import {blackFridayFausseReduction} from '@/reusablePages/manual_landings/blackFridayFausseReduction'
import {blackFridayFauxStocks} from '@/reusablePages/manual_landings/blackFridayFauxStocks'
import {blackFridayGaranties} from '@/reusablePages/manual_landings/blackFridayGaranties'
import {blackFridayRetractation} from '@/reusablePages/manual_landings/blackFridayRetractation'
import {blackFridaySav} from '@/reusablePages/manual_landings/blackFridaySav'
import {blackFridaySitesFrauduleux} from '@/reusablePages/manual_landings/blackFridaySitesFrauduleux'
import {DemarchageAbusifPage} from '@/reusablePages/manual_landings/demarchageAbusif'
import {demarchesAdministratives} from '@/reusablePages/manual_landings/demarchesAdministratives'
import {distributionGratuiteBouteillesPlastique} from '@/reusablePages/manual_landings/distributionGratuiteBouteillesPlastique'
import {dysfonctionnementsCommandesNourriture} from '@/reusablePages/manual_landings/dysfonctionnementsCommandesNourriture'
import {erreurDePrixEnCaisse} from '@/reusablePages/manual_landings/erreurDePrixEnCaisse'
import {fauxSiteGouvernemental} from '@/reusablePages/manual_landings/fauxSiteGouvernemental'
import {fournitureSystematiqueEchantillonsInternet} from '@/reusablePages/manual_landings/fournitureSystematiqueEchantillonsInternet'
import {hygieneDouteusePersonnelRestauration} from '@/reusablePages/manual_landings/hygieneDouteusePersonnelRestauration'
import {impressionSystematiqueTicketDeCaisse} from '@/reusablePages/manual_landings/impressionSystematiqueTicketDeCaisse'
import {signalInfluenceur} from '@/reusablePages/manual_landings/influenceur'
import {informationsEnvironnementalesVehiculesNeufs} from '@/reusablePages/manual_landings/informationsEnvironnementalesVehiculesNeufs'
import {IntoxAlimentairePage} from '@/reusablePages/manual_landings/intoxAlimentaire'
import {ObligationFibre} from '@/reusablePages/manual_landings/obligationFibre'
import {obsolescencePage} from '@/reusablePages/manual_landings/obsolescenceProgrammee'
import {pompeAChaleurPac} from '@/reusablePages/manual_landings/pompeAChaleurPac'
import {repasSurPlaceCouvertsJetables} from '@/reusablePages/manual_landings/repasSurPlaceCouvertsJetables'
import {travauxRenovation} from '@/reusablePages/manual_landings/travauxRenovation'
import {ManualLandingData} from './manualLandingsUtils'
import {venteProduitsPlastiqueUsageUniqueInternet} from '@/reusablePages/manual_landings/venteProduitsPlastiqueUsageUniqueInternet'
import {venteProduitsPlastiqueUsageUniqueMagasin} from '@/reusablePages/manual_landings/venteProduitsPlastiqueUsageUniqueMagasin'
import {venteEnLigneProduitsFaussesPromessesEcologiques} from '@/reusablePages/manual_landings/venteEnLigneProduitsFaussesPromessesEcologiques'
import {faussesPromessesEcologiquesProduitsVendusEnMagasin} from '@/reusablePages/manual_landings/faussesPromessesEcologiquesProduitsVendusEnMagasin'
import {marchesDeNoel} from '@/reusablePages/manual_landings/marchesDeNoel'
import {ArnaquePrimeEnergieRenovation} from '@/reusablePages/manual_landings/ArnaquePrimeEnergieRenovation'

export function ManualLandingsPageSwitch({landingData}: {landingData: ManualLandingData}) {
  const url = landingData.url
  const component = getComponent(url)()
  return component
}

function getComponent(url: ManualLandingData['url']): () => JSX.Element {
  switch (url) {
    case 'arnaques-primes-energie-renovation':
      return ArnaquePrimeEnergieRenovation
    case 'obligation-adsl-fibre':
      return ObligationFibre
    case 'signaler-un-influenceur':
      return signalInfluenceur
    case 'duree-de-vie-produit-obsolescence-programmee':
      return obsolescencePage
    case 'demarchage-abusif':
      return DemarchageAbusifPage
    case 'intoxication-alimentaire':
      return IntoxAlimentairePage
    case 'faux-site-gouvernemental':
      return fauxSiteGouvernemental
    case 'black-friday-fausse-reduction':
      return blackFridayFausseReduction
    case 'erreur-de-prix-en-caisse':
      return erreurDePrixEnCaisse
    case 'travaux-renovation':
      return travauxRenovation
    case 'pompe-a-chaleur-pac':
      return pompeAChaleurPac
    case 'repas-sur-place-couverts-jetables':
      return repasSurPlaceCouvertsJetables
    case 'fourniture-systematique-echantillons-internet':
      return fournitureSystematiqueEchantillonsInternet
    case 'distribution-gratuite-bouteilles-plastique':
      return distributionGratuiteBouteillesPlastique
    case 'informations-environnementales-vehicules-neufs':
      return informationsEnvironnementalesVehiculesNeufs
    case 'allegation-neutralite-compensation-carbone':
      return allegationNeutraliteCompensationCarbone
    case 'impression-systematique-ticket-de-caisse':
      return impressionSystematiqueTicketDeCaisse
    case 'black-friday-abonnement-frais-caches':
      return blackFridayAboFraisCaches
    case 'black-friday-retard-perte-colis':
      return blackFridayColis
    case 'black-friday-dark-patterns':
      return blackFridayDarkPatterns
    case 'black-friday-faux-stocks':
      return blackFridayFauxStocks
    case 'black-friday-sav':
      return blackFridaySav
    case 'black-friday-sites-frauduleux':
      return blackFridaySitesFrauduleux
    case 'black-friday-garanties':
      return blackFridayGaranties
    case 'black-friday-droit-retractation':
      return blackFridayRetractation
    case 'hygiene-douteuse-personnel-restauration':
      return hygieneDouteusePersonnelRestauration
    case 'demarches-administratives':
      return demarchesAdministratives
    case 'achat-site':
      return achatSite
    case 'dysfonctionnements-commandes-nourriture':
      return dysfonctionnementsCommandesNourriture
    case 'vente-de-produit-plastique-a-usage-unique-internet':
      return venteProduitsPlastiqueUsageUniqueInternet
    case 'vente-de-produit-plastique-a-usage-unique-magasin':
      return venteProduitsPlastiqueUsageUniqueMagasin
    case 'tromperie-allegation-label-environnement-internet':
      return venteEnLigneProduitsFaussesPromessesEcologiques
    case 'tromperie-allegation-label-environnement-magasin':
      return faussesPromessesEcologiquesProduitsVendusEnMagasin
    case 'marches-de-noel':
      return marchesDeNoel
    default:
      // https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
      return url satisfies never
  }
}
