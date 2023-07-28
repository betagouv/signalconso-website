import {Box, SxProps} from '@mui/material'
import {Theme} from '@mui/system'
import {Animate} from 'components_simple/Animate/Animate'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {ScRadioGroup} from 'components_simple/RadioGroup/RadioGroup'
import {ScRadioGroupItem} from 'components_simple/RadioGroup/RadioGroupItem'

interface ProblemSelectProps<T> {
  autoScrollTo?: boolean
  title?: string
  value?: T
  onChange: (_: T) => void
  options: {
    title: string
    description?: string
    value: T
  }[]
  id?: string
}

export const ProblemSelect = <T,>({autoScrollTo, title: titleRaw, value, options, onChange, id}: ProblemSelectProps<T>) => {
  const title = <span dangerouslySetInnerHTML={{__html: titleRaw ?? 'Pouvez-vous préciser ?'}} />
  const nonNullableValue = value ?? ('' as T) // To unselected to radio button when a subcategory has changed
  return (
    <Animate {...{autoScrollTo}}>
      <div {...{id}}>
        <h2 className="fr-h6">{title}</h2>
        <ScRadioGroup value={nonNullableValue} onChange={onChange} sx={{mb: 2}}>
          {options.map(option => (
            <ScRadioGroupItem
              key={option.value + ''}
              value={option.value}
              title={option.title}
              description={option.description}
            />
          ))}
        </ScRadioGroup>
      </div>
    </Animate>
  )
}
