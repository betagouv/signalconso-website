import Image from 'next/image'
import imgHalloween from '@/img/actualites/halloween.png'
import Link from 'next/link'
import playStore from '@/img/actualites/download-play-store.png'
import appStore from '@/img/actualites/download-app-store.svg'

export function ArticleHalloweenConfiseries() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <Image src={imgHalloween} width={470} height={313} alt="" />
        <p>
          Halloween, c'est le moment préféré des enfants pour remplir leurs paniers de friandises. Mais même si l'ambiance est
          festive, il est important de prêter attention à la <strong>sécurité des confiseries</strong>. Voici ce qu'il faut savoir
          pour que cette fête reste un plaisir, sans mauvaises surprises.
        </p>
      </div>

      <h2 className="text-2xl">Confiseries : Quels sont les risques ?</h2>
      <p>
        Les confiseries, ces petites gourmandises majoritairement composées de sucre, d’arômes, de colorants et parfois de
        matières grasses, ne sont pas toujours inoffensives.
      </p>
      <p>
        Certaines d’entre elles ne présentent pas toutes les garanties de sécurité et peuvent mettre en danger la santé des plus
        jeunes. Voici les risques les plus courants :
      </p>

      <ul className="mb-8">
        <li className="mb-4">
          <strong>Eléments et substances dangereuses :</strong> Selon les enquêtes de la <strong>DGCCRF</strong>, certaines
          confiseries peuvent contenir des <strong>substances allergisantes</strong> comme les arachides, ou des{' '}
          <strong>additifs non autorisés</strong> tels que les sulfites. Plus grave encore, des <strong>corps étrangers</strong>{' '}
          comme des morceaux de métal ou des insectes ont parfois été retrouvés dans certains produits.
        </li>
        <li className="mb-4">
          <strong>Suffocation et étouffement :</strong> Les bonbons, notamment ceux qui sont durs ou de forme irrégulière, peuvent
          être difficiles à mâcher et représentent un risque d’étouffement ou de <strong>suffocation</strong>, surtout pour les
          jeunes enfants qui pourraient les avaler sans les mastiquer correctement. De plus, certaines friandises accompagnées de{' '}
          <strong>gadgets</strong> peuvent contenir des pièces non comestibles qui risquent d'être avalées accidentellement. Ces
          éléments, parfois mal détachés de la confiserie, peuvent causer de graves accidents. C'est pourquoi une réglementation
          stricte encadre désormais la vente de ce type de produits.
        </li>
        <li>
          <strong>La réglisse :</strong> Un autre danger plus subtil concerne la réglisse. Utilisée dans de nombreuses
          confiseries, la <strong>racine de réglisse</strong> contient de la glycyrrhizine, une substance qui, consommée en excès
          (plus d’un gramme par jour), peut provoquer de l'hypertension ou des déséquilibres du potassium dans le sang
          (hypokaliémie). Il est donc recommandé de limiter la consommation de confiseries à base de réglisse, surtout chez les
          enfants et les personnes sensibles à ces effets.
        </li>
      </ul>

      <h2 className="text-2xl">Pour vous protéger, pensez à vérifier l’origine des produits et à vérifier les rappels</h2>

      <p>
        Saviez-vous que les confiseries provenant de pays hors de l’Union européenne sont souvent plus à risque ? Selon la{' '}
        <strong>DGCCRF</strong>, 50 % des produits venant de ces pays sont jugés « à surveiller » ou « non conformes », contre 33
        % pour ceux fabriqués en Europe. C’est un bon indicateur pour vous aider à choisir des confiseries de qualité.
      </p>
      <p>
        De plus, pour être sûr que les produits que vous achetez ne font pas l’objet d’un{' '}
        <strong>rappel pour des raisons de sécurité</strong>, l’application <strong>SignalConso</strong> est désormais là pour
        vous aider. En quelques instants, vous pouvez vérifier les produits rappelés et signaler ceux qui vous semblent suspects.
      </p>
      <p>Halloween doit rester un moment de plaisir pour les enfants, mais la sécurité ne doit pas être négligée.</p>

      <p>
        <strong>Pour plus d’informations</strong> sur la sécurité des confiseries et les produits rappelés, consultez la{' '}
        <Link
          href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Confiseries-et-gadgets"
          target="_blank"
        >
          fiche pratique de la DGCCRF sur les confiseries et gadgets
        </Link>
      </p>
      <p>
        <strong>Nouvelle fonctionnalité pratique :</strong> L’application <strong>SignalConso</strong> vous permet désormais de
        vérifier si les produits que vous achetez font l'objet d'un rappel pour des raisons de sécurité.
      </p>

      <h2 className="text-2xl">Liens vers SignalConso sur les stores 👉</h2>

      <div className="flex justify-around mb-8">
        <Link href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso&hl=ln&pli=1" className="!bg-none">
          <Image src={playStore} width={135} height={40} alt="Télécharger sur Google Play store" />
        </Link>
        <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093" className="!bg-none">
          <Image src={appStore} width={135} height={40} alt="Télécharger sur l'App store'" />
        </Link>
      </div>
    </div>
  )
}
