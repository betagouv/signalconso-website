import {useCssUtils} from '../../../core/theme/useCssUtils'
import {Box, capitalize} from '@mui/material'
import {ScRadioGroup, ScRadioGroupItem} from '../../../shared/RadioGroup'
import React from 'react'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'
import {Animate} from '../../../shared/Animate/Animate'

interface ProblemSelectProps<T> {
  animatePanel?: boolean
  autoScrollToPanel?: boolean
  title?: string,
  value?: T
  onChange: (_: T) => void
  options: {
    title: string
    description?: string
    value: T
  }[],
}

export const ProblemSelect = <T, >({
  animatePanel,
  autoScrollToPanel,
  title,
  value,
  options,
  onChange
}: ProblemSelectProps<T>) => {
  const css = useCssUtils()

  return (
    <Animate animate={animatePanel} autoScrollTo={autoScrollToPanel}>
      <Panel sx={{position: 'relative'}} title={<span dangerouslySetInnerHTML={{__html: title ?? 'Pouvez-vous préciser ?'}}/>}>
        <Box sx={{position: 'absolute', top: -90, display: 'block'}}/>
        <PanelBody>
          <ScRadioGroup value={value} onChange={onChange} className={css.marginBottom2}>
            {options.map(option =>
              <ScRadioGroupItem
                key={option.value + ''}
                value={option.value}
                title={capitalize(option.title)}
                description={option.description}
              />
            )}
          </ScRadioGroup>
        </PanelBody>
      </Panel>
    </Animate>
  )
}
