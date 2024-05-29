import imgFauxSites from '@/img/actualites/ArticleFauxSitesAdministratifs.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleFauxSitesAdministratifs() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgFauxSites} alt="" width={300} height={300} />
        </div>
        <div>
          <p>
            <strong>
              La plupart des démarches administratives sont gratuites, pourtant de nombreux sites les font payer de manière
              frauduleuse
            </strong>
            . La DGCCRF évalue à 1 million le nombre de personnes abusées chaque année par ces arnaques en ligne, ce qui
            correspond à 150 millions d'euros facturés indûment. L'usager doit donc être attentif s'il est amené à payer un
            document. Quelques réflexes sont à acquérir afin ne pas se faire abuser par ces faux sites administratifs.
          </p>
          <p>
            Certains sites marchands spécialisés dans les documents administratifs achètent des mots clés qui permettent d'arriver
            en tête des résultats de recherche ; il s'agit dans ce cas de référencement commercial. L'usager, après avoir saisi
            les mots clefs relatifs à sa recherche de documents administratifs, est susceptible de cliquer ensuite sur l'un des
            premiers liens proposés sans prêter davantage attention au caractère marchand du site. Inversement, les sites
            officiels ne sont pas toujours référencés.
          </p>
        </div>
      </div>
      <h3>Conseils avant toute démarche ou comment repérer les arnaques :</h3>
      <ul>
        <li>
          Consulter toujours, et en premier lieu, le portail de l'administration{' '}
          <Link href="https://www.service-public.fr" target="_blank">
            www.service-public.fr
          </Link>{' '}
          qui recense tous les sites officiels en fonction des documents recherchés et le coût éventuel des démarches ;
        </li>
        <li>
          Vérifier l'url : les sites officiels de l'administration française doivent se terminer par « gouv.fr » ou « .fr » (par
          exemple les sites des mairies), jamais par « gouv.org », « gouv.com » ou « -gouv » ;
        </li>
        <li>
          Ne vous laissez pas abuser par les url utilisant des mots clés pseudo officiels et les sites ayant recours à des
          artifices tels que l'usage du bleu-blanc-rouge ou la Marianne ;
        </li>
        <li>
          Avant de procéder à un quelconque paiement, vérifiez bien la nature de la prestation (coût du document ou piège à
          l'abonnement) ;
        </li>
        <li>
          Les premiers résultats de recherche ne mettent pas forcément en avant les sites officiels ; le référencement payant est
          toujours signalé par le mot « annonce » ;
        </li>
        <li>
          Consulter les mentions légales du site pour identifier sa nature et son exploitant (attention s'il est situé à
          l'étranger);
        </li>
        <li>
          Lire attentivement les conditions générales de vente (CGV) qui constituent le contrat liant le professionnel et le
          consommateur ;
        </li>
        <li>Vérifier sur les sites officiels le caractère payant, ou non, de la prestation avant toute démarche.</li>
      </ul>

      <p>
        Pour en savoir plus{' '}
        <Link
          href="https://www.economie.gouv.fr/files/files/directions_services/dgccrf/securite/bro-faux-sites-web.pdf"
          target="_blank"
        >
          https://www.economie.gouv.fr/files/files/directions_services/dgccrf/securite/bro-faux-sites-web.pdf
        </Link>
      </p>

      <p>
        <strong>Vous avez rencontré un problème en tant que consommateur ?</strong> Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr/demarches-administratives/faire-un-signalement" target="_blank">
          https://signal.conso.gouv.fr/fr/demarches-administratives/faire-un-signalement
        </Link>
      </p>
    </div>
  )
}
