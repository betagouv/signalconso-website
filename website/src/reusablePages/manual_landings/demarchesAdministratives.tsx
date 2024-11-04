import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'
import Link from 'next/link'

export function demarchesAdministratives(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'DemarchesAdministratives')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <div>
          <h1>
            Lors de vos démarches administratives, attention aux <HighlightBlue>entreprises</HighlightBlue> frauduleuses se
            faisant <HighlightPurple>passer pour l'administration</HighlightPurple> !
          </h1>
          <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez-vous et découvrez vos droits et vos recours avec Signal Conso</p>

          <p className="text-lg">
            De plus en plus de sites web et d'entreprises se font passer pour des administrations officielles, proposant des
            services tels que l'obtention d'un <strong>casier judiciaire</strong>, d'un <strong>acte de naissance</strong>, ou
            encore de la <strong>vignette Crit'Air</strong> à des tarifs souvent gonflés. Ces pratiques non seulement trompent les
            consommateurs, mais peuvent également vous exposer à des risques.
          </p>
          {button}
        </div>

        <div>
          <h2 className="fr-h4">
            Quelles sont les pratiques et arnaques les plus fréquemment rencontrées par les consommateurs ?
          </h2>
          <p>
            <strong>Piratage de vos informations personnelles :</strong> Ces sites peuvent collecter des informations sensibles
            comme vos coordonnées, pièces d'identité, et autres données privées.
          </p>
          <p>
            <strong>Facturation abusive :</strong> Ils imposent souvent des frais cachés ou beaucoup plus élevés que ceux d'une
            administration publique.
          </p>
          <p>
            <strong>Documents non valides :</strong> Les documents obtenus par ces canaux peuvent ne pas être reconnus par les
            autorités, vous forçant à refaire la procédure via les canaux légaux.
          </p>
        </div>

        <div>
          <div>
            <h2 className="fr-h4">Que dit la loi sur ces pratiques ?</h2>
            <p>
              Il est <strong>illégal</strong> pour une entreprise de se faire passer pour une administration officielle, surtout
              si elle profite de la confusion pour tirer un avantage financier. Ces pratiques sont en violation avec plusieurs
              textes de lois, notamment avec le <strong>Code de la consommation</strong> qui interdit les{' '}
              <strong>pratiques commerciales trompeuses</strong>, comme prétendre représenter une institution publique et avec le{' '}
              <strong>Code pénal</strong> qui sanctionne <strong>l'usurpation de titres, fonction ou qualité</strong>, ce qui
              s'applique lorsque ces entreprises se font passer pour des administrations officielles.
            </p>
          </div>
        </div>

        <div>
          <h2 className="fr-h4">Comment éviter ces arnaques lors de vos démarches administratives en tant que consommateur ?</h2>
          <ul>
            <li>
              <strong>Vérifiez l'URL :</strong> Assurez-vous que l'adresse du site est construite ainsi https://www.[nom du
              service].gouv.fr ou une autre extension propre à l'administration concernée.
            </li>
            <li>
              <strong>Méfiez-vous des sites payants :</strong> La plupart des documents administratifs sont gratuits ou ne
              nécessitent qu'un paiement modique. Un tarif élevé doit éveiller vos soupçons.
            </li>
            <li>
              <strong>Faites des recherches :</strong> Avant de faire appel à un service en ligne, renseignez-vous pour savoir si
              ce dernier est bien officiel.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="fr-h4">Et si vous rencontrez des problèmes avec une vraie administration ?</h2>
          <p>
            Si vous n’êtes pas content d’une administration concernant un délai, une réponse, son action ou encore l’attitude d’un
            agent, vous pouvez :
          </p>
          <ul>
            <li>écrire directement à cette administration pour lui faire part de votre mécontentement.</li>
            <li>
              utiliser le site internet dédié 
              <Link href="https://www.plus.transformation.gouv.fr/experience/step_1#breadcrumb" target="_blank">
                plus.transformation.gouv.fr
              </Link>
               afin de partager votre expérience avec l'administration et les autres citoyens.
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Et surtout, si vous avez un doute sur l'authenticité d'un site se présentant comme un service public ? Signalez-le sur
            SignalConso pour protéger vos droits et aider d'autres consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}
