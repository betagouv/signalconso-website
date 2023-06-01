import Link from 'next/link'
import {pagesDefs} from 'core/pagesDefinitions'
import {Box, BoxProps} from '@mui/material'
import {externalLinks} from 'core/externalLinks'
import {appConfig} from 'core/appConfig'
import * as React from 'react'
import {ReactNode} from 'react'
import {Accordion} from '@codegouvfr/react-dsfr/Accordion'

function Title({children}: {children: ReactNode}) {
  return <h2 className="mb-4 mt-8 font-normal text-2xl">{children}</h2>
}

function Accordions({children}: {children: ReactNode}) {
  return <div className="fr-accordions-group">{children}</div>
}

export const CentreAideConso = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Title>Généralités</Title>
      <Accordions>
        <Accordion label={`Comment fonctionne SignalConso ?`}>
          Consultez notre page <Link href={pagesDefs.commentCaMarche.urlRelative}>Comment ça marche</Link>.
        </Accordion>
      </Accordions>

      <Title>Je veux faire un signalement</Title>
      <Accordions>
        <Accordion label={`Je ne trouve pas la bonne catégorie`}>
          Les principaux secteurs d'activité sont présents dans SignalConso.
          <br />
          En cas de doute ou pour demander la création d'une nouvelle catégorie, vous pouvez contacter le support.
        </Accordion>
        <Accordion label={`J'ai du mal à compléter le formulaire à l'étape 3 "L'entreprise"`}>
          Les entreprises proposées dans le formulaire proviennent d'une base de données de l'Etat. Les données de cette base nous
          permettent ensuite de contacter l'entreprise.
          <br /> Il existe plusieurs raisons pouvant expliquer que vous ne trouvez pas l'entreprise :
          <ul className="space-y-2 pl-0">
            <li className="list-none">
              <b>L'entreprise est située à l'étranger</b>
              <br />
              Si l'entreprise que vous souhaitez signaler n'est pas située en France, nous vous demanderons le nom et le pays de
              l'entreprise.
              <br />
              Ces informations nous permettront de vous rediriger si besoin vers les autorités compétentes.
            </li>
            <li className="list-none">
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
            <li className="list-none">
              <b>Je connais le nom et l'adresse de l'entreprise mais je ne la trouve pas</b>
              <br />
              Il arrive que le nom de l'entreprise (son nom commercial) ne soit pas identique à sa raison sociale (son nom
              officiel). Il arrive aussi que l'adresse de son siège ne soit pas la même que celle de l'entreprise.
              <br />
              Le formulaire vous propose des éléments d'aide pour réussir à trouver son SIRET. Si malgré l'aide, vous ne parvenez
              pas à trouver l'entreprise, vous pouvez contacter le support.
            </li>
          </ul>
        </Accordion>
        <Accordion label={`J'ai un message d'erreur lorsque je clique sur "envoyer" ou "suivant"`}>
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
        </Accordion>
      </Accordions>

      <Title>J'ai fait un signalement</Title>
      <Accordions>
        <Accordion label={`Je n'ai pas de nouvelle depuis que j'ai fait mon signalement`}>
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
        </Accordion>
        <Accordion label={`Comment obtenir un remboursement ou résoudre mon problème ?`}>
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
            <Link href={pagesDefs.litige.urlRelative} rel="noreferrer">
              Vos démarches pour être remboursé ou trouver une solution à votre problème
            </Link>
          </p>
        </Accordion>
        <Accordion label={`Je veux modifier ou supprimer mon signalement `}>
          <p>
            {' '}
            Pour modifier ou supprimer votre signalement, vous pouvez{' '}
            <Link href={pagesDefs.contact.urlRelative}>contacter le support</Link>.
          </p>
        </Accordion>
      </Accordions>
      <Title>Je veux poser une question à la répression des fraudes</Title>
      <Accordions>
        <Accordion label={`Je ne trouve pas où le faire`}>
          <p>
            En fonction de la catégorie choisie lors de votre parcours de signalement, ce bouton va éventuellement apparaître :
          </p>
          <img
            src="/image/reponse_conso_button.png"
            alt="Bouton question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
          <p>Il n'est pas proposé dans toutes les catégories.</p>
        </Accordion>
        <Accordion label={`Où dois-je saisir ma question ?`}>
          <p>Vous pourrez décrire votre situation et poser votre question à l’étape 2 :</p>
          <img
            src="/image/reponse_conso_question.png"
            alt="Question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
        </Accordion>
        <Accordion label={`J'ai un message d'erreur lorsque je clique sur "envoyer" ou "suivant"`}>
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
        </Accordion>
      </Accordions>
      <Title>J’ai posé une question à la répression des fraudes</Title>
      <Accordions>
        <Accordion label={`Je n’ai pas de nouvelle`}>
          <p>
            Si vous avez bien choisi l’option «M’informer sur mes droits auprès de la répression des fraudes» et que votre demande
            est explicite, vous recevrez très prochainement une réponse, en général sous 8 jours maximum, selon la complexité de
            la situation. Il n’est pas utile d’en formuler une autre, au contraire, cela peut créer une confusion.
          </p>
        </Accordion>
        <Accordion label={`Ma demande est urgente`}>
          <p>
            Les demandes sont analysées dans le délai le plus rapide possible. Lorsque dans une réclamation, des échéances sont en
            jeu, la réponse vous rappellera les droits dont vous bénéficiez pour vous aider à les faire appliquer immédiatement,
            si les délais contractuels le permettent encore.
          </p>
        </Accordion>
        <Accordion label={`J’ai trouvé la réponse, je souhaite annuler`}>
          <p>
            C’est très aimable à vous de souhaiter nous en avertir, pour cela vous pouvez refaire le parcours précédent en
            mentionnant vos nom et prénom et la résolution de votre problème; un lien sera fait entre votre 1ère demande et ces
            dernières informations. Sinon, vous pouvez attendre la réponse qui vous sera apportée.
          </p>
        </Accordion>
      </Accordions>
    </Box>
  )
}
