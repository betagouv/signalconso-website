import imgCharcuterie from '@/img/actualites/charcuterie.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleCheapflation() {
  return (
    <div className="sc-article">
      <Image
        src={imgCharcuterie}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Afin de détecter des <strong>pratiques de cheapflation</strong> dans le secteur de la <strong>charcuterie</strong> et des{' '}
        <strong>plats cuisinés</strong>, la <strong>DGCCRF</strong> a mené une <strong>enquête</strong> en 2023.
      </p>
      <p>
        La cheapflaton est une pratique consistant à <strong>remplacer</strong> des ingrédients coûteux par d’autres qui le sont
        moins, sans en informer les consommateurs via l’étiquetage. Les contrôles effectués ont révélé que cette tendance reste{' '}
        <strong>marginale</strong>. En revanche, d’autres <strong>irrégularités</strong> ont été mises en évidence lors des
        contrôles.
      </p>
      <h2 className="fr-h2">Une pratique de cheapflation peu répandue</h2>
      <p>
        Dans un <strong>contexte d’inflation</strong>, certains professionnels pourraient être tentés de modifier leurs recettes
        en remplaçant des ingrédients coûteux par d’autres de moindre qualité sans le signaler aux consommateurs. Cette pratique,
        appelée cheapflation, a fait l’objet d’une enquête menée par la DGCCRF en 2023 auprès de 155 établissements et portant sur
        651 produits (charcuterie, plats cuisinés à base de viande ou de poisson, etc.). Résultat : seuls{' '}
        <strong>5 % des produits analysés présentaient une anomalie</strong> relevant de cette pratique.
      </p>
      <p>
        Les investigations ont notamment cherché à identifier des substitutions d’espèces animales, des réductions de quantités
        d’ingrédients ou encore des mentions trompeuses sur l’étiquetage.
      </p>
      <h2 className="fr-h2">Un quart des établissements en infraction pour d’autres motifs que la cheapflation</h2>
      <p>
        Bien que la cheapflation soit rare,{' '}
        <strong>25 % des établissements contrôlés présentaient au moins une irrégularité</strong>. Parmi les 63 produits analysés,
        un tiers n’était pas conforme. Les principales anomalies relevées étaient :
      </p>
      <ul>
        <li>
          <p>Présence d’une espèce animale non mentionnée sur l’étiquette ;</p>
        </li>
        <li>
          <p>Absence de l’ingrédient annoncé ;</p>
        </li>
        <li>
          <p>
            Allégations trompeuses (exemple : produit étiqueté « sans conservateur » bien qu’il contienne en réalité du nitrate) ;
          </p>
        </li>
        <li>
          <p>Utilisation d’un ingrédient non autorisé.</p>
        </li>
      </ul>
      <h2 className="fr-h2">Des sanctions contre les pratiques trompeuses</h2>
      <p>
        Lorsque des cas de cheapflation ont été avérés, des <strong>sanctions</strong> ont été prises. Parmi les exemples relevés
        :
      </p>
      <ul>
        <li>
          <p>
            Un plat cuisiné annonçant une quantité de langue de bœuf supérieure à celle réellement présente a fait l’objet d’une
            injonction.
          </p>
        </li>
        <li>
          <p>
            Un producteur de tomates farcies a reçu un avertissement pour avoir remplacé une partie de la viande de porc par du
            gras de porc.
          </p>
        </li>
        <li>
          <p>
            Un fabricant de feuilletés au comté a écopé d’un procès-verbal pénal et d’une amende de 30 000 € pour avoir réduit la
            quantité de fromage de 2 % sans modifier l’étiquetage.
          </p>
        </li>
      </ul>
      <p>Au total, l’enquête a conduit à :</p>
      <ul>
        <li>
          <p>29 avertissements,</p>
        </li>
        <li>
          <p>10 injonctions (dont 3 pour cheapflation),</p>
        </li>
        <li>
          <p>2 procès-verbaux administratifs pour manquements à l’étiquetage,</p>
        </li>
        <li>
          <p>1 procès-verbal pénal pour pratique commerciale trompeuse.</p>
        </li>
      </ul>
      <h2 className="fr-h2">Une vigilance maintenue pour protéger les consommateurs</h2>
      <p>
        Cette enquête montre que si la cheapflation reste marginale dans le secteur de la charcuterie et des plats cuisinés, des{' '}
        <strong>pratiques trompeuses</strong> existent encore, notamment en matière{' '}
        <strong>d’étiquetage et de composition</strong> des produits. La DGCCRF continue de surveiller le marché afin de garantir
        aux consommateurs une information fiable et transparente.
      </p>
      <p>
        👉 Vous avez constaté un problème avec l’étiquetage ou la qualité d’un plat cuisiné ?{' '}
        <strong>
          Signalez-le sur{' '}
          <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
            SignalConso
          </Link>
        </strong>{' '}
        !
      </p>
      <p>
        Vos signalements aident à renforcer la <strong>transparence</strong> et à <strong>protéger</strong> les autres
        consommateurs.
      </p>
    </div>
  )
}
