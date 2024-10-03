import {pagesDefs} from '@/core/pagesDefinitions'
import Link from 'next/link'

export function ArticleJourneeAveuglesMalvoyants() {
  return (
    <div>
      <p>
        Le 4 octobre, à l'occasion de la Journée nationale des aveugles et malvoyants, il est important de rappeler les droits des
        personnes en situation de handicap accompagnées de chiens guides ou d'assistance. Ces animaux, indispensables à
        l'autonomie de leurs maîtres, doivent pouvoir accéder à tous les lieux accueillant du public sans discrimination.
      </p>
      <h2 className="text-2xl">Que dit la loi ?</h2>

      <p>
        En France, la loi du 11 février 2005 garantit l'accès aux lieux publics pour les personnes handicapées, y compris celles
        accompagnées de chiens guides ou d'assistance. Cela inclut non seulement les espaces publics (transports, commerces,
        restaurants, etc.), mais aussi les lieux privés accessibles au public. Refuser l'accès à un chien guide ou d'assistance
        est considéré comme une discrimination, passible d'une amende pouvant aller jusqu'à 450 €.
      </p>

      <h2 className="text-2xl">Les droits des personnes accompagnées de chiens guides</h2>
      <p>
        Un chien guide ou d'assistance permet aux personnes aveugles, malvoyantes ou présentant un autre handicap de se déplacer
        de manière autonome et sécurisée. Il est essentiel que ces animaux soient acceptés partout, même dans des lieux où les
        animaux de compagnie sont généralement interdits (restaurants, hôtels, transports en commun).
      </p>

      <p>
        Il est également important de noter que ces chiens sont éduqués pour ne pas déranger, et qu'ils n'ont en aucun cas besoin
        de muselière.
      </p>

      <h2 className="text-2xl">SignalConso, un outil pour signaler les refus d'accès</h2>
      <p>
        Malgré les réglementations en place, des incidents peuvent survenir. Si vous êtes témoin d'une situation où l'accès à un
        lieu public est refusé à une personne accompagnée d'un chien guide ou d'assistance, vous pouvez le signaler sur{' '}
        <Link href={pagesDefs.index.url}>SignalConso</Link>. Cette plateforme permet de rapporter les infractions et d'aider les
        autorités à agir contre ces pratiques discriminatoires.
      </p>
      <h2 className="text-2xl">Un engagement collectif</h2>

      <p>
        En cette Journée nationale des aveugles et malvoyants, rappelons l'importance de sensibiliser tous les acteurs
        (commerçants, restaurateurs, personnels d'accueil) à l'accueil des personnes en situation de handicap et de leurs chiens
        guides. Assurer un accès égal à tous les lieux publics est une responsabilité partagée et une avancée vers une société
        plus inclusive.
      </p>
      <p>
        Pour en savoir plus sur vos droits ou signaler un refus d'accès, rendez-vous sur{' '}
        <Link href={pagesDefs.index.url}>SignalConso</Link> !
      </p>
    </div>
  )
}
