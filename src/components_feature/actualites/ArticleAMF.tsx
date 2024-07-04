import imgTrading from '@/img/actualites/trading.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleAMF() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgTrading} width={338} alt="" />
        </div>
        <p>
          Attention aux risques liés aux investissements sur des placements financiers hautement risqués et spéculatifs. Les
          pertes peuvent être considérables pour les non-initiés.
          <br />
          <strong>
            Pour protéger le consommateur, la loi interdit la publicité directe ou indirecte, diffusée par voie électronique, de
            ces investissements très risqués.
          </strong>{' '}
          La publicité sur la fourniture de services sur actifs numériques ou crypto actifs est également interdite, sauf dans des
          cas strictement limités.
        </p>
      </div>
      <p>
        Avant d’investir, il est <strong>indispensable</strong> de consulter{' '}
        <Link
          href="https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/listes-noires-et-mises-en-garde"
          target="_blank"
        >
          la liste noire des sociétés et sites non autorisés publiée sur le site de l'autorité des marchés financiers (AMF)
        </Link>
        . <strong>Cette liste non exhaustive est cependant régulièrement mise à jour.</strong>
      </p>
      <p>
        Il est également impératif de consulter le{' '}
        <Link href="https://www.regafi.fr/spip.php?rubrique1" target="_blank">
          registre des agents financiers
        </Link>{' '}
        les entreprises autorisées à exercer une activité bancaire, financière, de monnaie électronique ou de services de
        paiement, réglementée conformément au code monétaire et financier, publié et régulièrement mis à jour par l’ACPR (agence
        de contrôle prudentiel et de résolution)
      </p>
      <p>
        <strong>Pour l’investissement en crypto-actifs (crypto-monnaies, stable coin ou encore NFT)</strong>, l’AMF publie{' '}
        <Link
          href="https://www.amf-france.org/fr/espace-professionnels/fintech/mes-relations-avec-lamf/obtenir-un-enregistrement-un-agrement-psan#Liste_des_PSAN_enregistrs_auprs_de_lAMF"
          target="_blank"
        >
          la liste blanche des PSAN
        </Link>{' '}
        (prestataire de services sur actifs numériques) enregistrés et agrées auprès de ses services.
      </p>

      <p>
        <strong>L’essentiel</strong>
        <ul>
          <li>
            Ces offres ne sont pas destinées au grand public mais seulement aux professionnels qui sont conscients des risques
            associés à ces investissements.
          </li>
          <li>
            Soyez prudent face au copy-trading et aux promesses de gains faciles. La plupart des participants finissent par perdre
            leur capital en raison d’une prise de risque maximale et d'une méconnaissance des produits.
          </li>
          <li>
            Beaucoup d’arnaques existent lorsque vous êtes sollicité à investir via des publicités sur les réseaux sociaux ou des
            influenceurs. Dans ces cas-là, il devient alors très difficile voire impossible de récupérer son investissement de
            départ.
          </li>
          <li>
            Vous pouvez consulter la liste noire des sociétés et sites non autorisés, disponible sur le site de l’autorité des
            marchés financiers.
          </li>
        </ul>
      </p>

      <p>
        <strong className="underline">
          La publicité en ligne des produits financiers très risqués : une interdiction de principe
        </strong>
        <br />
        <strong>
          Les produits financiers très risqués sont des produits financiers, non régulés et extrêmement spéculatifs :
        </strong>
        <ul>
          <li>
            Le Forex, le marché sur lequel les devises sont échangées l’une contre l’autre à des taux de change qui varient en
            permanence ;
          </li>
          <li>
            Les options binaires qui permettent de « parier » sur la fluctuation d’un actif (indice, actions ou paire de devises)
            dans une période de temps donnée ;
          </li>
          <li>
            Les CFD (ou contrats for difference en anglais) qui permettent également de parier sur la fluctuation (à la hausse ou
            à la baisse) d’un actif sous-jacent, à la différence que la transaction entre le vendeur et l’acheteur se fait sur
            l’écart entre la valeur actuelle de l’actifs sous-jacent et sa valeur au moment de la vente.
          </li>
        </ul>
      </p>

      <p>
        Ces marchés s’adressent à un public professionnel ou initié, et y investir sans connaissances particulières est
        extrêmement risqué. En effet, en raison de la présence d’effets de levier, il est possible d’augmenter le facteur de
        risque et de perdre une somme d’argent supérieure à la somme investie initialement.
      </p>

      <p>
        <strong>
          En France, depuis 2016, le législateur interdit la publicité, directe ou indirecte, adressée par voie électronique, des
          produits financiers très risqués. En 2019, cette interdiction a été élargie aux publicités portant sur la fourniture de
          services sur actifs numériques, y compris les crypto-monnaies
        </strong>
        , sauf agrément ou enregistrement des prestataires auprès de l’Autorité des marchés financiers (AMF). L’objectif de cette
        interdiction est de veiller à ce que ces offres non régulées ne puissent pas être portées à la connaissance du grand
        public et soient réservées à des professionnels conscients des risques inhérents à ce type d’investissement.
      </p>

      <p>
        La DGCCRF est l’autorité chargée de veiller au respect de cette réglementation. Elle s’applique à l’ensemble de la chaine
        publicitaire, y compris aux influenceurs. Le non-respect de ces dispositions du code de la consommation est passible d’une
        amende administrative qui peut aller jusqu’à 100 000 euros.
      </p>

      <p>
        Pour en savoir plus 👉{' '}
        <Link
          href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/attention-aux-investissements-trading-en-ligne"
          target="_blank"
        >
          https://www.economie.gouv.fr/particuliers/objet-occasion-reconditionne-garantie#
        </Link>
      </p>
      <p>
        <strong>Vous avez rencontré un problème en tant que consommateur ?</strong> Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank">
          https://signal.conso.gouv.fr/fr
        </Link>{' '}
        catégorie « Internet (hors achats) »
      </p>
    </div>
  )
}
