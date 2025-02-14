import Image from 'next/image'
import imgFraud from '@/img/actualites/fraud.png'
import Link from 'next/link'

export function ArticleUsurpationDIdentite() {
  return (
    <div className="sc-article">
      <Image
        src={imgFraud}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Les tentatives d’escroquerie par usurpation d’identité d’agents de l’administration, d’institutions publiques ou
        d’établissements bancaires sont de plus en plus fréquentes. Les fraudeurs se font passer pour des représentants officiels
        afin de soutirer des informations sensibles ou de l’argent aux particuliers et aux entreprises.
      </p>
      <p>Voici comment éviter les pièges et avoir les bons réflexes !</p>
      <h2 className="fr-h2">
        <strong>Les scénarios les plus courants :</strong>
      </h2>
      <ul>
        <li>
          <strong>Appels frauduleux</strong> : Un escroc prétend appartenir à l’administration et affirme qu’une fraude a été
          détectée sur votre carte bancaire. Il vous demande de confirmer des numéros de carte ou d’effectuer une action
          prétendument sécurisante.
        </li>
        <li>
          <strong>Faux SMS d’urgence</strong> : Un message vous alerte sur un paiement imminent et vous incite à appeler
          rapidement un numéro soi-disant non surtaxé.
        </li>
        <li>
          <strong>Usurpation d’agents officiels</strong> : Un faux agent de la DGCCRF ou de RéponseConso vous contacte pour
          soi-disant bloquer une fraude bancaire, vous envoyant une demande d’authentification qui cache en réalité un paiement
          frauduleux.
        </li>
        <li>
          <strong>Arnaque aux panneaux solaires</strong> : Un faux représentant du ministère de l’Énergie vous incite à signer une
          commande pour des panneaux photovoltaïques, prétendument financés par un « chèque énergie solaire ».
        </li>
        <li>
          <strong>Faux mails administratifs</strong> : Des courriels frauduleux imitant des institutions officielles (Sécurité
          sociale, ANTS, DGFIP, CAF, CPAM, Police, etc.) vous incitent à entrer des informations personnelles sur un site
          malveillant.
        </li>
        <li>
          <strong>Faux conseillers bancaires</strong> : Un individu se faisant passer pour votre banque vous contacte pour mettre
          à jour votre dossier ou signaler des transactions suspectes.
        </li>
        <li>
          <strong>Faux avis de contravention ou de paiement</strong> : Un mail ou SMS vous demande de confirmer un paiement
          urgent, semblant provenir d’une administration comme l’ANTS ou la DGFIP.
        </li>
      </ul>
      <p>
        ⚠️{' '}
        <strong>
          Soyez vigilant et ne transmettez jamais vos informations personnelles sans vérifier l’identité de votre interlocuteur !
        </strong>
      </p>
      <h2 className="fr-h2">
        <strong>Les signes qui doivent vous alerter :</strong>
      </h2>
      <ul>
        <li>
          <p>
            <strong>Demandes de données sensibles</strong> : Aucun agent de l’État ou conseiller bancaire ne vous demandera jamais
            votre numéro de carte, code secret ou informations confidentielles.
          </p>
        </li>
        <li>
          <p>
            <strong>Appels frauduleux de banques</strong> : Une vraie banque ne vous demandera jamais par téléphone d’effectuer
            des validations ou d’entrer des codes pour stopper une fraude. Elle vous invitera toujours à vous rendre en agence.
          </p>
        </li>
        <li>
          <p>
            <strong>Mails suspects</strong> : Méfiez-vous des courriels mal rédigés, avec des logos flous ou provenant
            d’expéditeurs douteux. En cas de doute, ne les ouvrez pas et supprimez-les.
          </p>
        </li>
        <li>
          <p>
            <strong>Pression et urgence</strong> : Toute demande insistante ou nécessitant une action immédiate est suspecte. Un
            agent officiel ne vous mettra jamais sous pression pour obtenir une information.
          </p>
        </li>
      </ul>
      <p>
        ⚠️ <strong>Soyez vigilant et prenez toujours le temps de vérifier avant d’agir !</strong>
      </p>
      <h2 className="fr-h2">
        <strong>Quelques conseils pour vous protéger :</strong>
      </h2>
      <ul>
        <li>
          <p>
            <strong>Vérifiez l’identité de votre interlocuteur</strong> : Demandez une preuve d’identité professionnelle et
            contactez directement l’administration concernée pour confirmer la légitimité de la demande.
          </p>
        </li>
        <li>
          <p>
            <strong>Ne communiquez jamais d’informations sensibles</strong> : Ne divulguez pas vos coordonnées bancaires, numéros
            de sécurité sociale ou autres informations personnelles par téléphone ou par courriel.
          </p>
        </li>
        <li>
          <p>
            <strong>Soyez vigilant face aux courriels suspects</strong> : Vérifiez l’adresse de l’expéditeur et méfiez-vous des
            liens ou pièces jointes inhabituels.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">Si vous constatez une fraude, ayez les bons réflexes</h2>
      <ul>
        <li>
          <p>
            <strong>Signalement des mails frauduleux</strong> : Déclarez-les sur la plateforme{' '}
            <Link href="https://www.service-public.fr/particuliers/vosdroits/N31138" target="_blank" rel="noopener">
              <strong>THÉSÉE</strong>
            </Link>{' '}
            ou sur{' '}
            <strong>
              <Link href="http://signal-spam.fr" target="_blank" rel="noopener">
                signal-spam.fr
              </Link>
            </strong>{' '}
            pour aider à identifier et stopper ces tentatives d’escroquerie.
          </p>
        </li>
        <li>
          <p>
            <strong>Signalement des appels et SMS frauduleux</strong> : Transmettez-les au <strong>33 700</strong> ou signalez-les
            sur{' '}
            <strong>
              <Link href="http://33700.fr" target="_blank" rel="noopener">
                33700.fr
              </Link>
            </strong>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Besoin d’aide ?</strong> Contactez la plateforme <strong>Info-Escroqueries</strong> au{' '}
            <strong>0 805 805 817</strong> (appel gratuit) pour être conseillé.
          </p>
        </li>
        <li>
          <p>
            <strong>Victime de fraude bancaire ?</strong> Déclarez l’incident sur la plateforme{' '}
            <Link href="https://www.service-public.fr/particuliers/vosdroits/R46526" target="_blank" rel="noopener">
              <strong>Perceval</strong>
            </Link>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Plainte en ligne</strong> : Si l’escroquerie est grave, vous pouvez porter plainte sur{' '}
            <strong>
              <Link href="http://plainte-en-ligne.masecurite.interieur.gouv.fr" target="_blank" rel="noopener">
                plainte-en-ligne.masecurite.interieur.gouv.fr
              </Link>
            </strong>
            .
          </p>
        </li>
      </ul>
      <p>
        <strong>Soyez vigilant et signalez toute tentative suspecte pour protéger d’autres consommateurs !</strong>
      </p>
    </div>
  )
}
