import {Box} from '@mui/material'
import {Animate} from 'components_simple/Animate/Animate'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {useI18n} from 'i18n/I18n'
import {ConsumerWish} from 'model/ReportDraft'
import {alertInfoBackgroundColor, alertInfoTextColor} from '../../../alexlibs/mui-extension/Alert/Alert'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {I18nContextProps} from 'i18n/I18n'

export function ProblemConsumerWishInformation({consumerWish}: {consumerWish: ConsumerWish}) {
  const {m} = useI18n()
  const textStyle = {lineHeight: '1.3'}
  return (
    <Animate>
      <Box
        sx={{
          py: 2,
          px: 4,
          background: alertInfoBackgroundColor,
          color: alertInfoTextColor,
        }}
      >
        <Txt sx={textStyle} block>
          {pickText(m, consumerWish)}
        </Txt>
        <Txt sx={{mt: 2, ...textStyle}} block>
          {m.consumerWishInvestigationIsPossible}
        </Txt>
      </Box>
    </Animate>
  )
}

function pickText(m: I18nContextProps['m'], consumerWish: ConsumerWish) {
  m.consumerWishFixContractualDispute
  switch (consumerWish) {
    case 'fixContractualDispute':
      return <span dangerouslySetInnerHTML={{__html: m.consumerWishFixContractualDispute}} />
    case 'companyImprovement':
      return m.consumerWishCompanyImprovement
    case 'getAnswer':
      return m.consumerWishGetAnswer
  }
}

// Legacy wording, should disappear soon
export const ProblemContractualDisputeWarnPanel = () => {
  const {m} = useI18n()
  return (
    <Animate>
      <Panel
        id="panel-contractual-dispute"
        border
        title={m.problemContractualDisputeTitle}
        desc={m.problemContractualDisputeDesc}
      >
        <PanelBody>
          <Txt bold>{m.problemContractualDisputeInfoTitle}</Txt>
          <Txt color="hint" dangerouslySetInnerHTML={{__html: m.problemContractualDisputeInfo}} />
        </PanelBody>
      </Panel>
    </Animate>
  )
}
