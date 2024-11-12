import {pagesDefs} from '@/core/pagesDefinitions'
import imgSav from '@/img/actualites/sav.png'
import Image from 'next/image'

export function ArticleSavBlackFriday() {
  return (
    <div className="sc-article">
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <Image src={imgSav} width={300} alt="" />
        <p>
          Après les achats du Black Friday, il est fréquent que des produits présentent des défauts ou que des accessoires
          manquent. En cas de problème avec un produit, le service après-vente (SAV) est votre interlocuteur principal. Voici les
          bons réflexes pour éviter les difficultés de SAV et faire valoir vos droits efficacement.
        </p>
      </div>
      <h2>Veillez à bien connaître vos droits avant de contacter le SAV</h2>
      <p>En France, plusieurs garanties protègent les consommateurs :</p>
      <ul>
        <li>
          <strong>La garantie légale de conformité</strong> (valable 2 ans) couvre les défauts déjà présents lors de l'achat : si
          votre produit tombe en panne ou n'est pas conforme, le vendeur est tenu de le réparer, l'échanger ou vous rembourser.
        </li>
        <li>
          <strong>La garantie légale contre les vices cachés</strong> est valable 2 ans à compter de la découverte du défaut et
          s'applique aux problèmes non visibles à l'achat.
        </li>
        <li>
          <strong>La garantie commerciale</strong> peut être proposée par le vendeur pour prolonger la couverture, mais elle est
          optionnelle. Vérifiez bien les conditions : toutes les garanties commerciales ne sont pas aussi avantageuses qu'elles le
          paraissent.
        </li>
      </ul>
      <h2>Ayez les bons réflexes pour faciliter le traitement SAV</h2>
      <p>Quand vous achetez un produit pendant le Black Friday :</p>
      <ul>
        <li>
          <strong>Conservez la facture</strong> et tous les éléments de preuve d'achat. La facture est essentielle pour faire
          jouer vos droits en cas de retour ou d'échange.
        </li>
        <li>
          <strong>Prenez des photos ou vidéos</strong> des défauts du produit pour documenter le problème. Cela peut accélérer le
          traitement par le SAV.
        </li>
        <li>
          <strong>Contactez le SAV par écrit</strong> (email, formulaire en ligne) pour garder une trace de vos échanges afin de
          faciliter le suivi et prouver que vous avez signalé le problème en temps voulu.
        </li>
      </ul>
      <h2>Quels sont les options si le produit est défectueux ou non conforme ?</h2>
      <p>Si le produit ne fonctionne pas ou ne correspond pas à sa description :</p>
      <ul>
        <li>
          <strong>Demandez une réparation ou un remplacement</strong> sans frais. Le vendeur doit répondre sous 30 jours. Si le
          remplacement ou la réparation n'est pas possible, vous pouvez obtenir un remboursement partiel ou total.
        </li>
        <li>
          <strong>Évitez les frais d'envoi</strong> : dans le cadre de la garantie légale de conformité, le vendeur doit couvrir
          les frais de retour du produit défectueux. Insistez sur ce point si on vous demande de payer.
        </li>
      </ul>
      <h2>Que faire si le SAV est injoignable ou pas coopératif ?</h2>
      <p>Certains vendeurs peuvent être difficiles à joindre après le Black Friday ou traîner à traiter les demandes :</p>
      <ul>
        <li>
          <strong>Soyez persistant</strong> et relancez régulièrement par écrit. N'hésitez pas à utiliser les réseaux sociaux pour
          obtenir une réponse si le SAV ne répond pas via les canaux habituels.
        </li>
        <li>
          <strong>Sollicitez un médiateur</strong> en consommation : de nombreux vendeurs adhèrent à un service de médiation pour
          aider à résoudre les litiges.
        </li>
      </ul>
      <h2>Récapitulatif Anti-Galère avec le SAV pendant le Black Friday</h2>
      <ul>
        <li>Gardez précieusement votre facture et les preuves d'achat.</li>
        <li>Signalez rapidement tout défaut par écrit avec photos ou vidéos.</li>
        <li>Demandez une prise en charge des frais de retour pour les produits sous garantie</li>
      </ul>
      <p>
        Pour en savoir plus rendez vous sur{' '}
        <a href={`/fr${pagesDefs.blackFridaySav.url}`} target="_blank" rel="noopener">
          SignalConso
        </a>
      </p>
      <p>En cas de problème, pensez à Signal Conso pour signaler les abus et défendre vos droits de consommateur !</p>
    </div>
  )
}
