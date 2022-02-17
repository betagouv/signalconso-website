import Link from 'next/link'
import {siteMap} from '../../core/siteMap'
import {Accordion, Accordions} from './Accordion'
import {Box, BoxProps} from '@mui/material'

export const CentreAideConso = (props: BoxProps) => {
  return (
    <Box {...props}>
      <h2>Généralités</h2>
      <Accordions>
        <Accordion title={`Comment fonctionne SignalConso ?`}>
          <p>Consultez notre page <Link href={siteMap.howItWorks}>Comment ça marche</Link></p>
        </Accordion>
        <Accordion title={`Je souhaite poser une question pour connaître mes droits ou savoir ce que je dois faire face à mon problème`}>
          <p>SignalConso ne permet pas de poser une question à l'administration.</p>
          <p>Pour trouver une
            réponse, vous pouvez :
          </p>
          <ul>
            <li>Consulter <a href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques-de-la-concurrence-et-de-la-consom" target="_blank"
                             rel="noreferrer">les
              fiches
              pratiques</a>et <a href="https://www.economie.gouv.fr/dgccrf/foire-aux-questions-0" target="_blank" rel="noreferrer">la foire aux questions</a> de la répression des
              fraudes (DGCCRF)
            </li>
            <li> Écrire votre question à l’aide du formulaire :
              <br/>
              <a href="https://www.economie.gouv.fr/contact/contacter-la-dgccrf?dest=particulier"
                 target="_blank" rel="noreferrer">https://www.economie.gouv.fr/contact/contacter-la-dgccrf?dest=particulier</a>
            </li>
            <li>
              Appeler le service Allo Service Publique au 3939.<br/><br/>Ce service est disponible du lundi au vendredi de 8h45 à 17h30 heures de métropole (0.15€ la minute +
              prix de l’appel).<br/><br/>Vous êtes consommateur, vous rencontrez une difficulté suite à un acte d'achat ou vous avez une interrogation sur un point de droit avant
              d'acheter ou commander: vous pouvez obtenir une réponse par un agent de la DGCCRF en contactant le <b>0 809 540 550</b> DGCCRF-RéponseConso. Ce numéro d'appel est non
              surtaxé.<br/><br/><b>Horaires d'ouverture du service :</b>
              <ul>
                <li>Les lundis de 8h30 à 12h30 et de 13h15 à 17h15</li>
                <li>Les mardis de 8h30 à 12h30 et de 13h15 à 17h15</li>
                <li>Les mercredis de 13h15 à 17h15</li>
                <li>Les jeudis de 8h30 à 12h30</li>
                <li>Les vendredis de 8h30 à 16h.</li>
              </ul>
            </li>
          </ul>
        </Accordion>
      </Accordions>

      <h2 className="pt-5">Je veux faire un signalement</h2>
      <Accordions>
        <Accordion title={`Je ne trouve pas la bonne catégorie`}>
          <p>Les principaux secteurs d'activité sont présents dans SignalConso.<br/> N'oubliez pas de
            cliquer sur "voir toutes les catégories" afin de voir toutes les rubriques existantes.
          </p>
          <p>En cas de doute ou pour demander la création d'une nouvelle catégorie, vous
            pouvez contacter le support.
          </p>
        </Accordion>
        <Accordion title={`J'ai du mal à compléter le formulaire à l'étape 3 "L'entreprise"`}>
          <p>Les entreprises proposées dans le formulaire proviennent d'une base de données de l'Etat.
            Les données de cette base nous permettent ensuite de contacter l'entreprise.<br/> Il existe plusieurs raisons pour lesquelles vous ne trouvez pas l'entreprise :
          </p>
          <ul>
            <li><b>L'entreprise est située à l'étranger</b><br/>Si l'entreprise que vous souhaitez signaler n'est pas située en France, nous vous demanderons le nom et le pays de
              l'entreprise.<br/>Ces informations nous permettront de vous rediriger si besoin vers les autorités compétentes.
            </li>
            <li>
              <b>Je ne connais ni les identifiants ni l'adresse de l'entreprise</b>
              <br/>
              C'est par exemple le cas où vous avez seulement un numéro de téléphone ou une adresse
              mail, sans aucune mention légale.<br/>Pour signaler une entreprise dont vous ne connaissez ni le nom, ni l'url du site internet, ni les identifiants, il faut
              contacter directement la DGCCRF de la votre département :
              <br/>
              <a href="https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDETSPP"
                 target="_blank"
                 rel="noreferrer">https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDETSPP</a>
            </li>
            <li>
              <b>Je connais le nom et l'adresse de l'entreprise mais je ne la trouve pas</b>
              <br/>
              Il arrive que le nom de l'entreprise (son nom commercial) ne soit pas identique à sa raison sociale (son nom officiel). Il arrive aussi que l'adresse de son
              siège ne soit pas la même que celle de l'entreprise.<br/>Le formulaire vous propose des éléments d'aide pour réussir à trouver son siret. Si malgré l'aide, vous
              ne parvenez pas à trouver l'entreprise, vous pouvez contacter le support.
            </li>
          </ul>
        </Accordion>
        <Accordion title={`J'ai un message d'erreur lorsque je clique sur "envoyer" ou "suivant"`}>
          <ul>
            <li> Vérifiez votre connexion internet et ré-essayez d'envoyer le formulaire. Ce message d'erreur apparait souvent lorsque la connection internet a été
              momentanément coupée.
            </li>
            <li> Vous avez peut-être tenté de faire deux fois le même signalement. Il n'est pas possible d'effectuer deux fois un même signalement (même catégorie, même
              entreprise) à la suite.
            </li>
          </ul>
          <p> Si vous n'arrivez toujours pas à envoyer le formulaire, vous pouvez contacter le support.</p>
        </Accordion>
      </Accordions>

      <h2 className="pt-5">J'ai fait un signalement</h2>
      <Accordions>
        <Accordion title={`Je n'ai pas de nouvelle depuis que j'ai fait mon signalement`}>
          <p>Après avoir envoyé votre signalement, vous avez dû recevoir un <b>accusé
            d'enregistrement</b> par email. Si ce n'est pas le cas, contactez le support. Il est possible que vous n'ayez pas validé la dernière étape ou que l'adresse
            email
            que vous avez renseignée comporte une erreur.
          </p>
          <p>Ensuite, vous allez recevoir les informations suivantes :</p>
          <ul>
            <li> un email lorsque l'entreprise aura lu votre signalement (si c'est le cas)</li>
            <li> un email lorsque l'entreprise vous apportera une réponse (si c'est le cas)</li>
            <li> ou un email pour vous dire que l'entreprise n'a pas souhaité lire ou répondre à votre signalement (si c'est le cas)</li>
          </ul>
          <p>Les entreprises ont jusqu'à 8 semaines environ pour consulter et répondre à votre signalement.<br/> Le délai de lecture et de réponse peut varier d'une entreprise
            à l'autre. Si une entreprise a déjà un compte sur SignalConso, le délai sera plus rapide.
          </p>
          <p>Si la répression des fraudes décide de faire une enquête, vous ne
            recevrez pas d'email pour vous le dire.
          </p>
        </Accordion>
        <Accordion title={`Comment obtenir un remboursement ou résoudre mon problème ?`}>
          <p>Comme indiqué sur SignalConso, la répression des fraudes va utiliser votre signalement
            pour cibler les entreprises à contrôler.<br/> Lors de ces contrôles, elle va regarder si de mauvaises pratiques sont effectivement exercées et si oui, les
            sanctionner.
          </p>
          <p>Par contre, la répression des fraudes ne s'occupe pas d'obtenir votre remboursement ou votre indemnité.<br/> C'est à vous d'entamer les
            démarches. Ces démarches vous ont été présentées à la fin de votre signalement et dans votre mail d'accusé de réception.<br/> Vous pouvez également les retrouver
            sur cette page : <a href="https://signal.conso.gouv.fr/litige" target="_blank" rel="noreferrer">https://signal.conso.gouv.fr/litige</a>
          </p>
        </Accordion>
        <Accordion title={`Je veux modifier ou supprimer mon signalement `}>
          <p> Pour modifier ou supprimer votre signalement, vous pouvez <Link href={siteMap.contact}>contacter
            le support</Link>.
          </p>
        </Accordion>
      </Accordions>
    </Box>
  )
}
