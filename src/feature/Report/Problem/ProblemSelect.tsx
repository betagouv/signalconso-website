import {useCssUtils} from '../../../core/theme/useCssUtils'
import {Box, capitalize} from '@mui/material'
import {ScRadioGroup, ScRadioGroupItem} from '../../../shared/RadioGroup'
import React, {useRef} from 'react'
import {useTimeout} from '@alexandreannic/react-hooks-lib'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'

interface ProblemSelectProps<T> {
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
  title,
  value,
  options,
  onChange
}: ProblemSelectProps<T>) => {
  const inputEl = useRef(null)
  const css = useCssUtils()

  useTimeout(() => {
    (inputEl.current as any).scrollIntoView({behavior: 'smooth', block: 'start'})
  }, 100)

  return (
    <Panel sx={{position: 'relative'}} title={<span dangerouslySetInnerHTML={{__html: title ?? 'Pouvez-vous préciser ?'}}/>}>
      <Box ref={inputEl} sx={{position: 'absolute', top: -90, display: 'block'}}/>
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
  )
}
