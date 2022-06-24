import {Panel, PanelBody, PanelProps} from 'shared/Panel/Panel'
import {Txt} from '../../../alexlibs/mui-extension'
import React from 'react'
import {Animate} from 'shared/Animate/Animate'
import {useI18n} from 'core/i18n'

interface Props extends PanelProps {
  animatePanel?: boolean
  autoScrollToPanel?: boolean
}

export const ProblemContratualDisputeWarnPanel = ({animatePanel, autoScrollToPanel}: Props) => {
  const {m} = useI18n()
  return (
    <Animate animate={animatePanel} autoScrollTo={autoScrollToPanel}>
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
