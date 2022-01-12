import {useCssUtils} from '../../../core/theme/useCssUtils'
import {Box, capitalize, Slide} from '@mui/material'
import {Txt} from 'mui-extension'
import {ScRadioGroup} from '../../../shared/RadioGroup/RadioGroup'
import {ScRadioGroupItem} from '../../../shared/RadioGroup/RadioGroupItem'
import React from 'react'

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
  const css = useCssUtils()
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Box sx={{mb: 4}}>
        <Txt block size="title" dangerouslySetInnerHTML={{__html: title ?? 'Pouvez-vous préciser ?'}} sx={{mb: 2,}}/>
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
      </Box>
    </Slide>
  )
}
