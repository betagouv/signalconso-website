import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import imgEvolutionsQuantitePrix from '@/img/actualites/evolutions_quantite_prix.png'

export function ArticleEvolutionsQuantitePrix() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgEvolutionsQuantitePrix} width={300} height={175} alt="Consommateurs regardant des produits en magasin" />
        </div>
        <p>
          <strong>
            Pour Olivia Grégoire, Ministre déléguée chargée des Entreprises, du Tourisme et de la Consommation : « Quand
            shrinkflation rime avec manque d’information, les consommateurs en sont les premières victimes. A compter du 1er
            juillet, une affichette sera apposée à proximité du produit lorsque sa quantité diminue et que son prix reste inchangé
            ou augmente. C’est un pas important dans le combat que je mène pour la transparence qu’on doit aux consommateurs.
            (©sementsova321 - stock.adobe.com)
          </strong>
        </p>
      </div>
      <h2 className="fr-h4">Réduflation ou shrinkflation : De quoi s’agit-il ?</h2>
      <p>
        Réduflation et shrinkflation sont des termes issus de la contraction de "réduction" et "inflation" (et en anglais « shrink
        » qui signifie rétrécir ou réduire, et inflation). Ils désignent des pratiques commerciales visant à masquer la diminution
        de la quantité de produits tout en maintenant voire en augmentant leurs prix.
      </p>
      <p>
        Ces pratiques sont légales mais suscitent des critiques car les consommateurs peuvent difficilement les détecter lors de
        l'achat.
      </p>
      <h2 className="fr-h4">Quelles mesures entreront en vigueur ?</h2>
      <p>
        L’obligation d'informer les consommateurs de ces évolutions de quantité et de prix entrera en vigueur le 1er juillet 2024.
        Cette information devra être apportée par les distributeurs de produits de grande consommation dans les grandes et
        moyennes surfaces, à proximité immédiate des produits concernés durant les deux mois qui suivent la date de
        commercialisation.
      </p>
      <p>
        Concrètement, une affichette devra par exemple être apposée à proximité du produit lorsque la quantité diminue et que son
        prix reste inchangé ou augmente. La mention suivante devra être indiquée : « Pour ce produit, la quantité vendue est
        passée de X à Y et son prix au (unité de mesure concernée) a augmenté de …% ou …€. »
      </p>
      <h2 className="fr-h4">Quels produits seront concernés par cette obligation ?</h2>
      <p>
        Cette obligation légale concerne les produits préemballés de grande consommation, notamment les denrées alimentaires et
        les produits non alimentaires vendus en quantité constante (produits ménagers, produits pour bébés, etc.). Les denrées
        alimentaires préemballées à quantité variable ou vendues en vrac ne sont pas concernées.
      </p>
      <h2 className="fr-h4">Quelles seront les sanctions en cas de non-respect de cette obligation ?</h2>
      <p>
        Les manquements à cette obligation seront passibles d'amendes pouvant atteindre 3 000 € pour une personne physique et 15
        000 € pour une personne morale.
      </p>
      <p>
        La DGCCRF pourra également prononcer des injonctions pouvant faire l'objet d'une mesure de publicité aux frais du
        professionnel.
      </p>
      <p>
        Pour en savoir plus 👉
        <br />
        <Link
          href="https://www.economie.gouv.fr/actualites/reduflation-shrinkflation-nouvelles-obligations-information-consommateurs"
          target="_blank"
        >
          https://www.economie.gouv.fr/actualites/reduflation-shrinkflation-nouvelles-obligations-information-consommateurs
        </Link>
        <br />
        <Link
          href="https://www.economie.gouv.fr/dgccrf/reduflation-ou-shrinkflation-publication-de-larrete-ministeriel-reglementant-linformation"
          target="_blank"
        >
          https://www.economie.gouv.fr/dgccrf/reduflation-ou-shrinkflation-publication-de-larrete-ministeriel-reglementant-linformation
        </Link>
      </p>
      <p>
        <strong>
          Vous avez constaté un cas de shrinkflation sans information à proximité ou vous avez des doutes quant au prix à l’unité
          de mesure affiché en rayon ?
        </strong>{' '}
        Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr/achat-magasin/faire-un-signalement" target="_blank">
          https://signal.conso.gouv.fr/fr/achat-magasin/faire-un-signalement
        </Link>
      </p>
    </div>
  )
}
