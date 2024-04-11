import Link from 'next/link'
import Image from 'next/image'
import imgBoiteCarton from '@/img/actualites/boite_carton.png'
import imgFauxSites from '*.png'
import React from 'react'

export function ArticlesOccasionReconditionnes() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgBoiteCarton} width={300} height={300} alt="" />
        </div>
        <p>
          Afin de faire des économies et de s’inscrire dans une consommation plus responsable, l’achat d’objets d’occasion est une
          alternative séduisante. Mais connaissez-vous les garanties qui couvrent ces achats ? Contre quels défauts vous
          protègent-elles et pour combien de temps ? D’ailleurs, quelles différences entre un produit neuf, d’occasion et
          reconditionné ? On vous explique.
        </p>
      </div>
      <h2>Objet neuf, d’occasion et reconditionné : quelles différences ?</h2>
      <p>
        Un objet d’occasion se distingue aisément d’un bien neuf. Vous achetez un objet neuf quand vous en êtes le{' '}
        <strong>premier consommateur à être propriétaire du bien.</strong>
        <br />
        Si vous faites l’acquisition d’un <strong>objet ayant précédemment été acquis par au moins une personne</strong>, cet
        objet est considéré comme un <strong>bien d’occasion</strong>, qu’importe son état.
        <br />
        Un objet reconditionné est également{' '}
        <strong>un produit de seconde main, mais contrôlé et réparé si nécessaire, avant d’être remis en vente.</strong>
      </p>
      <h2>Pourquoi acheter d’occasion ou reconditionné ?</h2>
      <p>
        Ces pratiques alternatives à l’achat neuf permettent de prolonger la durée d’utilisation des produits, et ainsi de réduire
        la consommation de ressources. Par exemple, acheter un ordinateur portable reconditionné, c’est 127 kg d’extraction de
        matières et l’équivalent de 82 km en voiture d’émissions de CO2 évités pour chaque année d’utilisation.
      </p>
      <h2>Bien d’occasion ou reconditionné : quelles garanties ?</h2>
      <p>
        Dans le cadre d’un achat, que le bien soit d’occasion ou reconditionné, 
        <strong>sachez qu'il peut être couvert par un certain nombre de garanties :</strong>
      </p>
      <h3>La garantie légale de conformité</h3>
      <p>
        Vous bénéficiez d’une garantie légale de conformité pour l’achat de tout bien neuf, mais aussi d’<strong>occasion</strong>
         et <strong>reconditionné</strong>. Cette garantie est un droit obligatoire fixé par la loi d’une durée de{' '}
        <strong>deux ans.</strong>
        <br />
        Attention : au-delà de la première année (pendant laquelle le défaut de conformité est présumé) il vous appartient de
        prouver que ce défaut existait l’antériorité du défaut à la vente.
      </p>
      <p>
        Cette garantie couvre :
        <ul>
          <li>
            les biens impropres à l'usage habituellement attendu d'un bien semblable (par exemple, produit habituellement prévu
            pour fonctionner sans fil sur batterie qui doit finalement être branché sur secteur)
          </li>
          <li>
            les biens qui ne correspondent pas à la description donnée par le vendeur même s'ils fonctionnent parfaitement (par
            exemple, la couleur ne correspond pas au modèle présenté)
          </li>
          <li>
            les biens qui ne possèdent pas les qualités annoncées par le vendeur ou convenues avec vous (par exemple, une hotte
            aspirante présentée comme particulièrement silencieuse s’avérant bruyante).
          </li>
          <li>les biens qui présentent un défaut de fabrication, une imperfection, un mauvais assemblage</li>
          <li>
            une installation qui n'a pas été faite correctement par le vendeur ou manuel d'installation incomplet ou
            incompréhensible vous empêchant de monter l'appareil convenablement.
          </li>
        </ul>
      </p>
      <p>
        La garantie légale de conformité ne concerne pas les biens vendus aux enchères publiques ou par un commissaire de justice.
        <br />
        <strong>
          Les contrats doivent être conclus entre un consommateur et un vendeur professionnel. La garantie ne s'applique pas en
          cas de vente entre deux particuliers ou entre deux professionnels.
        </strong>
        <br />
        Dans le cadre de la garantie légale de conformité, vous pouvez bénéficier de la <strong>réparation</strong> ou du 
        <strong>remplacement</strong> du produit non conforme. Notez qu’en cas de différence de coût évidente entre les deux
        options, le vendeur peut imposer l'option la moins chère 
        <strong>à condition que cette option ne crée pas d’inconvénient majeur pour le consommateur.</strong>
        <br />
        Si vous mettez en œuvre la garantie pendant le délai de rétractation (14 jours à partir de la réception du bien en cas de
        démarchage à domicile ou de vente à distance), celui-ci sera interrompu. Le décompte du délai de rétraction démarrera dès
        la livraison d'un nouveau produit conforme, qu'il soit réparé ou remplacé.
      </p>
      <h3>La garantie des vices cachés</h3>
      <p>
        La garantie des vices cachés couvre tout achat d’un produit neuf, d’<strong>occasion</strong> et 
        <strong>reconditionné, excepté pour les biens issus de ventes aux enchères</strong>. Le délai pour agir est de deux ans à
        compter de la découverte du vice.
        <br />
        Pour faire jouer la garantie, vous devez pouvoir démontrer que le défaut affectant le bien était non apparent, de nature à
        en compromettre l’utilisation et antérieur à la vente.
        <br />
        Dans le cadre d’un achat d’un bien <strong>d’occasion</strong> ou <strong>reconditionné</strong>, fournir cette preuve
        peut s’avérer délicat. Aussi, pensez bien à{' '}
        <strong>toujours inspecter un objet de seconde main avant de conclure la vente</strong> et procéder au paiement.
        <br />
        Notez que le vendeur est responsable des vices cachés, quand bien même il ne les connaissait pas au moment de la vente.
      </p>
      <h3>La garantie commerciale</h3>
      <p>
        La garantie commerciale est une garantie supplémentaire, par rapport à la garantie légale, qui peut potentiellement{' '}
        <strong>couvrir le bien acheté d'occasion</strong> ou <strong>reconditionné</strong>.
        <br />
        Elle est facultative et contractuelle, payante ou gratuite. Autrement dit, lorsqu’une garantie commerciale est proposée
        par un vendeur, lisez soigneusement les termes du contrat avant de signer !
      </p>
      <p>
        Pour en savoir plus 👉{' '}
        <Link href="https://www.economie.gouv.fr/particuliers/objet-occasion-reconditionne-garantie#" target="_blank">
          https://www.economie.gouv.fr/particuliers/objet-occasion-reconditionne-garantie#
        </Link>
      </p>
      <p>
        <strong>Vous avez rencontré un problème en tant que consommateur ?</strong> Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank">
          https://signal.conso.gouv.fr/fr
        </Link>{' '}
        catégorie « Achat en magasin » ou « Achat sur internet »
      </p>
    </div>
  )
}
