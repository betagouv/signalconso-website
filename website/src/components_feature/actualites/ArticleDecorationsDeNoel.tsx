import Image from 'next/image'
import Link from 'next/link'
import imgDecoSecurite from '@/img/actualites/deco_securite.jpg'

export function ArticleDecorationsDeNoel() {
  return (
    <div className="sc-article">
      <Image
        src={imgDecoSecurite}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p className={'mt-3'}>
        Les fêtes de fin d’année approchent. Les vitrines illuminées émerveillent petits et grands, et la magie se prolonge à la
        maison avec les <strong>sapins décorés de guirlandes</strong> scintillantes.&nbsp;Mais attention,{' '}
        <strong>guirlandes électriques, bougies décoratives</strong> ou autres <strong>ornements festifs</strong> peuvent
        représenter des risques s’ils sont mal conçus ou mal utilisés.
      </p>

      <h3 id="Points-de-vigilance-et-conseils">Points de vigilance et conseils</h3>

      <p>
        Pour éviter que la féérie ne tourne au drame, voici les points essentiels à vérifier avant votre achat et les précautions
        à prendre lors de l’utilisation de vos décorations.
      </p>

      <h3 id="Lors-de-l’achat--misez-sur-la-sécurité">Lors de l’achat : misez sur la sécurité</h3>

      <ul>
        <li>
          <strong>Les arbres artificiels</strong> : Inspectez les extrémités des branches pour détecter d’éventuels défauts.
        </li>
        <li>
          <strong>Les produits électriques</strong> : Assurez-vous qu’ils comportent les avertissements de sécurité, le marquage
          CE et les informations du fabricant ou de l’importateur. Ces mentions attestent de leur conformité aux normes
          européennes.
        </li>
        <li>
          <strong>Les décorations d’extérieur</strong> : Vérifiez que les guirlandes lumineuses et leurs blocs d’alimentation sont
          spécifiquement conçus pour résister aux conditions extérieures. Cela est généralement indiqué en toutes lettres sur
          l’emballage.
        </li>
      </ul>

      <h3 id="Lors-de-l’utilisation--adoptez-les-bons-gestes">Lors de l’utilisation : adoptez les bons gestes</h3>

      <ul>
        <li>
          <strong>Pas de bougies sur les sapins</strong> : Évitez d’allumer des bougies accrochées aux branches ou d’utiliser des
          cierges magiques à proximité. Ces derniers projettent des étincelles et augmentent le risque d’incendie.
        </li>
        <li>
          <strong>Attention au flocage</strong> : Si votre sapin est recouvert de neige ou de givre artificiel, tenez-le à
          distance des flammes ou de tout corps incandescent. Ces produits sont particulièrement inflammables.
        </li>
        <li>
          <strong>Surveillance des guirlandes électriques</strong> : Ne laissez jamais des guirlandes branchées sans surveillance.
          Une surchauffe ou un court-circuit pourrait provoquer un incendie.
        </li>
      </ul>

      <p>
        <strong>Vous constatez un problème ? Faites un signalement sur SignalConso !</strong>
      </p>

      <p>
        Si vous remarquez un défaut, un produit non conforme ou dangereux (défaut de sécurité, absence de marquage…), pensez à
        faire un signalement sur{' '}
        <Link href="https://signal.conso.gouv.fr/" target="_blank" rel="noopener">
          SignalConso
        </Link>
        . Votre vigilance permet de protéger les autres consommateurs et de garantir des fêtes sereines et sans danger pour tous.
      </p>

      <p>🎅 Pour en savoir plus, rendez-vous sur les fiches pratiques dédiées :</p>

      <ul>
        <li>
          <Link
            href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/sapins-et-decorations-conseils-et-s%C3%A9curit%C3%A9"
            target="_blank"
            rel="noopener"
          >
            Les sapins et décorations
          </Link>
        </li>
        <li>
          <Link
            href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/guirlandes-electriques"
            target="_blank"
            rel="noopener"
          >
            Les guirlandes électriques
          </Link>
        </li>
        <li>
          <Link
            href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Le-marquage-CE"
            target="_blank"
            rel="noopener"
          >
            Marquage CE
          </Link>
        </li>
      </ul>
    </div>
  )
}
