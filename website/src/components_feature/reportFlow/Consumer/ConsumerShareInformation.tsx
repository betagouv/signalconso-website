import {useI18n} from '@/i18n/I18n'
import {Animate} from '@/components_simple/Animate'
import {alertWarningBackgroundColor, alertWarningTextColor} from '@/components_simple/ScAlert'

export function ConsumerShareInformation() {
  const {m} = useI18n()
  return (
    <Animate>
      <div>
        <div className="py-4 px-8" style={{background: alertWarningBackgroundColor, color: alertWarningTextColor}}>
          <p className="mb-0">{m.consumerShareInformation}</p>
        </div>
      </div>
    </Animate>
  )
}
