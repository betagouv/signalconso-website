import Head from 'next/head'
import {pageDefinitions} from '../core/pageDefinition'
import {Page} from '../shared/Page/Page'
import {AccordionPanel, AccordionPanels} from '../shared/AccordionPanel/AccordionPanel'
import {externalLinks} from '../core/externalLinks'

const Litige = () => {
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.contractualDispute.title}</title>
        <meta name="description" content={pageDefinitions.contractualDispute.description}/>
      </Head>

      <AccordionPanels>

        <AccordionPanel title="Démarche n°1">
          <p>J’écris un courrier à l’entreprise pour demander à résoudre mon problème.</p>
          <h3>Quand ?</h3>
          <div>
            <p>
              Le plus tôt possible (conseillé).
            </p>
            <p>
              Je peux aussi attendre de voir si l’entreprise me répond avec SignalConso.
            </p>
          </div>

          <h3>À qui ?</h3>
          <div>
            <p>
              Auprès du service client de l’entreprise.
            </p>
            <p>
              Je peux trouver l’adresse du service client de l’entreprise dans mon contrat, sur son site internet ou dans les conditions générales de vente.
            </p>
          </div>

          <h3>Comment ?</h3>
          <div>
            <p>En envoyant une lettre recommandée avec accusé de réception, en y joignant les deux documents ci-joints :</p>
            <ul>
              <li>
                <a
                  href="/docs/ModeleLettreLitige.txt"
                  rel="noreferrer"
                  target="_blank"
                  title="Ouverture de la lettre type (nouvelle fenêtre)"
                  download="ModeleLettreLitige.txt"
                >
                  une lettre type à compléter (zones entre [])
                </a>
              </li>
              <li>mon signalement au format PDF</li>
            </ul>
            <p>
              Je garde une copie du courrier et la preuve de l’envoi.
            </p>
          </div>

          <h3>Pourquoi ?</h3>
          <div>
            <p>Ce courrier est la preuve de ma démarche. Il est obligatoire pour entamer d’autres démarches par la suite.</p>
          </div>
        </AccordionPanel>
        <AccordionPanel
          title="Démarche n°2"
          desc="Je contacte un médiateur de la consommation, c’est-à-dire une personne chargée de régler les problèmes des consommateurs avec les entreprises."
        >
          <h3>Quand ?</h3>
          <div>
            <p>
              Deux mois après avoir envoyé mon courrier, si je n’ai pas eu de réponse ou si la réponse ne me satisfait pas.
            </p>
          </div>

          <h3>Qui ?</h3>
          <div>
            <p>
              L’entreprise a l’obligation de communiquer le nom du médiateur qu’elle a choisi. Les coordonnées du médiateur sont normalement écrites sur le site internet de
              l’entreprise ou sur le contrat, bon de commande…
            </p>
          </div>

          <h3>Comment ?</h3>
          <div>
            <p>
              Je remplis le formulaire sur le site internet du médiateur ou je le contacte par voie postale.
            </p>
          </div>

          <h3>Pourquoi ?</h3>
          <div>
            <p>
              Le médiateur va m’aider à trouver un arrangement avec l’entreprise.
            </p>
          </div>

          <h3>Combien ça coûte ?</h3>
          <div>
            <p>
              C’est gratuit !
            </p>
          </div>

          <h3>Comment faire si je ne trouve pas le nom du médiateur ?</h3>
          <div>
            <p>
              Je contacte le conciliateur le plus proche de chez moi.
              <br/>
              Je le cherche sur le site&nbsp;
              <a href={externalLinks.conciliateur} target="_blank" rel="noreferrer" title="Nouvelle fenêtre">
                conciliateurs.fr
              </a>.
              <br/>
              Il va m’aider à trouver une solution avec l’entreprise.
              <br/>
              C’est gratuit !
            </p>
          </div>

        </AccordionPanel>
      </AccordionPanels>
    </Page>
  )
}

export default Litige
