import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import {AccordionPanel, AccordionPanels} from 'shared/AccordionPanel/AccordionPanel'
import {Box, BoxProps} from '@mui/material'
import {externalLinks} from 'core/externalLinks'
import {appConfig} from 'conf/appConfig'
import * as React from 'react'

export const CentreAideConso = (props: BoxProps) => {
  return (
    <Box {...props}>
      <h2>Généralités</h2>
      <AccordionPanels>
        <AccordionPanel title={`Comment fonctionne SignalConso ?`}>
          <p>
            Consultez notre page <Link href={siteMap.commentCaMarche}>Comment ça marche</Link>
          </p>
        </AccordionPanel>
      </AccordionPanels>

      <h2 className="pt-5">Je veux faire un signalement</h2>
      <AccordionPanels>
        <AccordionPanel title={`Je ne trouve pas la bonne catégorie`}>
          <p>
            Les principaux secteurs d'activité sont présents dans SignalConso.
            <br /> N'oubliez pas de cliquer sur "voir toutes les catégories" afin de voir toutes les rubriques existantes.
          </p>
          <p>En cas de doute ou pour demander la création d'une nouvelle catégorie, vous pouvez contacter le support.</p>
        </AccordionPanel>
        <AccordionPanel title={`J'ai du mal à compléter le formulaire à l'étape 3 "L'entreprise"`}>
          <p>
            Les entreprises proposées dans le formulaire proviennent d'une base de données de l'Etat. Les données de cette base
            nous permettent ensuite de contacter l'entreprise.
            <br /> Il existe plusieurs raisons pour lesquelles vous ne trouvez pas l'entreprise :
          </p>
          <ul>
            <li>
              <b>L'entreprise est située à l'étranger</b>
              <br />
              Si l'entreprise que vous souhaitez signaler n'est pas située en France, nous vous demanderons le nom et le pays de
              l'entreprise.
              <br />
              Ces informations nous permettront de vous rediriger si besoin vers les autorités compétentes.
            </li>
            <li>
              <b>Je ne connais ni les identifiants ni l'adresse de l'entreprise</b>
              <br />
              C'est par exemple le cas où vous avez seulement un numéro de téléphone ou une adresse mail, sans aucune mention
              légale.
              <br />
              Pour signaler une entreprise dont vous ne connaissez ni le nom, ni l'url du site internet, ni les identifiants, il
              faut contacter directement la DGCCRF de la votre département :
              <br />
              <a href={externalLinks.dgccrfCoordonnees} target="_blank" rel="noreferrer">
                {externalLinks.dgccrfCoordonnees}
              </a>
            </li>
            <li>
              <b>Je connais le nom et l'adresse de l'entreprise mais je ne la trouve pas</b>
              <br />
              Il arrive que le nom de l'entreprise (son nom commercial) ne soit pas identique à sa raison sociale (son nom
              officiel). Il arrive aussi que l'adresse de son siège ne soit pas la même que celle de l'entreprise.
              <br />
              Le formulaire vous propose des éléments d'aide pour réussir à trouver son siret. Si malgré l'aide, vous ne parvenez
              pas à trouver l'entreprise, vous pouvez contacter le support.
            </li>
          </ul>
        </AccordionPanel>
        <AccordionPanel title={`J'ai un message d'erreur lorsque je clique sur "envoyer" ou "suivant"`}>
          <ul>
            <li>
              {' '}
              Vérifiez votre connexion internet et ré-essayez d'envoyer le formulaire. Ce message d'erreur apparait souvent
              lorsque la connection internet a été momentanément coupée.
            </li>
            <li>
              {' '}
              Vous avez peut-être tenté de faire deux fois le même signalement. Il n'est pas possible d'effectuer deux fois un
              même signalement (même catégorie, même entreprise) à la suite.
            </li>
          </ul>
          <p> Si vous n'arrivez toujours pas à envoyer le formulaire, vous pouvez contacter le support.</p>
        </AccordionPanel>
      </AccordionPanels>

      <h2 className="pt-5">J'ai fait un signalement</h2>
      <AccordionPanels>
        <AccordionPanel title={`Je n'ai pas de nouvelle depuis que j'ai fait mon signalement`}>
          <p>
            Après avoir envoyé votre signalement, vous avez dû recevoir un <b>accusé d'enregistrement</b> par email. Si ce n'est
            pas le cas, contactez le support. Il est possible que vous n'ayez pas validé la dernière étape ou que l'adresse email
            que vous avez renseignée comporte une erreur.
          </p>
          <p>Ensuite, vous allez recevoir les informations suivantes :</p>
          <ul>
            <li> un email lorsque l'entreprise aura lu votre signalement (si c'est le cas)</li>
            <li> un email lorsque l'entreprise vous apportera une réponse (si c'est le cas)</li>
            <li>
              {' '}
              ou un email pour vous dire que l'entreprise n'a pas souhaité lire ou répondre à votre signalement (si c'est le cas)
            </li>
          </ul>
          <p>
            Les entreprises ont jusqu'à 8 semaines environ pour consulter et répondre à votre signalement.
            <br /> Le délai de lecture et de réponse peut varier d'une entreprise à l'autre. Si une entreprise a déjà un compte
            sur SignalConso, le délai sera plus rapide.
          </p>
          <p>Si la répression des fraudes décide de faire une enquête, vous ne recevrez pas d'email pour vous le dire.</p>
        </AccordionPanel>
        <AccordionPanel title={`Comment obtenir un remboursement ou résoudre mon problème ?`}>
          <p>
            Comme indiqué sur SignalConso, la répression des fraudes va utiliser votre signalement pour cibler les entreprises à
            contrôler.
            <br /> Lors de ces contrôles, elle va regarder si de mauvaises pratiques sont effectivement exercées et si oui, les
            sanctionner.
          </p>
          <p>
            Par contre, la répression des fraudes ne s'occupe pas d'obtenir votre remboursement ou votre indemnité.
            <br /> C'est à vous d'entamer les démarches. Ces démarches vous ont été présentées à la fin de votre signalement et
            dans votre mail d'accusé de réception.
            <br /> Vous pouvez également les retrouver sur cette page :{' '}
            <a href={siteMap.litige} target="_blank" rel="noreferrer">
              {appConfig.appBaseUrl + siteMap.litige}
            </a>
          </p>
        </AccordionPanel>
        <AccordionPanel title={`Je veux modifier ou supprimer mon signalement `}>
          <p>
            {' '}
            Pour modifier ou supprimer votre signalement, vous pouvez <Link href={siteMap.contact}>contacter le support</Link>.
          </p>
        </AccordionPanel>
      </AccordionPanels>
      <h2 className="pt-5">Je veux poser une question à la répression des fraudes</h2>
      <AccordionPanels>
        <AccordionPanel title={`Je ne trouve pas où le faire`}>
          <p>
            En fonction de la catégorie choisie lors de votre parcours de signalement, ce bouton va éventuellement apparaître :
          </p>
          <img
            src="/image/reponse_conso_button.png"
            alt="Bouton question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
        </AccordionPanel>
        <AccordionPanel title={`Où dois-je saisir ma question ?`}>
          <p>Vous pourrez décrire votre situation et poser votre question à l’étape 2 :</p>
          <img
            src="/image/reponse_conso_question.png"
            alt="Question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
        </AccordionPanel>
        <AccordionPanel title={`J'ai un message d'erreur lorsque je clique sur "envoyer" ou "suivant"`}>
          <p>
            Vérifiez votre connexion internet et réessayez d'envoyer le formulaire. Ce message d'erreur apparait souvent lorsque
            la connexion internet a été momentanément coupée. Vous avez peut-être tenté de faire deux fois le même signalement. Il
            n'est pas possible d'effectuer deux fois un même signalement (même catégorie, même entreprise) à la suite. Si vous
            n'arrivez toujours pas à envoyer le formulaire, vous pouvez contacter le support (support@signal.conso.gouv.fr)
          </p>
        </AccordionPanel>
      </AccordionPanels>
      <h2 className="pt-5">J’ai posé une question à la répression des fraudes</h2>
      <AccordionPanels>
        <AccordionPanel title={`Je n’ai pas de nouvelle`}>
          <p>
            Si vous avez bien choisi l’option «M’informer sur mes droits auprès de la répression des fraudes» et que votre demande
            est explicite, vous recevrez très prochainement une réponse, en général sous 8 jours maximum, selon la complexité de
            la situation. Il n’est pas utile d’en formuler une autre, au contraire, cela peut créer une confusion.
          </p>
        </AccordionPanel>
        <AccordionPanel title={`Ma demande est urgente`}>
          <p>
            Les demandes sont analysées dans le délai le plus rapide possible. Lorsque dans une réclamation, des échéances sont en
            jeu, la réponse vous rappellera les droits dont vous bénéficiez pour vous aider à les faire appliquer immédiatement,
            si les délais contractuels le permettent encore.
          </p>
        </AccordionPanel>
        <AccordionPanel title={`J’ai trouvé la réponse, je souhaite annuler`}>
          <p>
            C’est très aimable à vous de souhaiter nous en avertir, pour cela vous pouvez refaire le parcours précédent en
            mentionnant vos nom et prénom et la résolution de votre problème; un lien sera fait entre votre 1ère demande et ces
            dernières informations. Sinon, vous pouvez attendre la réponse qui vous sera apportée.
          </p>
        </AccordionPanel>
      </AccordionPanels>
    </Box>
  )
}
