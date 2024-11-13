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

export function blackFridaySav(props: PageComponentProps) {
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
        <>
          <WithSuperheroIllustration illu="hero_m_orange">
            {illustrationMobile => {
              return (
                <>
                  <h1 className="mb-6">
                    Problème avec le <HighlightBlue>service après-vente</HighlightBlue> pendant le{' '}
                    <HighlightPurple>Black Friday</HighlightPurple> ?
                  </h1>
                  <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
                  <p className="text-lg">
                    Le Black Friday est l'une des périodes les plus attendues pour réaliser de bonnes affaires. Mais il peut aussi
                    être source de frustration. Il vous est peut-être déjà arrivé qu'un service après-vente (SAV) ne réponde pas
                    ou que ses coordonnées soient introuvables.
                  </p>
                  {illustrationMobile}
                  <p className="text-lg">
                    Découvrez vos droits en tant que consommateur face à ces problèmes de SAV et en cas de litige, faites un
                    signalement sur SignalConso.
                  </p>
                </>
              )
            }}
          </WithSuperheroIllustration>
          {button}
        </>
        <div>
          <h2 className="fr-h4 ">Vos droits en tant que consommateur pendant le Black Friday : Que dit la loi sur le SAV ?</h2>
          <p>
            En France, les vendeurs ont l'obligation de fournir un service après-vente (SAV) accessible, que ce soit pour des
            questions relatives à la garantie légale de conformité, des réparations ou des demandes d'informations sur le produit
            acheté. Cette règle s'applique également pendant le Black Friday, quelle que soit l'importance des promotions
            proposées !
          </p>
          <p className="mb-0">
            Le Code de la consommation impose au vendeur de vous <strong>informer clairement</strong> sur les conditions de
            garantie, le SAV disponible, et les coordonnées de contact <strong>avant l'achat</strong>. Le fait de ne pas proposer
            un <strong>service client accessible</strong> ou de masquer ces informations peut être considéré comme une{' '}
            <strong>infraction</strong>!
          </p>
        </div>
        <div>
          <h2 className="fr-h4">Les bonnes pratiques à adopter pour éviter les problèmes de SAV pendant le Black Friday</h2>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              Vérifiez la réputation du vendeur : avant d'acheter, consultez les avis sur le SAV du commerçant et privilégiez les
              vendeurs reconnus pour leur sérieux.
            </li>
            <li>
              Lisez les conditions de retour : assurez-vous de connaître les politiques de retour, d'échange et de remboursement
              avant de faire vos achats.
            </li>
            <li className="mb-0">
              Conservez les preuves d'achat : gardez tous les emails, factures, et captures d'écran, notamment les preuves d'achat
              et les conditions d'offre promotionnelle.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">SAV introuvable ou qui ne répond plus : quelles sont les étapes à suivre ?</h2>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              <strong>Vérifiez les informations sur le site</strong> : Les coordonnées du SAV doivent être accessibles sur le
              site, souvent dans la rubrique "contact", "service client" ou "mentions légales". Si vous ne les trouvez pas, pensez
              à consulter vos <strong>mails</strong> de confirmation d'achat.
            </li>
            <li>
              <strong>Consultez les conditions générales de vente (CGV)</strong> : Les CGV du site doivent mentionner les
              modalités d'accès au service après-vente.
            </li>
            <li>
              <strong>Contactez le vendeur par d'autres moyens</strong> : Si le SAV ne répond plus par téléphone ou email, essayez
              de passer par les réseaux sociaux du vendeur, ou par un courrier recommandé avec accusé de réception pour prouver
              votre tentative de contact.
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez rencontré un problème avec un SAV qui ne répond pas ou dont les coordonnées sont introuvables ? Signalez-le
            sur SignalConso pour protéger vos droits et aider d'autres consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
        <LinkToFichePratique
          url="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/le-service-apres-vente"
          text="la fiche pratique Service Après Vente"
        />
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}
