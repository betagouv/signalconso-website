import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'

export function ConsumerAnonymousInformation() {
  const {m} = useI18n()
  return (
    <Animate>
      <div
        role="alert"
        tabIndex={0}
        className="fr-alert fr-alert--warning rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scbluefrance"
      >
        <h3 className="fr-alert__title">{m.youStayAnonymous}</h3>
        <p className="mb-0">{m.consumerAnonymousInformation}</p>
      </div>
    </Animate>
  )
}
