import Link from 'next/link'
import Image from 'next/image'
import imgMagasinBrocante from '@/img/actualites/magasin_brocante.png'
import React from 'react'

export function ArticleMagasinsEphemeres() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgMagasinBrocante} width={400} height={300} alt="" />
        </div>
        <p>
          <strong>
            Vous êtes invités à vous rendre dans un magasin d’ameublement pour y retirer des cadeaux, ou bien dans un local de
            vente inhabituel pour y participer à une démonstration commerciale ? Soyez-vigilant : ces vendeurs utilisent en effet
            des méthodes de vente particulièrement agressives et trompeuses susceptibles de vous porter préjudice.
          </strong>
        </p>
      </div>
      <h2>Quels sont les cas de figure les plus fréquents ?</h2>
      <p>
        <ul>
          <li>
            Les ventes en bail précaire de meubles :{' '}
            <strong>
              vous avez été démarché téléphoniquement et vous avez reçu, à la suite de ce démarchage, une invitation personnelle à
              venir retirer des cadeaux dans un magasin de meubles récemment ouvert, voire à participer à une loterie ?
            </strong>
          </li>
          <li>
            Les ventes au déballage d’articles de literie dans des hôtels ou restaurants : vous avez été démarché pour venir
            assister à une démonstration commerciale se déroulant dans un hôtel ou un restaurant ?
          </li>
        </ul>
      </p>
      <p>
        Convaincu par le discours commercial du vendeur ainsi que les remises importantes et les facilités de paiement proposées,
        vous avez acheté un ou plusieurs produits. Vous regrettez votre achat, mais vous êtes dans l’incapacité de contacter le
        vendeur.
      </p>
      <h2>Les conseils de la DGCCRF</h2>
      <p>
        <ul>
          <li>
            Le but du démarchage est d’attirer les consommateurs sur le lieu de vente. Si vous n’êtes pas intéressé par l’achat
            d’un meuble ou d’un article de literie, ne donnez pas suite à l’invitation. En dépit d’une présentation flatteuse, les
            cadeaux promis sont toujours de faible valeur, et la « loterie » donne systématiquement droit à un bon d’achat à
            valoir le jour de votre visite,
          </li>
          <li>
            Tous les meubles neufs mis en vente doivent comporter une étiquette sur laquelle figurent un certain nombre de
            mentions obligatoires. Prenez le temps de comparer les produits et les prix avec ceux vendus dans d’autres magasins de
            meubles ou d’articles de literie. Ne cédez pas aux éventuelles pressions des vendeurs pour conclure la vente le
            jour-même,
          </li>
          <li>
            Ne vous laissez pas influencer par le discours des vendeurs, qui vise uniquement à vous faire croire que vous faites
            une bonne affaire,
          </li>
          <li>
            N’accordez aucune confiance aux remises commerciales en cascade ou « exceptionnelles » qui vous sont consenties. Ces
            remises sont réalisées sur des prix artificiellement gonflés et sont proposées en réalité à tous les clients,
          </li>
          <li>
            Si les vendeurs vous proposent un crédit pour financer le bien, demandez une information claire sur les conditions de
            remboursement et le montant des mensualités, car les intérêts peuvent renchérir significativement le prix à payer. Ne
            signez jamais un document incomplet (par exemple, s’agissant de la date), a fortiori ne signez jamais un document en
            blanc,
          </li>
          <li>
            Quoi que vous disent les vendeurs, vous disposez d’un délai de rétractation de 14 jours pour revenir sur votre achat.
            Tant que ce délai court, vous pouvez exiger l’annulation de la vente et du crédit affecté auprès du magasin ou du
            vendeur, sans pénalité, sans avoir à vous justifier, et sans que les vendeurs ne puissent s’y opposer,
          </li>
          <li>
            Contactez la Direction Départementale chargée de la Protection des Populations territorialement compétente (
            <Link href="https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDETSPP" target="_blank">
              https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDETSPP
            </Link>
            ) si le magasin ou le vendeur refuse de faire droit à votre demande et/ou si vous considérez avoir fait l’objet de
            pratiques commerciales trompeuses ou agressives (harcèlement, tentatives d’intimidation, …), en y joignant, si
            possible, tous les documents commerciaux remis par les vendeurs,
          </li>
          <li>
            <strong>
              Ne tardez pas à réagir. Les magasins ou vendeurs sont installés pour de courte durée et peuvent changer d’adresse à
              tout moment.
            </strong>
          </li>
        </ul>
      </p>

      <p>
        Pour en savoir plus 👉
        <br />
        <Link
          href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/vente-meubles-dans-des-magasins-ephemeres-ou-darticles-literie-dans-des-hotels-ou-restaurants"
          target="_blank"
        >
          https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/vente-meubles-dans-des-magasins-ephemeres-ou-darticles-literie-dans-des-hotels-ou-restaurants
        </Link>
        <br />
        <Link
          href="https://www.nord.gouv.fr/Actualites/Actualites/Pratiques-commerciales-trompeuses-Mise-en-garde-des-consommateurs"
          target="_blank"
        >
          https://www.nord.gouv.fr/Actualites/Actualites/Pratiques-commerciales-trompeuses-Mise-en-garde-des-consommateurs
        </Link>
      </p>
      <p>
        <strong>Vous avez rencontré un problème en tant que consommateur ?</strong> Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank">
          https://signal.conso.gouv.fr/fr
        </Link>
      </p>
    </div>
  )
}
