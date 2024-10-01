import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'

export function impressionSystematiqueTicketDeCaisse(props: PageComponentProps) {
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
              Ticket de caisse imprimé sans demande : Ce que dit la Loi et comment réagir avec SignalConso
            </h1>
            <p className="text-xl">
              Depuis le 1er août 2023, les <strong>tickets de caisse ne doivent plus être imprimés systématiquement</strong>, sauf
              si le client en fait la demande expresse. Cette mesure vise à <strong>réduire le gaspillage</strong> et à limiter
              l’utilisation de papier, mais certains commerçants continuent d'imprimer les tickets sans que cela soit nécessaire,
              en contradiction avec la législation.
            </p>
            <p className="text-xl font-bold">
              Vous avez remarqué qu’un commerçant vous a donné un ticket de caisse sans que vous l’ayez demandé ?
            </p>
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
          <h2 className="fr-h4">Que dit la loi sur l’impression automatique des tickets de caisse ?</h2>
          <p className="text-lg">
            La loi anti-gaspillage pour une économie circulaire, entrée en vigueur en 2023, a mis en place de nouvelles règles
            concernant la délivrance des tickets de caisse, y compris les tickets de carte bancaire, les bons d’achat et les
            tickets de réduction. Désormais, les <strong>commerçants ne doivent plus imprimer ces tickets automatiquement</strong>
            , sauf à la demande du client.
          </p>
          <p className="text-lg">
            L’objectif de cette mesure est clair : réduire la quantité de papier utilisé, car des{' '}
            <strong>milliards de tickets de caisse sont imprimés chaque année</strong>, souvent sans être utilisés.
          </p>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Quelles sont les exceptions à la règle ?</h2>
          <p className="text-lg">
            Certaines situations échappent cependant à cette règle, et les tickets peuvent être automatiquement imprimés dans les
            cas suivants :
          </p>
          <ul className="md:pl-0 md:flex md:flex-row md:justify-around">
            <li className="text-lg basis-1/4">Achats de produits sous garantie (électroménager, électronique, etc.).</li>
            <li className="text-lg basis-1/4">Transactions liées à des titres-restaurant.</li>
            <li className="text-lg basis-1/4">Tickets délivrés par des automates de parking ou d’autoroute.</li>
          </ul>
          <p className="text-lg">
            Dans tous les autres cas, les commerçants doivent{' '}
            <strong>demander au consommateur s’il souhaite recevoir son ticket</strong>, soit sous forme papier, soit par voie
            électronique.
          </p>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <h2 className="fr-h4 !text-white">Comment réagir en cas de ticket imprimé sans demande de votre part ?</h2>
          <p className="text-lg">
            Si un commerçant vous remet un ticket de caisse sans avoir demandé votre accord, faites un signalement sur
            SignalConso.
          </p>
          <p className="text-lg">
            En signalant les commerçants qui ne respectent pas cette nouvelle réglementation sur les tickets de caisse, vous
            contribuez à :
          </p>
          <ul className="md:pl-0 md:flex md:flex-row md:justify-around">
            <li className="text-lg basis-1/4">
              Encourager une pratique plus respectueuse de l’environnement en réduisant le gaspillage de papier.
            </li>
            <li className="text-lg basis-1/4">
              Protéger les consommateurs contre des pratiques commerciales non conformes à la loi.
            </li>
            <li className="text-lg basis-1/4">
              Promouvoir l’adoption de nouvelles habitudes favorisant des alternatives numériques.
            </li>
          </ul>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}
