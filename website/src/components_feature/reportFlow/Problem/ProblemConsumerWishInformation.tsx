import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {I18nContextProps, useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/Report'

export function ProblemConsumerWishInformation({consumerWish}: {consumerWish: ConsumerWish}) {
  const {m} = useI18n()
  return (
    <Animate>
      <FriendlyHelpText>
        {pickText(m, consumerWish)}
        {pickSecondText(m, consumerWish)}
      </FriendlyHelpText>
    </Animate>
  )
}

function pickText(m: I18nContextProps['m'], consumerWish: ConsumerWish) {
  // TODO add this service client warning ONLY if tag Telecom present (they wanted it)
  const reminderMessage = 1 + 1 === 3 ? <p className="mb-4">{m.reminderBeforeReporting}</p> : null
  switch (consumerWish) {
    case 'fixContractualDispute':
      return (
        <>
          {reminderMessage}
          <p className="mb-4" dangerouslySetInnerHTML={{__html: m.consumerWishFixContractualDispute}} />
        </>
      )
    case 'companyImprovement':
      return (
        <>
          {reminderMessage}
          <p className="mb-4" dangerouslySetInnerHTML={{__html: m.consumerWishFixContractualDispute}} />
        </>
      )
    case 'getAnswer':
      return <p className="mb-4" dangerouslySetInnerHTML={{__html: m.consumerWishGetAnswer}} />
  }
}

function pickSecondText(m: I18nContextProps['m'], consumerWish: ConsumerWish) {
  switch (consumerWish) {
    case 'fixContractualDispute':
    case 'companyImprovement':
      return <p className="mb-0">{m.consumerWishInvestigationIsPossible}</p>
    case 'getAnswer':
      return null
  }
}
