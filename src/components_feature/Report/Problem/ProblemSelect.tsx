import {Animate} from 'components_simple/Animate/Animate'
import {ScRadioButtons} from '../../../components_simple/RadioGroup/ScRadioButtons'

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
  const title = <h2 className="fr-h6" dangerouslySetInnerHTML={{__html: titleRaw ?? 'Pouvez-vous préciser ?'}} />
  const nonNullableValue = value ?? ('' as T) // To unselected to radio button when a subcategory has changed
  return (
    <Animate {...{autoScrollTo}}>
      <div {...{id}}>
        <ScRadioButtons
          title={title}
          onChange={onChange}
          value={nonNullableValue}
          options={options.map(option => {
            return {
              label: option.title,
              description: option.description,
              value: option.value,
            }
          })}
        />
      </div>
    </Animate>
  )
}
