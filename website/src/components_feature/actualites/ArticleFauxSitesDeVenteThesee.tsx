import Image from 'next/image'
import imgThesee from '@/img/actualites/thesee.png'
import Link from 'next/link'

export function ArticleFauxSitesDeVenteThesee() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgThesee} width={282} height={282} alt="" />
        </div>
        <p>
          Le parquet de Nanterre a confié à l'Office Anti-Cybercriminalité (OFAC) et à l'Office Central de Répression de la Grande
          Délinquance Financière (OCRGDF) une enquête judiciaire sur des escroqueries de grande envergure réalisées via de faux
          sites de vente. Ces investigations, supervisées par un juge d'instruction, ont conduit à l'arrestation de quatre
          individus, inculpés pour escroquerie en bande organisée et blanchiment d'argent, et placés en détention provisoire.
        </p>
      </div>

      <p>
        Ces suspects sont accusés d'avoir créé plusieurs sites internet prétendant vendre des articles de mobilier à prix réduits,
        tels que des tapis, des salons de jardin et de la literie. Les paiements étaient encaissés, mais aucune livraison n'avait
        lieu.
      </p>

      <section>
        <h3 className="font-bold text-base mb-0">Voici les principaux sites impliqués dans cette escroquerie :</h3>
        <ul className="font-bold">
          <li>casaconfo.com</li>
          <li>le-tech-village.com</li>
          <li>relaxsoria.com</li>
          <li>stockwan.com</li>
          <li>vanuaty.com</li>
          <li>vehrnex.com</li>
        </ul>
      </section>

      <h3 className="font-bold text-base mb-0 mt-8">Préjudice et nombre de victimes :</h3>
      <p>
        Plus de 20 000 commandes ont été passées sur ces sites frauduleux, causant un préjudice total de près de 4 millions
        d'euros.
      </p>
      <p className="text-xl font-bold mt-8">
        Si vous avez été victime de l’un des sites cités ci-dessus, vous pouvez déposer plainte en ligne sur{' '}
        <Link href="https://www.service-public.fr/particuliers/vosdroits/N31138#0_0_0_0_1_2" target="_blank">
          THESEE
        </Link>
        .
      </p>

      <p className="mt-8">
        <strong>Vous avez rencontré un problème en tant que consommateur ?</strong> Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank">
          https://signal.conso.gouv.fr/fr
        </Link>
      </p>
    </div>
  )
}
