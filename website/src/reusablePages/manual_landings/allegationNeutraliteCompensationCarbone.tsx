import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'

export function allegationNeutraliteCompensationCarbone(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex justify-center">
          <div className="flex flex-col max-w-4xl">
            <h1 className="text-white">
              Neutralité Carbone : Comment repérer les allégations douteuses et protéger vos droits en tant que consommateur avec
              SignalConso
            </h1>
            <p className="text-xl">
              Dans un contexte où la lutte contre le changement climatique est devenue une priorité, de plus en plus d'entreprises
              mettent en avant leur engagement en matière de <strong>neutralité carbone</strong> ou de{' '}
              <strong>compensation carbone</strong>. Toutefois, certaines de ces allégations peuvent être trompeuses, voire
              mensongères.
            </p>
            <p className="text-xl font-bold">Vous avez repéré une allégation douteuse sur un produit ou un service ?</p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'AchatMagasin')}>
                Faites un signalement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Qu'est-ce que la neutralité carbone ?</h2>
          <p className="text-lg">
            La <strong>neutralité carbone</strong> signifie qu'une entreprise ou un produit compense les émissions de CO₂ qu’elle
            génère en investissant dans des actions ou projets visant à les réduire ailleurs (plantation d'arbres, projets
            d'énergie renouvelable, etc.).
          </p>
          <p className="text-lg">
            Mais attention, toutes les déclarations de neutralité ou de compensation carbone ne sont pas vérifiées, et certaines
            peuvent <strong>induire les consommateurs en erreur.</strong>
          </p>
          <p className="text-lg">Une allégation douteuse peut concerner :</p>
          <ul className="ml-4">
            <li className="text-lg">Un produit affiché comme "neutre en carbone" sans preuve concrète.</li>
            <li className="text-lg">Des compensations carbone qui ne respectent pas les standards internationaux.</li>
            <li className="text-lg">Des informations floues ou trompeuses sur les efforts réels de réduction d'émissions.</li>
          </ul>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Quelles sont les risques liés aux allégations trompeuses ?</h2>
          <p className="text-lg">
            Lorsque vous achetez un produit ou un service prétendument neutre en carbone, vous participez à la lutte contre le
            réchauffement climatique, en toute bonne foi. Mais si cette <strong>allégation est fausse ou exagérée</strong>, vous
            risquez de :
          </p>
          <ul className="ml-4">
            <li className="text-lg">Soutenir un greenwashing</li>
            <li className="text-lg">Ne pas obtenir les avantages écologiques promis.</li>
            <li className="text-lg">
              Financer des projets de compensation qui ne réduisent pas réellement les émissions de CO₂.
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Comment repérer une allégation douteuse ?</h2>
          <p className="text-lg">
            Voici quelques éléments qui devraient vous alerter lorsque vous voyez une allégation de neutralité carbone :
          </p>
          <ul className="ml-4">
            <li className="text-lg">Absence de détails ou de certification reconnue (labels comme le Gold Standard ou VCS).</li>
            <li className="text-lg">
              Manque de transparence sur les actions concrètes menées par l’entreprise pour réduire ses émissions.
            </li>
            <li className="text-lg">
              Utilisation excessive de termes vagues comme "neutre en carbone" ou "100 % écologique" sans explication ni preuve.
            </li>
            <li className="text-lg">Aucune preuve de suivi sur les projets de compensation.</li>
          </ul>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <h2 className="fr-h4 !text-white">Que faire en cas de doute ?</h2>
          <p className="text-lg">
            Si vous pensez qu'une entreprise fait de la publicité mensongère en matière de neutralité ou de compensation carbone,
            signalez-le sur SignalConso.
          </p>
          <p className="text-lg">En signalant une allégation douteuse de neutralité carbone sur SignalConso vous :</p>
          <ul className="ml-4">
            <li className="text-lg">
              Protégez les consommateurs contre le greenwashing et les fausses allégations environnementales.
            </li>
            <li className="text-lg">
              Encouragez les entreprises à être plus transparentes et à respecter leurs engagements écologiques.
            </li>
            <li className="text-lg">
              Contribuez à un environnement économique plus éthique et durable, où les entreprises respectent les normes
              environnementales.
            </li>
          </ul>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}
