import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/Report'
import {fnSwitch} from '@/utils/FnSwitch'

export function ProblemConsumerWishInformation({
  consumerWish,
  hasTelecomTag,
}: {
  consumerWish: ConsumerWish
  hasTelecomTag: boolean
}) {
  const {m} = useI18n()
  const texts: string[] = fnSwitch(consumerWish, {
    reportSomething: [
      m.consumerWishFixContractualDispute,
      m.consumerWishInvestigationIsPossible,
      // This SAV reminder was a request of telecoms companies
      // it doesn't seem as pertinent in other cases
      ...(hasTelecomTag ? [m.reminderToContactSav] : []),
    ],
    getAnswer: [m.consumerWishGetAnswer],
  })
  return (
    <Animate>
      <FriendlyHelpText>
        {texts.map((text, index) => (
          <p key={index} className="mb-0" dangerouslySetInnerHTML={{__html: text}} />
        ))}
      </FriendlyHelpText>
    </Animate>
  )
}
