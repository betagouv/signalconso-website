import imgFauxAvis from '@/img/actualites/fauxavis.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleFauxAvis() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <Image src={imgFauxAvis} width={451} height={300} alt="" />
        <p>
          Les avis clients en ligne sont devenus un facteur déterminant dans nos choix d’achat, qu’il s’agisse d’un produit, d’un
          restaurant ou d’un service. Cependant, de plus en plus de <strong>faux avis</strong> polluent les plateformes
          d’e-commerce, les sites de réservation et les réseaux sociaux, induisant les consommateurs en erreur. Ces{' '}
          <strong>pratiques</strong>, bien que <strong>trompeuses</strong>, sont encore fréquentes, et les faux avis peuvent nuire
          autant aux consommateurs qu’aux entreprises honnêtes.
        </p>
      </div>

      <h2 className="text-2xl">Qu'est-ce qu'un faux avis en ligne ?</h2>
      <p>
        Un faux avis est un commentaire publié par un utilisateur qui n’a pas réellement acheté ou utilisé le produit ou service
        concerné. Il existe plusieurs types de faux avis, notamment :
      </p>

      <ul className="mb-4">
        <li className="mb-2">
          <strong>Avis positifs fictifs :</strong> souvent rédigés pour promouvoir artificiellement une marque, un produit ou un
          service. Ils peuvent être rédigés par des professionnels payés ou par des bots.
        </li>
        <li className="mb-2">
          <strong>Avis négatifs abusifs :</strong> postés par des concurrents ou des personnes mal intentionnées pour nuire à la
          réputation d’une entreprise ou d’un professionnel.
        </li>
        <li className="mb-2">
          <strong>Avis rédigés en échange d’avantages :</strong> par exemple, un client reçoit une remise ou un produit gratuit en
          échange de la rédaction d'un avis positif.
        </li>
      </ul>

      <p>
        Ces pratiques nuisent à la confiance des consommateurs et créent une concurrence déloyale. C'est pourquoi elles sont
        strictement encadrées par la législation française.
      </p>

      <h2 className="text-2xl">Que dit la loi concernant la protection du consommateur contre les faux avis ?</h2>

      <p>
        En France, la réglementation impose des obligations strictes pour les plateformes de publication d’avis en ligne.
        Conformément au Code de la consommation, les entreprises doivent indiquer clairement si les avis publiés sont{' '}
        <strong>vérifiés</strong> (provenant de véritables acheteurs ou utilisateurs) ou non. Elles doivent également préciser la{' '}
        <strong>méthode de vérification</strong> utilisée pour s'assurer de <strong>l’authenticité</strong> des avis.
      </p>

      <p>
        De plus, selon la loi pour une République numérique, toute plateforme ou site qui propose des avis clients doit fournir
        aux utilisateurs des informations sur la manière dont ces avis sont collectés, modérés et publiés.
      </p>

      <p>Le code de la consommation interdit au professionnel de :</p>

      <ul className="mb-8">
        <li>De se présenter faussement comme un consommateur ;</li>
        <li>
          D’affirmer que des avis sont diffusés par des consommateurs ayant utilisé ou acheté le produit, sans avoir pris les
          mesures nécessaires pour le vérifier ;
        </li>
        <li>De diffuser, ou de faire diffuser par une autre personne, de faux avis :</li>
        <li>De modifier des avis de consommateurs pour promouvoir des produits.</li>
      </ul>

      <p>
        Les entreprises qui ne respectent pas ces règles s’exposent à des sanctions de la <strong>DGCCRF</strong> pour{' '}
        <strong>pratiques commerciales trompeuses</strong>. Ces sanctions peuvent aller jusqu’à deux ans d’emprisonnement et 300
        000 euros d’amende et s’accompagner de mesures correctrices pour protéger les consommateurs.
      </p>

      <p>
        Que ce soit un avis manifestement faux ou une plateforme qui ne respecte pas les obligations de vérification et de
        transparence, vous pouvez faire un signalement sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr/internet/faire-un-signalement">SignalConso</Link>.
      </p>
    </div>
  )
}
