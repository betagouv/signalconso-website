import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'

export function hygieneDouteusePersonnelRestauration() {
  const lang = 'fr'
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'CafeRestaurant')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <div>
          <h1>
            Vous avez remarqué un problème d'<HighlightBlue>hygiène</HighlightBlue> dans un
            <HighlightPurple>restaurant, un café ou un bar</HighlightPurple> ?
          </h1>
          <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>

          <p className="text-lg">
            Lors de vos sorties au restaurant ou dans un bar, il est essentiel que les <strong>règles d’hygiène</strong> soient
            strictement respectées pour garantir votre <strong>sécurité</strong> et celle des autres consommateurs. Si vous
            constatez des pratiques d’hygiène douteuses ou non conformes, il est important de les signaler.
          </p>
          <p className="text-lg">
            Découvrez vos droits en tant que consommateur face à ces problèmes d’hygiène et en cas de litige ou de problème,
            faites un signalement sur SignalConso.
          </p>
          {button}
        </div>

        <div>
          <h2 className="fr-h4">
            Quels problèmes d'hygiène pouvez-vous rencontrer dans un restaurant ou tout autre commerce alimentaire ?
          </h2>
          <p>
            L'hygiène dans les restaurants, cafés, snacks ou tout autre commerce alimentaire est soumise à des réglementations
            strictes. Voici les principaux <strong>problèmes d'hygiène</strong> que vous pouvez signaler sur SignalConso.
          </p>
        </div>

        <div>
          <div>
            <h2 className="fr-h4">Les problèmes de propreté des locaux et des équipements</h2>
            <p>
              Les locaux d’un restaurant ou d’un commerce alimentaire doivent être propres et bien entretenus mais il arrive
              d’observer des <strong>conditions de salubrité douteuses</strong> comme des sols ou murs sales, des{' '}
              <strong>équipements en mauvais état ou sales</strong> (réfrigérateurs, ustensiles, plan de travail, etc.) ou la
              présence de <strong>nuisibles</strong> (insectes, rongeurs) dans l'établissement.
            </p>
            <p>
              Les établissements doivent respecter des <strong>normes d'hygiène strictes</strong>, y compris la propreté des
              équipements, des locaux et des zones de préparation des aliments, conformément au{' '}
              <strong>règlement CE n° 852/2004 relatif à l'hygiène des denrées alimentaires.</strong>
            </p>
          </div>

          <div>
            <h2 className="fr-h4">Le manque d’hygiène du personnel</h2>
            <p>
              Le personnel de la restauration doit respecter des règles d’hygiène pour éviter la contamination des aliments et
              protéger les clients.
            </p>
            <p>
              Selon la réglementation sanitaire, les employés doivent avoir une <strong>hygiène corporelle</strong> irréprochable,{' '}
              <strong>se laver les mains</strong> après certaines manipulations, porter des <strong>équipements</strong> et une{' '}
              <strong>tenue</strong> adaptés (vêtements propres, gants, protections capillaires) pour garantir la sécurité des
              aliments.
            </p>
          </div>
        </div>

        <div>
          <div>
            <h2 className="fr-h4">La mauvaise condition de conservation et de stockage des aliments</h2>
            <p>
              Les aliments doivent être conservés dans des conditions de température et de propreté optimales pour éviter toute
              contamination. Les aliments ne doivent pas être <strong>mal stockés</strong> ou{' '}
              <strong>exposés à des températures inadéquates</strong> (chaînes du froid non respectées), <strong>périmés</strong>{' '}
              ou mal conditionnés (emballages défectueux, absence d'étiquetage correct).
            </p>
          </div>
          <div>
            <h2 className="fr-h4">La présence de nuisibles dans l’établissement</h2>
            <p>
              Les commerces alimentaires doivent impérativement mettre en place des dispositifs de lutte contre les{' '}
              <strong>nuisibles</strong> pour éviter toute <strong>contamination</strong> des aliments. L'absence de ces mesures
              peut entraîner la <strong>fermeture de l'établissement par les autorités sanitaires.</strong>
            </p>
            <p>
              Si vous constatez un problème d’hygiène dans un restaurant, la présence de nuisibles (rats, souris, cafards, etc) ou
              de traces de nuisibles dans les <strong>zones de préparation des repas</strong> ou dans les{' '}
              <strong>zones de stockage</strong>, faites un signalement sur SignalConso pour protéger vos droits et aider d'autres
              consommateurs !
            </p>
          </div>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez constaté rencontrez un problème d'hygiène dans un restaurant, un café ou un bar ? Signalez-le sur
            SignalConso pour protéger vos droits et aider d'autres consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}
