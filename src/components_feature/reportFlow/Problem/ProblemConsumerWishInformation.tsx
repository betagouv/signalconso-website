import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {I18nContextProps, useI18n} from '@/i18n/I18n'
import {ConsumerWish} from '@/model/ReportDraft'

export function ProblemConsumerWishInformation({consumerWish}: {consumerWish: ConsumerWish}) {
  const {m} = useI18n()
  return (
    <Animate>
      <FriendlyHelpText>
        <p className="mb-4">{pickText(m, consumerWish)}</p>
        <p className="mb-0">{pickSecondText(m, consumerWish)}</p>
      </FriendlyHelpText>
    </Animate>
  )
}

function pickText(m: I18nContextProps['m'], consumerWish: ConsumerWish) {
  switch (consumerWish) {
    case 'fixContractualDispute':
      return <span dangerouslySetInnerHTML={{__html: m.consumerWishFixContractualDispute}} />
    case 'companyImprovement':
      return m.consumerWishCompanyImprovement
    case 'getAnswer':
      return m.consumerWishGetAnswer
  }
}

function pickSecondText(m: I18nContextProps['m'], consumerWish: ConsumerWish) {
  m.consumerWishFixContractualDispute
  switch (consumerWish) {
    case 'fixContractualDispute':
    case 'companyImprovement':
      return m.consumerWishInvestigationIsPossible
    case 'getAnswer':
      return m.consumerWishInvestigationIsPossible2
  }
}
