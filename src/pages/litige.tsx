import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'shared/Page/Page'
import {AccordionPanel, AccordionPanels} from 'shared/AccordionPanel/AccordionPanel'
import {externalLinks} from 'core/externalLinks'
import {Alert, Txt} from '../alexlibs/mui-extension'
import {Panel} from 'shared/Panel/Panel'
import {Icon} from '@mui/material'
import {useAnalyticContext} from 'core/analytic/AnalyticContext'
import {ContractualDisputeActions, ContractualDisputeNames, EventCategories} from 'core/analytic/analytic'

const Litige = () => {
  const _analytic = useAnalyticContext()

  const trackCurrentStep = (i: number) => {
    _analytic.trackEvent(
      EventCategories.contractualDispute,
      ContractualDisputeActions.consult,
      `${ContractualDisputeNames.step} n°${i}`,
    )
  }
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.contractualDispute.title}</title>
        <meta name="description" content={pageDefinitions.contractualDispute.description} />
      </Head>

      <AccordionPanels>
        <AccordionPanel
          onOpen={() => trackCurrentStep(1)}
          title="Démarche n°1"
          desc="J’écris un courrier à l’entreprise pour demander à résoudre mon problème."
        >
          <h3>Quand ?</h3>
          <p>Le plus tôt possible (conseillé).</p>
          <p>Je peux aussi attendre de voir si l’entreprise me répond avec SignalConso.</p>

          <h3>À qui ?</h3>
          <p>Auprès du service client de l’entreprise.</p>
          <p>
            Je peux trouver l’adresse du service client de l’entreprise dans mon contrat, sur son site internet ou dans les
            conditions générales de vente.
          </p>

          <h3>Comment ?</h3>
          <p>En envoyant une lettre recommandée avec accusé de réception, en y joignant les deux documents ci-joints :</p>
          <ul>
            <li>
              <a
                href="/docs/ModeleLettreLitige.txt"
                rel="noreferrer"
                target="_blank"
                title="Ouverture de la lettre type (nouvelle fenêtre)"
                download="ModeleLettreLitige.txt"
                onClick={() => {
                  _analytic.trackEvent(EventCategories.contractualDispute, ContractualDisputeActions.downloadTemplate)
                }}
              >
                <Icon fontSize="small" sx={{verticalAlign: 'middle', mr: 1}}>
                  download
                </Icon>
                une lettre type à compléter (zones entre [])
              </a>
            </li>
            <li>mon signalement au format PDF</li>
          </ul>
          <p>Je garde une copie du courrier et la preuve de l’envoi.</p>

          <h3>Pourquoi ?</h3>
          <p>Ce courrier est la preuve de ma démarche. Il est obligatoire pour entamer d’autres démarches par la suite.</p>
        </AccordionPanel>
        <AccordionPanel
          onOpen={() => trackCurrentStep(2)}
          title="Démarche n°2"
          desc="Je contacte un médiateur de la consommation, c’est-à-dire une personne chargée de régler les problèmes des consommateurs avec les entreprises."
        >
          <h3>Quand ?</h3>
          <p>Deux mois après avoir envoyé mon courrier, si je n’ai pas eu de réponse ou si la réponse ne me satisfait pas.</p>

          <h3>Qui ?</h3>
          <p>
            L’entreprise a l’obligation de communiquer le nom du médiateur qu’elle a choisi. Les coordonnées du médiateur sont
            normalement écrites sur le site internet de l’entreprise ou sur le contrat, bon de commande…
          </p>

          <h3>Comment ?</h3>
          <p>Je remplis le formulaire sur le site internet du médiateur ou je le contacte par voie postale.</p>

          <h3>Pourquoi ?</h3>
          <p>Le médiateur va m’aider à trouver un arrangement avec l’entreprise.</p>

          <h3>Combien ça coûte ?</h3>
          <p>C’est gratuit !</p>

          <h3>Comment faire si je ne trouve pas le nom du médiateur ?</h3>
          <p>
            Je contacte le conciliateur le plus proche de chez moi.
            <br />
            Je le cherche sur le site&nbsp;
            <a href={externalLinks.conciliateur} target="_blank" rel="noreferrer" title="Nouvelle fenêtre">
              conciliateurs.fr
            </a>
            .
            <br />
            Il va m’aider à trouver une solution avec l’entreprise.
            <br />
            C’est gratuit !
          </p>
        </AccordionPanel>
        <AccordionPanel
          onOpen={() => trackCurrentStep(3)}
          title="Démarche n°3"
          desc="Je vais en justice, c’est-à-dire que je demande un procès au tribunal."
        >
          <Alert type="warning">
            Attention, il est obligatoire d’avoir fait la démarche n°2 (médiateur ou conciliateur) avant de saisir le tribunal
            pour un litige inférieur à 5 000 euros
          </Alert>

          <h3>Quand ?</h3>
          <p>Lorsque je n’ai pas trouvé de solution avec le médiateur ou le conciliateur.</p>

          <h3>Comment ?</h3>
          <div>
            <p>
              En consultant la page
              <br />
              <a
                href={externalLinks.vosDroits}
                target="_blank"
                rel="noreferrer"
                title="Service public - vos droits (nouvelle fenêtre)"
              >
                {externalLinks.vosDroits}
              </a>
            </p>
          </div>

          <h3>Pourquoi ?</h3>
          <p>Pour que le juge du tribunal décide qui est en tort et quelles solutions doivent être mises en place.</p>

          <h3>Combien ça coûte ?</h3>
          <p>
            Aller au tribunal est gratuit mais des frais peuvent se rajouter au cours de la procédure (frais d’avocat, frais
            d’expertise…).
          </p>
        </AccordionPanel>
      </AccordionPanels>

      <Panel border sx={{mt: 2, p: 0}}>
        <Alert type="info">
          <Txt size="big" block bold>
            Pour réaliser ces étapes, vous pouvez contacter une association de consommateurs.
          </Txt>
          <p>
            Une association de consommateurs pourra vous aider à écrire les courriers de réclamation ou de mise en demeure,
            contacter l'entreprise directement, vous aider à saisir la justice.
          </p>
          <p>
            Pour bénéficier de leur aide, vous devez payer une somme, appelée « adhésion ». Pour connaître le prix de cette
            adhésion, vous pouvez les contacter directement. En fonction de votre situation, certaines associations peuvent
            baisser le prix de l'adhésion.
          </p>
          <p>
            Liste des associations de consommateurs officielles :<br />
            <a href={externalLinks.associationConso} target="_blank" rel="noreferrer">
              {externalLinks.associationConso}
            </a>
          </p>
        </Alert>
      </Panel>
    </Page>
  )
}

export default Litige
