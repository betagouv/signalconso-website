import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {Stepper} from '@codegouvfr/react-dsfr/Stepper'

export function PlaygroundDsfr() {
  return (
    <div className="space-y-4">
      <p>Petits tests du DSFR</p>
      <Alert
        closable
        description="Everything went well"
        onClose={function noRefCheck() {}}
        severity="success"
        title="Message successfully sent"
      />

      <Tabs
        tabs={[
          {label: 'Tab 1', iconId: 'fr-icon-add-line', content: <p>Content of tab1</p>},
          {label: 'Tab 2', iconId: 'fr-icon-ball-pen-fill', content: <p>Content of tab2</p>},
          {label: 'Tab 3', content: <p>Content of tab3</p>},
        ]}
      />

      <Stepper currentStep={1} nextTitle="Titre de la prochaine étape" stepCount={3} title="Titre de l’étape en cours" />
    </div>
  )
}
