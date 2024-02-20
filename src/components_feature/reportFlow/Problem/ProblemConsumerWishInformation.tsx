import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {I18nContextProps, useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/ReportDraft'

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
  const reminderMessage = <p className="mb-4">{m.reminderBeforeReporting}</p>
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
          <p className="mb-4">{m.consumerWishCompanyImprovement}</p>
        </>
      )
    case 'getAnswer':
      return <p className="mb-4">{m.consumerWishGetAnswer}</p>
  }
}

function pickSecondText(m: I18nContextProps['m'], consumerWish: ConsumerWish) {
  m.consumerWishFixContractualDispute
  switch (consumerWish) {
    case 'fixContractualDispute':
    case 'companyImprovement':
      return <p className="mb-0">{m.consumerWishInvestigationIsPossible}</p>
    case 'getAnswer':
      return <p className="mb-0">{m.consumerWishInvestigationIsPossible2}</p>
  }
}
