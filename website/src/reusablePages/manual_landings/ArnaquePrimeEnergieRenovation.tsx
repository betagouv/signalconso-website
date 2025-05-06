import Button from '@codegouvfr/react-dsfr/Button'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandings/manualLandingsComponents'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Link from 'next/link'

export function ArnaquePrimeEnergieRenovation() {
  const lang = 'fr'
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'TravauxRenovations')}>Je fais un signalement</Button>
    </div>
  )

  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <>
          <h1>
            Arnaques et problèmes liés aux <HighlightBlue>primes d’énergie</HighlightBlue> et aux{' '}
            <HighlightPurple>aides à la rénovation</HighlightPurple>
          </h1>
          <p className="fr-h3 !mb-8 !text-scbluefrance">
            <strong>Protégez vos droits avec SignalConso</strong>
          </p>
          <p className="text-xl">
            Vous avez entrepris des travaux de rénovation énergétique et rencontrez des difficultés avec les aides financières
            promises ? SignalConso est là pour vous aider à signaler les abus et à faire valoir vos droits.
          </p>
          {button}
        </>
        <>
          <h2 className="fr-h4">Financement de vos travaux de rénovation : Vos droits en tant que consommateur</h2>
          <p>
            Lorsque vous entreprenez des travaux de rénovation énergétique ou que vous sollicitez des aides à la transition
            énergétique, vous avez des droits :
          </p>
          <ul>
            <li>Le droit à une information claire et loyale sur les prix, les aides disponibles, les conditions et délais.</li>
            <li>Le droit de rétractation de 14 jours pour tout contrat signé hors établissement, à domicile par exemple.</li>
            <li>Le droit de refuser un démarchage téléphonique.</li>
            <li>
              Le droit de choisir librement l’entreprise prestataire. Aucune entreprise ne peut vous imposer un artisan ou un
              fournisseur.
            </li>
          </ul>
          <p>
            Si vous avez besoin d’informations sur les aides à la rénovation énergétique, rendez-vous sur{' '}
            <Link href="https://mesaidesreno.beta.gouv.fr/aides" target="_blank">
              MesAidesRéno
            </Link>{' '}
            ou utilisez le module de calcul des aides à la rénovation énergétique.
          </p>
          <div className="w-full text-center">
            <iframe
              className="h-[100vh] w-[600px]"
              src="https://mesaidesreno.beta.gouv.fr/module/integration?DPE.actuel=5&logement.ann%C3%A9e+de+construction=1972&logement.prix+d%27achat=200000&logement.commune=35238&logement.commune.nom=%22Rennes%22&logement.surface=67&logement.type=%22maison%22"
              loading="lazy"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              title="Estimez vos aides pour une rénovation d'ampleur"
            ></iframe>
          </div>
        </>
        <>
          <h2 className="fr-h4">Les pratiques frauduleuses les plus fréquentes avec les aides à la rénovation</h2>
          <p>
            Certains professionnels peu scrupuleux profitent de la complexité des aides pour arnaquer les consommateurs. Voici les
            arnaques les plus signalées :
          </p>
          <ul>
            <li>Promesses d’aides gonflées ou inexistantes</li>
            <li>Démarchage agressif ou mensonger</li>
            <li>Travaux bâclés ou jamais réalisés, malgré un acompte versé.</li>
            <li>Création de comptes à votre nom pour capter des subventions</li>
            <li>Clauses abusives dans les contrats</li>
            <li>Fausses obligations de signer “tout de suite”.</li>
          </ul>
        </>
        <>
          <h2 className="fr-h4">Quels sont les bons réflexes à adopter avant de signer ou payer quoi que ce soit ?</h2>
          <ul>
            <li>
              Vérifiez les <strong>labels</strong>
            </li>
            <li>
              Prenez le temps de <strong>comparer les offres</strong>, devis et entreprises.
            </li>
            <li>
              Ne donnez jamais d’<strong>informations personnelles par téléphone</strong> : aucun service public ne vous demandera
              vos identifiants fiscaux par téléphone.
            </li>
            <li>
              <strong>Lisez les contrats</strong> attentivement avant de signer, surtout les petites lignes.
            </li>
            <li>
              <strong>Créez vous-même vos comptes pour MaPrimeRénov’ et autres aides</strong> : ne déléguez jamais cette étape à
              une entreprise.
            </li>
          </ul>
          <p>
            Et si vous avez un doute ou un problème, signalez-le sur{' '}
            <Link href="https://signal.conso.gouv.fr/fr">SignalConso</Link>. Cela peut éviter qu’un autre consommateur tombe dans
            le même piège.
          </p>
        </>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered>
          <p className="text-xl">
            <strong>
              Vous avez rencontré un problème liés aux primes d’énergie et aux aides à la rénovation ? Signalez-le sur SignalConso
              pour protéger vos droits et aider d’autres consommateurs !
            </strong>
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}
