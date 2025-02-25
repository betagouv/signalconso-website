import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import Alert from '@codegouvfr/react-dsfr/Alert'

export function ConsumerAnonymousInformation() {
  const {m} = useI18n()
  return (
    <Animate>
      <div>
        <Alert
          severity="warning"
          title=""
          description={<p className="mb-0" title="" dangerouslySetInnerHTML={{__html: m.consumerAnonymousInformation}} />}
        />
        {/* <ScAlert type="error">
          <p className="mb-0" dangerouslySetInnerHTML={{__html: m.consumerAnonymousInformation}} />
        </ScAlert> */}
      </div>
    </Animate>
  )
}
