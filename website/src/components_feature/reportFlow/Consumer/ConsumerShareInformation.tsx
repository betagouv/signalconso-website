import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'

import Alert from '@codegouvfr/react-dsfr/Alert'
export function ConsumerShareInformation() {
  const {m} = useI18n()
  return (
    <Animate>
      <Alert
        severity="info"
        title={m.companyWillKnowYourIdentity}
        description={<p className="mb-0" dangerouslySetInnerHTML={{__html: m.consumerShareInformation}} />}
      />
    </Animate>
  )
}
