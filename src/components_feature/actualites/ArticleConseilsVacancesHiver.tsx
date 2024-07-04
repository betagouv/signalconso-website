import conseilDeConsommation from '@/img/actualites/conseilDeConsommation.jpg'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleConseilsVacancesHiver() {
  return (
    <div>
      <p>
        Les vacances d'hiver 2024 sont proches. Pour qu'elles soient sereines, la DGCCRF vous fournit quelques conseils de
        consommation relatifs aux voyages, séjours et sorties de loisirs.
      </p>
      <p>
        Vous avez programmé pour vos vacances d'hiver 2024 des loisirs et des sorties ? Vous avez prévu de vous évader quelques
        jours avec un séjour hors des sentiers battus ? Avant votre départ renseignez-vous sur vos droits.
      </p>
      <h2 className="fr-h6">Lorsque vous utilisez un comparateur : vérifiez ses critères de classement</h2>
      <p>
        Tout site de comparaison en ligne est tenu d'indiquer les critères de classement des offres de biens et de services et les
        conditions dans lesquelles il référence ses offres, ainsi que les relations contractuelles ou liens financiers qu'il
        entretient avec les professionnels dont il compare les biens ou les services.
      </p>
      <h2 className="fr-h6">Vous avez un problème avec votre hébergement : consultez les conditions générales de vente</h2>
      <p>
        Si vous annulez votre réservation d'hôtel, l'hôtelier ne vous remboursera pas les arrhes déjà versées, sauf geste
        commercial de sa part ou si avez souscrit une assurance annulation spécifique. L'hôtelier peut aussi annuler votre
        réservation mais dans ce cas, il doit vous rembourser deux fois le montant des arrhes versées.
      </p>
      <h2 className="fr-h6">Vous voyagez en train, en avion ou en autocar : vous pouvez être indemnisé en cas de retard</h2>
      <p>
        En Europe, les droits des voyageurs ferroviaires sont régis par le Règlement (CE) No1371/2007. C'est notamment ce
        règlement qui impose aux entreprises ferroviaires des obligations minimales d'indemnisation des voyageurs. Il impose aux
        entreprises ferroviaires des obligations minimales d'indemnisation des voyageurs.
      </p>
      <h2 className="fr-h6">Vous avez réservé un séjour mais l'agence annule : votre indemnisation dépend des circonstances</h2>
      <p>
        Si l'agence de voyage annule votre séjour, elle doit vous en informer par lettre recommandée avec accusé de réception et
        vous rembourser l'intégralité des sommes versées. Par ailleurs, elle doit vous verser une indemnité au moins égale à celle
        que vous auriez encourue si vous aviez résilié à la même date. Si votre préjudice est supérieur à cette indemnité (par
        exemple si vous avez réservé une activité coûteuse…), vous pouvez demander des indemnités complémentaires. Cette
        indemnisation ne sera néanmoins pas due si le voyage est soumis à la condition d'un minimum de voyageurs et si
        l'annulation intervient plus de 21 jours avant la date de départ.
      </p>
      <h2 className="fr-h6">
        Vous souhaitez souscrire une assurance pour partir au ski : vérifier que vous n'êtes pas déjà couvert
      </h2>
      <p>
        Si vous souhaitez souscrire un contrat d'assurance spécifique pour couvrir les risques liés aux vacances à la montagne,
        vérifiez auparavant que vous n'êtes pas déjà couvert par d'autres assurances. Si vous possédez une assurance multirisques
        habitation, vous disposez déjà de la garantie responsabilité civile. Cette assurance vous couvre si vous provoquez un
        accident. Certaines cartes bancaires comportent des assurances qui peuvent vous couvrir en cas d'accident. Pour bénéficier
        de ces assurances lors d'un voyage à la montagne, il faut avoir utilisé la carte pour payer la location de vos skis ou
        votre forfait de remontée.
      </p>
      <p>
        Pour en savoir plus 👉{' '}
        <Link href="https://www.economie.gouv.fr/dgccrf/vacances-dhiver-2024-pour-des-loisirs-sans-souci">
          DGCCRF - Vacances d'hiver 2024
        </Link>
      </p>
      <p>
        Vous avez rencontré un problème en tant que consommateur ? Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr/voyage-loisirs/faire-un-signalement">www.signal.conso.gouv.fr</Link>
      </p>
      <Image src={conseilDeConsommation} alt="Achat sur Internet" width={600} height={400} />
    </div>
  )
}
