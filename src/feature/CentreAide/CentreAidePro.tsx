import {Box, BoxProps} from '@mui/material'
import {BtnAdmin} from 'core/component/BtnAdmin'
import Link from 'next/link'
import {ScButton} from 'shared/Button/Button'
import {siteMap} from 'core/siteMap'
import {AccordionPanel, AccordionPanels} from 'shared/AccordionPanel/AccordionPanel'

export const CentreAidePro = (props: BoxProps) => {
  return (
    <Box {...props}>
      <h2>Généralités</h2>
      <AccordionPanels>
        <AccordionPanel title="Est-ce que ce service est gratuit ?">
          <p>
            SignalConso est un service public gratuit, que ce soit pour les consommateurs ou les entreprises.
            <br /> Si vous recevez un courrier vous réclamant de l'argent au motif de l'utilisation de SignalConso, ne répondez
            pas à la demande et prévenez la DGCCRF de la tentative d'arnaque.
          </p>
        </AccordionPanel>
        <AccordionPanel title="Qui a accès aux signalements déposés sur SignalConso ?">
          <p>
            {' '}
            Seule l'entreprise signalée peut consulter le signalement qui la concerne. Ils ne sont pas rendus publics auprès des
            consommateurs.
            <br />
            L'ensemble des signalements est consultable et peut être exploité par l'administration de contrôle.
          </p>
        </AccordionPanel>
        <AccordionPanel title="Mon entreprise apparait déjà sur SignalConso, a-t-elle déjà été signalée ?">
          <p>
            Afin de faciliter le dépôt du signalement par le consommateur, la base de données de l’ensemble des entreprises
            françaises a été intégrée à notre outil.
            <br />
            C’est pourquoi votre entreprise apparaît sur notre plateforme mais en aucun cas cela signifie qu’elle a fait l’objet
            d’un signalement.
          </p>
        </AccordionPanel>
        <AccordionPanel title="Puis-je ouvrir un Espace Professionnel si je n'ai pas encore été signalé ?">
          <p>
            Si votre entreprise n’a pas encore été signalée, et que vous n’avez donc pas reçu le courrier provenant de nos
            services, vous ne pourrez pas ouvrir d’Espace Professionnel sur SignalConso.
          </p>
        </AccordionPanel>
        <AccordionPanel title="Est-il obligatoire de consulter les signalements SignalConso et/ou d'y répondre ?">
          <p>
            SignalConso est un service d'application volontaire.
            <br />
            Vous pouvez, si vous le souhaitez, ne pas consulter les signalements déposés sur SignalConso. Dans ce cas, la DGCCRF
            et le consommateur seront avertis que le signalement n'a pas été consulté.
          </p>
        </AccordionPanel>
      </AccordionPanels>
      <h2>Mon entreprise a été signalée</h2>
      <AccordionPanels>
        <AccordionPanel title="J'ai reçu un courrier de SignalConso car mon entreprise a été signalée. Que dois-je faire ?">
          <p>
            Pour connaître ce signalement, rendez-vous sur
            <Link href={siteMap.connexion}>https://signal.conso.gouv.fr</Link>
            avec votre code d’activation de 6 chiffres inscrit dans votre courrier SignalConso et cliquez sur le bouton
            <BtnAdmin />
            en haut à droite de votre écran.
          </p>
          Lors de votre première connexion, vous devez vous identifier avec :
          <ul>
            <li>le numéro SIRET de votre entreprise (14 chiffres)</li>
            <li>votre code d’activation : le numéro présent dans le courrier SignalConso (6 chiffres)</li>
            <li>l'adresse email que vous souhaitez lier à votre compte</li>
          </ul>
          <p>
            Vous recevrez ensuite un email vous invitant à valider votre compte. Renseignez ensuite vos nom et prénom, et
            choisissez votre mot de passe pour activer votre espace professionnel.
          </p>
          <p style={{textAlign: 'center'}}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/iQLmRZW8SIk"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
          <p>
            <b>Votre « Espace Professionnel » est maintenant activé !</b>
          </p>
          <p>
            Vous pouvez y accéder avec votre mot de passe en cliquant sur le bouton
            <Link href={siteMap.connexion}>
              <ScButton color="primary" variant="outlined" iconAfter="keyboard_arrow_right">
                Connectez-vous
              </ScButton>
            </Link>
          </p>
          Vous pouvez consulter les signalements concernant votre entreprise et le cas échéant :
          <ul>
            <li>Prendre des mesures correctives ou préventives suite au signalement</li>
            <li>Contacter le consommateur si ce dernier a souhaité vous laisser ses coordonnées</li>
          </ul>
          <p className="text-center">
            <iframe
              src="https://www.youtube-nocookie.com/embed/Zohajsmkz1I"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
          <p className="text-center">
            <iframe
              src="https://www.youtube-nocookie.com/embed/up9Elzn-P7o"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
        </AccordionPanel>
        <AccordionPanel title="J'ai oublié mon mot de passe">
          <p>
            Vous pouvez <Link href={siteMap.lostPassword}>demander un nouveau mot de passe</Link> ou, en cas de difficultés,
            contacter par email le service&nbsp;
            <a
              href="mailto:support@signal.conso.gouv.fr"
              target="_blank"
              rel="noreferrer"
              title="support@signal.conso.gouv.fr (ouverture de la messagerie par défaut)"
            >
              support@signal.conso.gouv.fr
            </a>
          </p>
        </AccordionPanel>
        <AccordionPanel title="Est-ce que mon entreprise va être contrôlée suite à un signalement ?">
          <p>
            En fonction de la gravité et de la fréquence des signalements, les enquêteurs de la DGCCRF pourront déclencher un
            contrôle.
            <br />
            Le signalement est enregistré dans la base de données de la DGCCRF.
          </p>
        </AccordionPanel>
        <AccordionPanel title="Puis-je communiquer directement avec le consommateur à l’origine du signalement ?">
          <p>
            SignalConso laisse le choix au consommateur de transmettre, ou non, ses coordonnées à l’entreprise signalée.
            <br />
            Dans tous les cas, nous communiquons avec le consommateur quant au suivi de son signalement.
          </p>
        </AccordionPanel>
        <AccordionPanel title="Dois-je apporter les détails des actions correctives mises en œuvre pour rectifier le problème ?">
          <p>
            Les retours des entreprises sont importants afin d’améliorer le service ; ils sont également précieux pour les
            consommateurs et la DGCCRF.
          </p>
        </AccordionPanel>
        <AccordionPanel id="le-detail" title="Quelles informations composent un signalement ?">
          <p>Un signalement comporte différentes informations :</p>
          <ul>
            <li>
              <strong> Type de signalement </strong>
              <div>
                Afin d'identifier le problème que le consommateur a rencontré et le secteur professionnel concerné, le
                consommateur doit répondre à une série de questions prédéfinies. Les réponses à toutes ces questions sont
                renseignées dans la catégorie "Type de signalement". Il s'agit d'éléments d'identification sur le type d'anomalie
                signalée.
              </div>
            </li>
            <li>
              <strong> Détails </strong>
              <div>
                La section "Détails" permet au consommateur de décrire le contexte dans lequel il a rencontré le problème, d’y
                ajouter des précisions et de donner la date du constat. C’est aussi là que vous trouverez les éventuelles pièces
                jointes envoyées par le consommateur.
              </div>
            </li>
            <li>
              <strong> Consommateur </strong>
              <div>
                La section Consommateur vous indique si le consommateur a souhaité vous laisser ses coordonnées afin d'être
                recontacté en direct. Si ce n’est pas le cas, vous pouvez tout de même lui indiquer une réponse à travers
                SignalConso. S'il a souhaité vous laisser ses coordonnées, vous pouvez le contacter directement (dans le cadre du
                signalement), mais n’oubliez pas de préciser cette réponse sur SignalConso pour en informer la DGCCRF.
              </div>
            </li>
          </ul>
        </AccordionPanel>
        <AccordionPanel id="les-status" title="À quoi correspondent les différents statuts du signalement ?">
          <p>
            Une fois connecté sur votre Espace Professionnel, vous avez accès à la liste de tous les signalements déposés sur
            votre entreprise. Cette liste vous donne quelques indications sur chaque signalement sans que vous ayez besoin de les
            ouvrir : la date de dépôt du signalement, le nom du consommateur si disponible, ainsi que le statut du signalement. Il
            existe trois statuts pour le signalement :
          </p>
          <ul>
            <li>
              <strong>Non consulté :</strong> vous n’avez pas encore consulté ce signalement - il apparaît en gras. Dès que vous
              aurez cliqué dessus, le signalement passera au statut suivant.
            </li>
            <li>
              <strong>À répondre :</strong> vous avez consulté le signalement mais vous n’y avez pas encore répondu.
            </li>
            <li>
              <strong>Clôturé :</strong> le signalement est clôturé - vous y avez déjà apporté une réponse ou alors le délai de
              traitement a été dépassé. (cf les relances).
            </li>
          </ul>
          <p>
            Lorsque vous avez beaucoup de signalements, vous pouvez filtrer la liste par période ou par statut. Vous pouvez aussi
            faire une extraction Excel de vos signalements en cliquant sur le bouton “Extraction excel”.
          </p>
        </AccordionPanel>
        <AccordionPanel title="Quelle réponse puis-je apporter ?" id="la-reponse">
          <p>
            Pour répondre au signalement, il vous suffit de cliquer sur le bouton Apporter une réponse. Trois choix s’offrent à
            vous :
          </p>
          <ul>
            <li>Je prends en compte ce signalement</li>
            <li>J'estime que ce signalement est infondé</li>
            <li>J'estime que ce signalement ne concerne pas mon entreprise</li>
          </ul>
          <p>
            Quel que soit le choix que vous fassiez, nous vous invitons à l’expliquer au consommateur. Cette réponse sera visible
            par la DGCCRF.
            <br />
            Nous vous offrons aussi la possibilité d’ajouter un commentaire et des pièces jointes destinés uniquement à la DGCCRF
            dans le champ de saisie spécifique. Actuellement, le site ne permet pas de transmettre les pièces jointes au
            consommateur.
          </p>
          <p>
            Une fois votre réponse validée, vous recevrez un accusé de réception. Cette réponse sera aussi visible dans la section
            "Réponse apportée".
          </p>
        </AccordionPanel>
        <AccordionPanel title="Et si le courrier SignalConso arrive pendant mes congés ?">
          <p>
            Vous avez reçu le courrier SignalConso mais votre entreprise était fermée pour congés annuels ? Vous avez consulté le
            signalement mais vous n’avez pas apporté immédiatement une réponse car vous attendiez la confirmation d’un
            collaborateur ? Pas de panique ! Après avoir récolté les retours de nombreuses entreprises, nous avons conçu un
            système de relances offrant de la souplesse dans le traitement du signalement :
          </p>
          <ul>
            <li>
              <strong>Relance courrier :</strong> nous vous avons adressé un courrier vous indiquant qu’un signalement avait été
              déposé sur votre entreprise mais vous n’avez pas encore activé votre Espace Professionnel.
              <br />
              Après 21 jours, nous vous adressons un nouveau courrier vous invitant à l’activer. Une nouvelle période de 21 jours
              est lancée, au terme de laquelle nous clôturons le signalement. Vous pourrez toujours activer votre Espace
              Professionnel, mais vous ne pourrez plus répondre au signalement.
            </li>
            <li>
              <strong>Relance mail :</strong> qu’il s’agisse d’un nouveau signalement que vous n’avez pas encore consulté ou d’un
              signalement consulté mais resté sans réponse, nous vous envoyons un email tous les 7 jours pendant 3 semaines pour
              vous inviter à faire le nécessaire. Au terme de ces relances, vous ne pourrez plus répondre au signalement.
            </li>
          </ul>
        </AccordionPanel>
        <AccordionPanel title="Je n'ai pas réagi à temps et le signalement est clôturé, que puis-je faire ?">
          <p>
            Vous pouvez toujours consulter le signalement, mais vous ne pourrez plus y répondre.
            <br /> Afin de limiter le nombre de signalements qui pourraient échapper à votre vigilance, nous envoyons
            régulièrement des relances sur votre adresse email. Pensez à la tenir à jour sur votre compte !
          </p>
        </AccordionPanel>
        <AccordionPanel title="Puis-je ouvrir plusieurs accès pour les collaborateurs de mon entreprise ?">
          <p>
            Oui, vous pouvez inviter vos collaborateurs via leur adresse e-mail (fonctionnalité accessible dans la section "Gérer
            mes entreprises" du menu en haut à gauche).
            <br /> Vous pouvez les inviter comme simples collaborateurs ou comme administrateurs (dans ce cas, ils pourront
            également gérer les accès).
          </p>
        </AccordionPanel>
        <AccordionPanel title="Je suis en charge du suivi des signalements de différents établissements. Comment puis-je centraliser ces signalements sur un seul compte ?">
          <p>
            Si vous devez suivre les signalements de différents établissements (= différents SIRETs), vous pouvez vous faciliter
            la tâche en centralisant tous les établissements suivis sur un même compte (fonctionnalité accessible depuis la
            section "Gérer mes entreprises" du menu en haut à gauche).
          </p>
          <p className="text-center">
            <iframe
              src="https://www.youtube-nocookie.com/embed/tEzRx6eU474"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
          <p>
            <b>NOUVELLE FONCTIONNALITÉ</b>
            <br />A partir du compte SignalConso de votre siège, vous avez désormais accès d'office à tous les signalements de vos
            différents établissements qui ont le même SIREN. Ainsi depuis le compte SignalConso de votre siège, vous avez accès à
            tous les signalements de vos établissements secondaires qui ont été signalés sans devoir vous connecter aux différents
            comptes. Vous avez toujours la possibilité d'ajouter des entreprises à la main qui ne portent pas le même SIREN que
            celui de votre siège avec la fonctionnalité "ajouter une entreprise" et en saisissant le Siret concerné ainsi que le
            code d'activation reçu par courrier (cf vidéo ci-dessus)
          </p>
        </AccordionPanel>
        <AccordionPanel title="Je suis en charge du suivi des signalements de différents établissements. Comment gérer les notifications pour les tous les établissements auxquels j'ai accès ?">
          Si vous devez suivre les signalements de différents établissements (= différents SIRETs), vous pouvez gérer les
          notifications de signalement pour chaque établissement auquel vous avez accès afin de recevoir ou non un courriel lors
          d'un nouveau signalement.
          <br />
          <br />
          Pour gérer vos notifications, rendez-vous dans "Paramètres" et cliquez sur "MODIFIER" dans "Notifications". Ici en
          cliquant sur le sélecteur, vous pouvez au choix activer ou désactiver les notifications pour chaque établissement.
          <br />
          <br />
          Attention, si vous désactivez les notifications, vous ne recevrez plus les nouveaux signalements par courriel. Vous
          devrez vous connecter régulièrement sur votre espace pour consulter les nouveaux signalements.
        </AccordionPanel>
      </AccordionPanels>
    </Box>
  )
}
