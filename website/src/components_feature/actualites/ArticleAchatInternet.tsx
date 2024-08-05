import imgAchatInternet from '@/img/actualites/achatInternet.jpg'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleAchatInternet() {
  return (
    <div>
      <p>
        Faire ses courses, louer un gîte, offrir un cadeau, ..., c'est parfois bien plus pratique qu'en magasin. Pas question pour
        autant d'en oublier toute vigilance ! Quelles sont les précautions à prendre ? À qui s'adresser en cas de litige ?
      </p>
      <p>
        Lorsque vous commandez en ligne, vous effectuez un achat à distance encadré par le Code de la consommation (art. L221-1)
        qui impose des obligations au vendeur en ligne et donne des droits au consommateur.
      </p>
      <h2 className="fr-h6">Vérifiez l'identité du vendeur et sa e-réputation</h2>
      <p>
        Avant toute commande, il est recommandé de contrôler que le site n'est pas purement virtuel mais qu'il y a bien une
        entreprise réelle derrière celui-ci. Les vendeurs en ligne sont tenus de mettre à la disposition des consommateurs des
        informations claires et facilement accessibles. La e-réputation peut être vérifiée en entrant le nom du site ou du produit
        sur un moteur de recherche, éventuellement associé avec le terme « arnaque ».
      </p>
      <h2 className="fr-h6">Consultez les conditions générales de vente et les mentions légales</h2>
      <p>
        Figurant en général en bas de la page d'accueil, les conditions générales de vente (CGV) fournissent à l'acheteur de
        précieux renseignements sur les conditions de vente, le barème des prix, les conditions de règlement et d'exercice du
        droit de rétractation (éventuels frais de retours). N'oubliez pas les mentions légales (nom, dénomination sociale,
        l'adresse, les contacts, le numéro de téléphone, l'adresse électronique), elles sont obligatoires !
      </p>
      <h2 className="fr-h6">Méfiez-vous des clauses abusives</h2>
      <p>
        Lorsque vous achetez sur internet via une plateforme, vous concluez un contrat. Ce contrat est soumis aux articles L.
        212-1 et suivants du code de la consommation qui interdit les clauses qui créent ou peuvent créer un déséquilibre
        significatif entre les droits et obligations des parties au contrat, au détriment du consommateur.
      </p>
      <h2 className="fr-h6">Préférez un site français ou européen</h2>
      <p>
        Les sites marchands basés en France ou en Europe offrent davantage de garanties que ceux installés hors Union européenne
        et qui n'indiquent pas toujours les droits de douane et de TVA. En cas de litige, vos recours contre des sites étrangers
        auront peu de chance d'aboutir. Sachez qu'un site en « .fr » peut légalement ne pas être édité par une société française.
        La lecture des « mentions légales » permet de lever toute ambiguïté.
      </p>
      <h2 className="fr-h6">Contrôlez les caractéristiques du produit</h2>
      <p>
        N'achetez pas à l'aveuglette ! Puisque vous ne pouvez ni le toucher, ni l'essayer, ni interroger le vendeur, lisez
        attentivement le descriptif du produit (ne vous contentez pas de la photo). Vous devez avoir accès à un maximum
        d'informations sur le produit ou le service acheté : dénomination complète, qualité, taille ou mesures, composition,
        accessoires fournis, etc. Les informations doivent figurer en français.
      </p>
      <p>
        Pour en savoir plus, visitez le site de la{' '}
        <Link href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/acheter-sur-internet">
          DGCCRF - Acheter sur Internet
        </Link>
        .
      </p>
      <p>
        Vous avez rencontré un problème en tant que consommateur ? Signalez-le sur{' '}
        <Link href="https://www.signal.conso.gouv.fr">www.signal.conso.gouv.fr</Link>, le site de la DGCCRF dédié au règlement à
        l'amiable des litiges de la consommation.
      </p>
      <Image className="w-auto h-auto" sizes={'150vw'} src={imgAchatInternet} alt="" />
    </div>
  )
}
