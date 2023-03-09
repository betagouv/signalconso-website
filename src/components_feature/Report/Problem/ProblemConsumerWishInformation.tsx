import {Box} from '@mui/material'
import {Animate} from 'components_simple/Animate/Animate'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {useI18n} from 'i18n/I18n'
import {ConsumerWish} from 'model/ReportDraft'
import {alertInfoBackgroundColor, alertInfoTextColor} from '../../../alexlibs/mui-extension/Alert/Alert'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'

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
          {pickText(consumerWish)}
        </Txt>
        <Txt sx={{mt: 2, ...textStyle}} block>
          La répression des fraudes pourra décider de mener une enquête sur l'entreprise grâce à vos informations.
        </Txt>
      </Box>
    </Animate>
  )
}

function pickText(consumerWish: ConsumerWish) {
  switch (consumerWish) {
    case 'fixContractualDispute':
      return (
        <>
          Votre signalement sera transmis à l'entreprise. La répression des fraudes ne s'occupe pas de résoudre les problèmes
          individuels, mais <strong>faire le signalement peut inciter l'entreprise à vous répondre.</strong>
        </>
      )
    case 'companyImprovement':
      return `Votre signalement sera transmis à l'entreprise. Vous aurez la possibilité de rester anonyme.`
    case 'getAnswer':
      return `Un agent vous répondra prochainement. L'entreprise ne sera pas informée de votre démarche.`
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
