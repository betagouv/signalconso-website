import {pagesDefs} from '@/core/pagesDefinitions'
import imgLivraison from '@/img/actualites/livraison.png'
import Image from 'next/image'

export function ArticleLivraisonBlackFriday() {
  return (
    <div className="sc-article">
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <Image src={imgLivraison} width={300} alt="" />
        <p>
          Le Black Friday c'est l'occasion de faire de bonnes affaires, mais c'est aussi la période de l'année où les commandes et
          les retards de livraison explosent. Entre attentes prolongées, colis abîmés ou non reçus, il est important de savoir
          comment anticiper les problèmes de livraison et quels sont vos droits en cas de souci.
        </p>
      </div>

      <h2>Comment anticiper les retards et problèmes de livraison ?</h2>
      <p>
        Pendant le Black Friday, les sites de vente en ligne sont souvent saturés et les transporteurs surchargés. Résultat : les
        délais de livraison s'allongent et les risques de retard augmentent. Pour réduire les risques :
      </p>
      <ul>
        <li>
          Privilégiez les sites avec des <b>délais de livraison garantis</b> ou une <b>option de suivi</b> pour pouvoir localiser
          votre colis.
        </li>
        <li>
          <b>Vérifiez les politiques de livraison et de retour</b> du site. Certains sites indiquent des délais très optimistes
          pendant les périodes de forte demande. Pensez à regarder les avis clients pour vous assurer de la fiabilité du marchand.
        </li>
      </ul>
      <h2>Quels sont vos droits en cas de livraison tardive ?</h2>
      <p>
        En France, un site doit respecter les délais de livraison indiqués lors de la commande. Si un délai n'est pas précisé, le
        site a un maximum de <b>30 jours pour vous livrer</b>. En cas de retard, envoyez une relance écrite au marchand en
        demandant une nouvelle date de livraison raisonnable. Si le colis n'est pas reçu dans ce <b>délai supplémentaire</b>, vous
        avez le droit d'annuler la commande et de demander un <b>remboursement sous 14 jours</b>.
      </p>
      <h2>Quels sont vos options en cas de colis abîmé ou non conforme ?</h2>
      <p>Si un colis arrive en mauvais état ou contenant un produit non conforme, vous avez plusieurs options :</p>
      <ul>
        <li>
          Vous pouvez <b>refuser le colis lors de la livraison</b> si vous remarquez des dommages visibles, ou notez des réserves
          précises.
        </li>
        <li>
          Si vous découvrez le problème après réception, <b>contactez le service client rapidement</b> pour demander un échange ou
          un remboursement selon les conditions de vente.
        </li>
      </ul>
      <h2>Que faire si votre colis n'arrive jamais ?</h2>
      <p>
        Il arrive que les colis soient égarés ou marqués comme “livrés” sans que vous les ayez reçus. Selon la loi, c'est le
        vendeur qui porte la responsabilité jusqu'à la remise du colis en mains propres alors contactez le rapidement.
        <br />
        Récapitulatif Anti-Galère avec les livraisons pendant le Black Friday
      </p>
      <ul>
        <li>
          <b>Vérifiez les délais annoncés</b> et optez pour les sites avec suivi de commande.
        </li>
        <li>
          <b>Gardez toutes les preuves d'achat</b> et de communication avec le vendeur en cas de litige.
        </li>
        <li>
          <b>Soyez vigilant à la réception</b> du colis et notez toute anomalie.
        </li>
        <li>
          <b>Connaissez vos droits</b> : remboursement en cas de retard ou de produit non reçu et droit de rétractation sous 14
          jours.
        </li>
      </ul>
      <p>
        Acheter en ligne pendant le Black Friday peut être une excellente affaire, à condition de bien préparer ses achats et
        d'être vigilant. En cas de problème, pensez à Signal Conso pour signaler les abus et défendre vos droits de consommateur !
      </p>
      <p>
        Pour en savoir plus rendez vous sur{' '}
        <a href={`/fr${pagesDefs.blackFridayColis.url}`} target="_blank" rel="noopener">
          SignalConso
        </a>
      </p>
    </div>
  )
}
