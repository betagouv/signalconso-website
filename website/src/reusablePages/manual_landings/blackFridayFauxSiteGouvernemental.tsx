import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

export function blackFridayFauxSiteGouvernemental(props: PageComponentProps) {
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
        <NarrowAndCentered>
          <h1 className="mb-6">
            <HighlightBlue>Faux sites gouvernementaux</HighlightBlue> : ne tombez pas dans le piège
          </h1>
          <p className="fr-h3 !mb-4 !text-scbluefrance">Et protégez vos droits avec SignalConso !</p>
          <p className="text-lg">
            Pendant des périodes de forte activité, comme le Black Friday, des sites frauduleux imitant des services publics ou
            des sites gouvernementaux se multiplient. Ces faux sites cherchent à vous tromper en utilisant des logos et des noms
            officiels pour voler vos informations personnelles ou vous faire payer des services qui sont normalement gratuits.
          </p>
          <p className="text-lg">
            Découvrez vos droits en tant que consommateur face à ces sites frauduleux et en cas de litige, faites un signalement
            sur SignalConso.
          </p>
          {button}
        </NarrowAndCentered>
        <div>
          <h2 className="fr-h4 ">Qu'est-ce qu'un faux site gouvernemental ?</h2>
          <p>
            Les faux sites gouvernementaux sont des pages web qui imitent les sites officiels d'administrations publiques. Leur
            objectif est de vous faire croire que vous accédez à un service public afin de vous{' '}
            <strong>voler de l'argent ou vos informations personnelles</strong>.
          </p>
        </div>
        <div>
          <h2 className="fr-h4">Comment reconnaître un faux site gouvernemental ?</h2>
          <p>Voici quelques signaux qui doivent vous alerter :</p>
          <ul className="grid md:grid-cols-4 gap-8">
            <li>
              <strong>URL suspecte</strong> : Les sites officiels français se terminent généralement par ".gouv.fr" ou ".fr".
              Méfiez-vous des URL qui utilisent des extensions comme ".com", ".net" ou des variations de noms proches.
            </li>
            <li>
              <strong>Paiement inattendu</strong> : Si un site vous demande de payer pour un service habituellement gratuit ou à
              un prix anormalement élevé, il y a de grandes chances qu'il s'agisse d'un site frauduleux.
            </li>
            <li>
              <strong>Absence de mentions légales</strong> : Un site officiel présente toujours des informations claires sur son
              responsable, son adresse, et ses conditions générales d'utilisation.
            </li>
            <li>
              <strong>Design et fautes d'orthographe</strong> : Méfiez-vous des sites dont le design est de mauvaise qualité ou
              qui contient des fautes d'orthographe.
            </li>
          </ul>
        </div>
        <NarrowAndCentered>
          <h2 className="fr-h4">Faux site gouvernemental : Quels sont vos droits en tant que consommateur ?</h2>
          <p>Si vous avez été victime d'un faux site :</p>
          <ul className="grid md:grid-cols-2 gap-8">
            <li>
              Si vous avez effectué un paiement par carte bancaire, vous pouvez contacter votre banque pour contester la
              transaction.
            </li>
            <li>Si vos données personnelles ont été compromises, vous pouvez saisir la CNIL pour obtenir de l'aide.</li>
          </ul>
        </NarrowAndCentered>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez un doute sur l'authenticité d'un site se présentant comme un service public ? Signalez-le sur SignalConso
            pour protéger vos droits et aider d'autres consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}
