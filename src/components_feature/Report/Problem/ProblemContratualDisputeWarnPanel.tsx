import {Panel, PanelBody, PanelProps} from 'components_simple/Panel/Panel'
import {Txt} from '../../../alexlibs/mui-extension'
import React from 'react'
import {Animate} from 'components_simple/Animate/Animate'
import {useI18n} from 'i18n'

interface Props extends PanelProps {}

export const ProblemContratualDisputeWarnPanel = ({}: Props) => {
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
