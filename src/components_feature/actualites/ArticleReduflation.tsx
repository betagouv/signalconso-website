import Link from 'next/link'
import Image from 'next/image'
import imgShrinkflation from '@/img/actualites/shrinkflation.png'

export function ArticleShrinkflation() {
  return (
    <div>
      <div className="flex gap-8 mb-8">
        <Image className="w-1/2" sizes={'150vw'} src={imgShrinkflation} alt="Shrinkflation Image" />
        <p className="w-1/2 text-2xl">
          Pour Olivia Grégoire, Ministre déléguée chargée des Entreprises du Tourisme et de la Consommation : « Quand
          shrinkflation rime avec manque d’information les consommateurs en sont les premières victimes. À compter du 1er juillet,
          une affichette sera apposée à proximité du produit lorsque sa quantité diminue et que son prix reste inchangé ou
          augmente. C’est un pas important dans le combat que je mène pour la transparence qu’on doit aux consommateurs. »
        </p>
      </div>

      <h2 className="mt-8">Réduflation ou shrinkflation : De quoi s’agit-il ?</h2>
      <p className="text-2xl">
        Réduflation et shrinkflation sont des termes issus de la contraction de "réduction" et "inflation" (et en anglais « shrink
        » qui signifie rétrécir ou réduire et inflation). Ils désignent des pratiques commerciales visant à masquer la diminution
        de la quantité de produits tout en maintenant voire en augmentant leurs prix.
      </p>
      <p className="text-2xl">
        Ces pratiques sont légales mais suscitent des critiques car les consommateurs peuvent difficilement les détecter lors de
        l'achat.
      </p>
      <h2 className="mt-8">Quelles mesures entreront en vigueur ?</h2>
      <p className="text-2xl">
        L’obligation d'informer les consommateurs de ces évolutions de quantité et de prix entrera en vigueur le 1er juillet 2024.
        Cette information devra être apportée par les distributeurs de produits de grande consommation dans les grandes et
        moyennes surfaces à proximité immédiate des produits concernés durant les deux mois qui suivent la date de
        commercialisation.
      </p>
      <p className="text-2xl">
        Concrètement, une affichette devra par exemple être apposée à proximité du produit lorsque la quantité diminue et que son
        prix reste inchangé ou augmente. La mention suivante devra être indiquée : « Pour ce produit la quantité vendue est passée
        de X à Y et son prix au (unité de mesure concernée) a augmenté de …% ou …€. »
      </p>
      <h2 className="mt-8">Quels produits seront concernés par cette obligation ?</h2>
      <p className="text-2xl">
        Cette obligation légale concerne les produits préemballés de grande consommation notamment les denrées alimentaires et les
        produits non alimentaires vendus en quantité constante (produits ménagers, produits pour bébés, etc.). Les denrées
        alimentaires préemballées à quantité variable ou vendues en vrac ne sont pas concernées.
      </p>
      <h2 className="mt-8">Quelles seront les sanctions en cas de non-respect de cette obligation ?</h2>
      <p className="text-2xl">
        Les manquements à cette obligation seront passibles d'amendes pouvant atteindre 3 000 € pour une personne physique et 15
        000 € pour une personne morale.
      </p>
      <p className="text-2xl">
        La DGCCRF pourra également prononcer des injonctions pouvant faire l'objet d'une mesure de publicité aux frais du
        professionnel.
      </p>
      <p className="text-2xl">
        Pour en savoir plus, visitez les sites suivants de la DGCCRF <br />
        👉{' '}
        <Link
          href="https://www.economie.gouv.fr/actualites/reduflation-shrinkflation-nouvelles-obligations-information-consommateurs"
          target="_blank"
        >
          Réduflation Shrinkflation
        </Link>
        <br />
        👉{' '}
        <Link
          href="https://www.economie.gouv.fr/dgccrf/reduflation-ou-shrinkflation-publication-de-larrete-ministeriel-reglementant-linformation"
          target="_blank"
        >
          Publication de l'arrêté ministériel réglementant l'information
        </Link>
        .
      </p>
      <p className="text-2xl">
        Vous avez constaté un cas de shrinkflation sans information à proximité ou vous avez des doutes quant au prix à l’unité de
        mesure affiché en rayon ? Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr/achat-magasin/faire-un-signalement">www.signal.conso.gouv.fr</Link>.
      </p>
    </div>
  )
}
