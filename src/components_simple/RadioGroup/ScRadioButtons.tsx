import {ReactNode, useId} from 'react'

interface ScRadioButtonsProps<V> {
  title?: ReactNode
  description?: string
  onChange: (value: V) => void
  options: {
    label: ReactNode
    description?: ReactNode
    value: V
    specify?: ReactNode
    disabled?: boolean
  }[]
  value: V | undefined
  errorMessage?: string
  orientation?: 'vertical' | 'horizontal'
}

export const ScRadioButtons = <V,>({
  title,
  description,
  onChange,
  options,
  value: selectedValue,
  errorMessage,
  orientation,
}: ScRadioButtonsProps<V>) => {
  const _id = useId()
  const id = `fr-fieldset-radio-${_id}`
  const legendId = `${id}-legend`
  const radioName = `radio-name-${id}`
  const messagesWrapperId = `${id}-messages`

  const createDescription = (description: ReactNode) => {
    if (typeof description === 'string') {
      return <span className="fr-hint-text">{description}</span>
    } else {
      return <div className="z-10">{description}</div>
    }
  }

  return (
    <fieldset
      id={id}
      className={`fr-fieldset ${orientation === 'horizontal' && 'fr-fieldset--inline'} ${
        errorMessage ? 'fr-fieldset--error' : ''
      }`}
      aria-labelledby={`${title && legendId} ${messagesWrapperId}`}
      role="group"
    >
      {title && (
        <legend id={legendId} className="fr-fieldset__legend">
          {title}
          {description && <span className="fr-hint-text">{description}</span>}
        </legend>
      )}
      <div
        className={`fr-fieldset__content fr-fieldset__element ${orientation === 'horizontal' && 'fr-fieldset__element--inline'}`}
      >
        {options.map(({label, description, value, specify, disabled}, i) => {
          const inputId = `radio-rich-${id}-${i}`
          const checked = value === selectedValue
          return (
            <div key={i} className={`fr-radio-group fr-radio-rich ${disabled ? 'pointer-events-none opacity-60' : ''}`}>
              <input type="radio" id={inputId} name={radioName} onChange={() => onChange(value)} checked={checked}></input>
              <label className="fr-label" htmlFor={inputId}>
                {label}
                {description && createDescription(description)}
                {checked && specify}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
