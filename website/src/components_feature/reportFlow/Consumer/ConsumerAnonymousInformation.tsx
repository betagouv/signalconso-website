import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import {Alert} from '@codegouvfr/react-dsfr/Alert'

export function ConsumerAnonymousInformation() {
  const {m} = useI18n()
  return (
    <Animate>
      <div>
        <Alert
          severity="warning"
          title={m.youStayAnonymous}
          description={<p className="mb-0" title="" dangerouslySetInnerHTML={{__html: m.consumerAnonymousInformation}} />}
        />
      </div>
    </Animate>
  )
}
