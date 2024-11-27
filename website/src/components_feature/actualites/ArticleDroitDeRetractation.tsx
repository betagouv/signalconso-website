import imgDroitDeRetractation from '@/img/actualites/droit-de-retractation.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleDroitDeRetractation() {
  return (
    <div className="sc-article">
      <Image
        src={imgDroitDeRetractation}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Le Black Friday c’est la période des bonnes affaires, avec des promotions spectaculaires et des offres alléchantes.
        Cependant, en tant que consommateur, il est essentiel de connaître vos droits pour éviter les mauvaises surprises,
        notamment en ce qui concerne le <strong>droit de rétractation</strong>.
      </p>

      <h2>Qu’est-ce que le droit de rétractation ?</h2>

      <p>
        Le droit de rétractation est prévu par le Code de la consommation. Il permet aux consommateurs de changer d’avis après un
        achat à distance ou hors établissement (internet, téléphone, ou lors de démarchages).
      </p>
      <p>
        En effet, vous disposez d’un délai de <strong>14 jours calendaires</strong> pour changer d’avis à compter :
      </p>
      <ul>
        <li>De la réception du produit, pour les biens.</li>
        <li>De la conclusion du contrat, pour les services.</li>
      </ul>
      <p>
        Ce droit permet de retourner un article ou d’annuler un service sans avoir à justifier votre décision ni à payer de
        pénalité. Seuls les frais de retour peuvent être à votre charge.
      </p>

      <h2>Le droit de rétractation s’applique-t-il pendant le Black Friday ?</h2>

      <p>
        Les promotions ou ventes spéciales telles que le Black Friday n’annulent pas le droit de rétractation. Les consommateurs
        bénéficient des mêmes protections légales que pour tout achat effectué en dehors de cette période.
      </p>

      <h2>
        <strong>Quelles sont les exceptions au droit de rétractation ?</strong>
      </h2>

      <p>Certaines situations ne permettent pas de bénéficier de ce droit. C’est le cas notamment pour :</p>
      <ul>
        <li>Les biens personnalisés ou sur mesure.</li>
        <li>
          Les articles scellés qui ne peuvent être retournés pour des raisons d’hygiène ou de protection de la santé après
          ouverture.
        </li>
        <li>Les biens susceptibles de se détériorer rapidement.</li>
        <li>Les enregistrements audio, vidéo ou logiciels descellés.</li>
      </ul>

      <h2>Comment exercer votre droit de rétractation ?</h2>

      <ol>
        <li>
          <strong>Informer le vendeur</strong> : Vous devez notifier votre décision de rétractation au vendeur dans le délai
          imparti, idéalement par écrit. Certains sites proposent des formulaires en ligne pour faciliter cette démarche.
        </li>
        <li>
          <strong>Retourner le produit</strong> : Une fois la rétractation signalée, vous avez 14 jours pour renvoyer l’article.
        </li>
        <li>
          <strong>Obtenir un remboursement</strong> : Le vendeur est tenu de vous rembourser dans un délai de 14 jours après
          réception du produit ou preuve de son renvoi.
        </li>
      </ol>

      <h2>Astuces pour éviter les mauvaises surprises</h2>

      <ul>
        <li>
          <strong>Vérifiez les conditions générales de vente</strong> : Certains marchands peuvent proposer des délais de retour
          prolongés pendant le Black Friday, mais cela reste un geste commercial et non une obligation légale.
        </li>
        <li>
          <strong>Lisez les avis sur le marchand</strong> : Assurez-vous que le site ou le vendeur est fiable, surtout pour les
          achats en ligne.
        </li>
        <li>
          <strong>Gardez vos preuves d’achat et de retour</strong> : Ces documents peuvent être essentiels en cas de litige.
        </li>
      </ul>
      <p>
        Pendant le Black Friday, il est facile de se laisser emporter par l’euphorie des bonnes affaires. Toutefois, connaître vos
        droits, et notamment celui de rétractation, est essentiel pour faire des achats en toute sérénité. En cas de doute,
        n’hésitez pas à vous informer et à agir pour faire respecter vos droits en tant que consommateur.
      </p>

      <p>
        <strong>
          Pour faire des achats éclairés et profiter des promotions sans stress rendez vous sur{' '}
          <Link href="https://signal.conso.gouv.fr/fr/black-friday-droit-retractation" target="_blank" rel="noopener">
            Signal Conso
          </Link>
        </strong>
      </p>
    </div>
  )
}
