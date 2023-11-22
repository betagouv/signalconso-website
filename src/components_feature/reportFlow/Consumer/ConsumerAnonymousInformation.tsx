import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import {alertWarningBackgroundColor, alertWarningTextColor} from '../../../components_simple/ScAlert'

export function ConsumerAnonymousInformation() {
  const {m} = useI18n()
  return (
    <Animate>
      <div>
        <div className="py-4 px-8" style={{background: alertWarningBackgroundColor, color: alertWarningTextColor}}>
          <p className="mb-0">{m.consumerAnonymousInformation}</p>
        </div>
      </div>
    </Animate>
  )
}
