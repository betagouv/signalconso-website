import {Box, BoxProps, Tab, Tabs} from '@mui/material'
import {Page} from 'shared/Page/Page'
import {useState} from 'react'
import {fnSwitch} from '../alexlibs/ts-utils'
import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ConditionsGeneralesUtilisation = () => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.conditionsGeneralesUtilisation.title}</title>
        <meta name="description" content={pageDefinitions.conditionsGeneralesUtilisation.description} />
      </Head>
      <h1>Conditions générales d'utilisation du site SignalConso</h1>
      <Tabs
        value={activeTab}
        onChange={(e, i) => setActiveTab(i)}
        sx={{
          borderRadius: t => t.shape.borderRadius,
          border: t => `1px solid ${t.palette.divider}`,
        }}
      >
        <Tab sx={{flex: 1}} label="Consommateur" {...a11yProps(0)} />
        <Tab sx={{flex: 1}} label="Professionnel" {...a11yProps(1)} />
      </Tabs>
      {activeTab === 0 ? (
        <ConditionsGeneralesUtilisationConso role="tabpanel" />
      ) : (
        <ConditionsGeneralesUtilisationPro role="tabpanel" />
      )}
    </Page>
  )
}

const ConditionsGeneralesUtilisationConso = (props: BoxProps) => {
  return (
    <Box {...props}>
      <p>Les conditions générales d'utilisation doivent être acceptées par l’utilisateur du site.</p>
      <h2>À quoi sert le site SignalConso ?</h2>
      <p>
        Le site permet aux consommateurs de connaître la réglementation et de déposer un signalement.
        <br />
        Il ne doit en aucun cas s'agir d'une urgence nécessitant l'intervention des services de secours.{' '}
        <b>Dans ce cas, il faut appeler le « 112 ».</b>
      </p>
      <h2>Ce service est-il payant ?</h2>
      <p>Le site est accessible gratuitement à tout utilisateur ayant un accès à internet.</p>
      <h2>Que peut-on signaler ?</h2>
      <p>
        L’utilisateur peut signaler des manquements relatifs au Code de la Consommation (principalement) et des litiges
        contractuels constatés chez une entreprise. Il n’est pas possible de signaler un litige avec un particulier.
      </p>
      <h2>Qui traite les signalements ?</h2>
      <p>
        Les signalements sont traités par l’équipe SignalConso qui vérifie que le signalement rentre bien dans le périmètre du
        site et que les données reçues ne sont pas “sensibles”.
      </p>
      Les signalements sont ensuite visibles :
      <ul>
        <li>par le professionnel, dont l’entreprise a été mise en cause,</li>
        <li>par les agents de la DGCCRF, qui sont habilités à faire des enquêtes.</li>
      </ul>
      <h2>Les signalements sont-ils anonymes ?</h2>
      <p>
        L’utilisateur doit s’identifier auprès de l’administration (SignalConso et DGCCRF) en donnant son nom, son prénom et son
        adresse email.
        <br />
        Par contre, l'utilisateur a la possibilité de rester anonyme vis-à-vis de l'entreprise.
      </p>
      <h2>Existe-t-il un suivi de dossier ?</h2>
      <p>SignalConso ne propose pas de suivi personnalisé des dossiers. Les signalements sont traités de manière collective.</p>
      <h2>Quel est le risque en cas de dénonciation mensongère ?</h2>
      <p>
        L’article 226-10 du Code Pénal dispose que "la dénonciation, effectuée par tout moyen et dirigée contre une personne
        déterminée, d'un fait qui est de nature à entraîner des sanctions judiciaires, administratives ou disciplinaires et que
        l'on sait totalement ou partiellement inexact, lorsqu'elle est adressée soit à un officier de justice ou de police
        administrative ou judiciaire, soit à une autorité ayant le pouvoir d'y donner suite ou de saisir l'autorité compétente,
        soit aux supérieurs hiérarchiques ou à l'employeur de la personne dénoncée, est punie de cinq ans d'emprisonnement et de
        45 000 € d'amende."
        <br />
        Le détournement du site de signalement pour effectuer des dénonciations mensongères fera l'objet de poursuites
        judiciaires.
      </p>
      <h2> Traitement des signalements abusifs ou frauduleux</h2>
      <p>
        Les droit de saisine par voie électronique ne s’applique pas aux envois abusifs, notamment par leur nombre, leur caractère
        répétitif ou systématique, ou les envois susceptibles de porter atteinte à la sécurité des systèmes d’information ou
        pouvant porter atteinte au personne physique ou morale (menace de mort, insulte, ...). Dans ces conditions les
        signalements répétés susceptibles de perturber le bon fonctionnement du service ou qui auraient pour effet de faire peser
        sur lui une charge disproportionnée au regard des moyens dont il dispose pourrait voir leurs adresses bloquées.
      </p>
      <h2>Mentions légales</h2>
      <p>
        L'édition du site https://signal.conso.gouv.fr est assurée par la Direction générale de la Concurrence, de la Consommation
        et de la Répression des fraudes (DGCCRF), située au 59 Boulevard Vincent Auriol 75013 Paris.
        <br />
        L'hébergeur du site https://signal.conso.gouv.fr est la société Clever Cloud dont le siège social est situé 3 rue de
        l’Allier 44000 Nantes.
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété
        intellectuelle et plus particulièrement par le droit d'auteur.
      </p>
    </Box>
  )
}

const ConditionsGeneralesUtilisationPro = (props: BoxProps) => {
  return (
    <Box {...props}>
      <p>
        Les conditions générales d'utilisation doivent être acceptées par le professionnel afin d’utiliser le site SignalConso.
      </p>

      <h2>Gratuité de la plate-forme SignalConso</h2>
      <p>
        Le site est accessible gratuitement aux professionnels.
        <br />
        Si vous recevez une sollicitation vous réclamant une somme d’argent dans le cadre de SignalConso, refusez la proposition
        et alertez rapidement la DIRECCTE ou la DDPP de votre secteur.
        <br />
        Coordonnées disponibles ici:&nbsp;
        <a
          href="https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDCSPP"
          target="_blank"
          rel="noreferrer"
          title="coordonnées des DDPP et DDCSPP (nouvelle fenêtre)"
        >
          https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDCSPP
        </a>
      </p>

      <h2>Objections quant au signalement déposé</h2>
      <p>
        Si vous contestez le signalement qui a été déposé, vous pouvez le notifier directement dans votre espace professionnel.
        <br /> Votre réponse sera transmise au consommateur et à la DGCCRF. Un second espace de réponse permet d'apporter des
        éléments à la connaissance de la DGCCRF seulement. Vous pouvez y joindre des pièces jointes.
        <br /> <b>Pour rappel, ce sont les constatations effectuées par les enquêteurs lors d’un contrôle qui font foi.</b>
      </p>

      <h2>Prise de contact avec le consommateur</h2>
      <p>
        Si le consommateur a souhaité vous transférer ses coordonnées, vous pouvez le contacter. Ce contact doit être courtois et
        être fait uniquement dans le cadre du signalement. Il a notamment pour but de récupérer des informations manquantes et
        traiter si besoin le litige.
        <br />
        <b>
          {' '}
          Il est interdit d’utiliser les coordonnées du consommateur à des fins de prospections commerciales.
          <br />
          Il est interdit d’intimider ou de harceler le consommateur afin de lui faire retirer son signalement.
        </b>
        <br />
        Tout abus pourra entraîner des poursuites judiciaires.
      </p>

      <h2>Dénonciation mensongère</h2>
      <p>
        L’article 226-10 du Code Pénal dispose que "la dénonciation, effectuée par tout moyen et dirigée contre une personne
        déterminée, d'un fait qui est de nature à entraîner des sanctions judiciaires, administratives ou disciplinaires et que
        l'on sait totalement ou partiellement inexact, lorsqu'elle est adressée soit à un officier de justice ou de police
        administrative ou judiciaire, soit à une autorité ayant le pouvoir d'y donner suite ou de saisir l'autorité compétente,
        soit aux supérieurs hiérarchiques ou à l'employeur de la personne dénoncée, est punie de cinq ans d'emprisonnement et de
        45 000 € d'amende."
        <br />
        <b>
          Le détournement du site de signalement pour effectuer des dénonciations mensongères fera l'objet de poursuites
          judiciaires.
        </b>
      </p>

      <h2>Mentions légales</h2>
      <p>
        L'édition du site https://signal.conso.gouv.fr est assurée par la Direction générale de la Concurrence, de la Consommation
        et de la Répression des fraudes (DGCCRF), située au 59 Boulevard Vincent Auriol 75013 Paris.
        <br />
        L'hébergeur du site https://signal.conso.gouv.fr est la société Clever Cloud dont le siège social est situé 3 rue de
        l’Allier 44000 Nantes.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété
        intellectuelle et plus particulièrement par le droit d'auteur.
      </p>
    </Box>
  )
}

export default ConditionsGeneralesUtilisation
