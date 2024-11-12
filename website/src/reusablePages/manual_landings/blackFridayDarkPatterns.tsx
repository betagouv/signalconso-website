import {
  AlternatingPurpleBands,
  HighlightBlue,
  HighlightPurple,
  LinkToFichePratique,
  LpColoredBand,
  NarrowAndCentered,
  WithSuperheroIllustration,
  getManualLpButtonProps,
} from '@/landings/manualLandingsUtils'

import Button from '@codegouvfr/react-dsfr/Button'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'

export function blackFridayDarkPatterns(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'AchatInternet')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <WithSuperheroIllustration illu="elf_m_greenblack">
          {illustrationMobile => {
            return (
              <>
                <h1 className="mb-6">
                  <HighlightBlue>Interfaces trompeuses</HighlightBlue> et «<HighlightBlue>Dark Patterns</HighlightBlue>» pendant
                  le <HighlightPurple>Black Friday</HighlightPurple>?
                </h1>
                <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
                <p className="text-lg">
                  Le Black Friday est l'occasion de faire de bonnes affaires, mais certaines interfaces en ligne utilisent des
                  interfaces trompeuses pour influencer vos décisions sans que vous vous en rendiez compte. Ces pratiques,
                  appelées <strong>dark patterns</strong>, sont des techniques de manipulation intégrées aux sites web ou aux
                  applications pour vous pousser à faire des choix contraires à vos intérêts. Il vous est peut-être déjà arrivé de
                  vouloir refuser un abonnement, mais de découvrir que le bouton "Non merci" était caché ou rendu volontairement
                  moins visible que le bouton "Accepter".
                </p>
                {illustrationMobile}
                <p className="text-lg">
                  Découvrez vos droits en tant que consommateur face à ces frais ou abonnement cachés et en cas de litige, faites
                  un signalement sur SignalConso.
                </p>
                {button}
              </>
            )
          }}
        </WithSuperheroIllustration>
        <div>
          <h2 className="fr-h4 ">Qu'est-ce qu'un dark pattern ?</h2>
          <p>
            Un dark pattern est une interface qui a été délibérément <strong>conçue pour tromper ou manipuler</strong>{' '}
            l'utilisateur. Voici quelques exemples fréquents :
          </p>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              <strong>Ajout automatique d'articles au panier</strong> : Certains sites ajoutent des produits supplémentaires sans
              votre consentement.
            </li>
            <li>
              <strong>Désinscription compliquée</strong> : Vous souhaitez vous désabonner d'une newsletter ou d'un service, mais
              la démarche est volontairement compliquée.
            </li>
            <li>
              <strong>Fausse urgence</strong> : Des messages comme “Seulement 2 articles restants !” ou des compteurs de temps
              sont utilisés pour vous forcer à prendre des décisions rapides.
            </li>
            <li>
              <strong>Case précochée</strong> : Un abonnement ou un service payant est ajouté par défaut, sans que vous l'ayez
              demandé.
            </li>
            <li>
              <strong>Boutons trompeurs</strong> : Le bouton pour refuser une offre ou se désinscrire d'un abonnement est souvent
              dissimulé ou rendu moins visible que celui pour accepter ou continuer.
            </li>
          </ul>
        </div>
        <NarrowAndCentered>
          <h2 className="fr-h4">Les dark patterns : Quels sont vos droits en tant que consommateur ?</h2>
          <p>
            Le Code de la consommation protège les consommateurs contre les pratiques commerciales trompeuses et agressives. Vous
            avez le droit à des informations claires et à des choix respectueux de votre consentement. Les sites qui utilisent ces
            techniques peuvent être sanctionnés, car ils portent atteinte à la liberté de choix du consommateur et peuvent
            constituer des pratiques commerciales déloyale, abusive, agressive ou encore trompeuse.
          </p>
        </NarrowAndCentered>
        <div>
          <h2 className="fr-h4">Comment se protéger des dark pattern ?</h2>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              <strong>Lisez attentivement avant de cliquer</strong> : Ne validez jamais une offre ou une promotion sans vérifier
              ce qui est ajouté à votre commande ou service.
            </li>
            <li>
              <strong>Faites attention aux cases cochées par défaut </strong> : Si un abonnement ou un service supplémentaire est
              automatiquement sélectionné, cela peut être un dark pattern.
            </li>
            <li>
              <strong>Prenez le temps de comparer les offres</strong> : Méfiez-vous des messages d'urgence qui vous forcent à
              décider trop vite.
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez repéré un dark pattern ? Signalez-le sur SignalConso pour protéger vos droits et aider d'autres
            consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
        <LinkToFichePratique url="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/pieges-sur-les-sites-de-commerce-en-ligne-attention-aux-dark-patterns"
        text="la fiche pratique Dark pattern" />
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}
