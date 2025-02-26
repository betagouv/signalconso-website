import {Animate} from '@/components_simple/Animate'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {useI18n} from '../../../i18n/I18n'

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
  const {m} = useI18n()
  const title = <h2 className="fr-h6" dangerouslySetInnerHTML={{__html: titleRaw ?? m.couldYouPrecise}} />
  const nonNullableValue = value ?? ('' as T) // To unselected to radio button when a subcategory has changed
  return (
    <Animate {...{autoScrollTo}}>
      <div {...{id}}>
        <ScRadioButtons
          title={title}
          required
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
