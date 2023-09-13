import {ReactNode, useId} from 'react'

interface ScRadioButtonsProps<V> {
  title?: ReactNode
  description?: string
  // do not respect DSFR style, less bold, less margins, etc.
  titleSoberStyle?: boolean
  onChange: (value: V) => void
  options: {
    label: ReactNode
    description?: ReactNode
    value: V
    specify?: ReactNode
    disabled?: boolean
  }[]
  value: V | undefined
  error?: boolean
  errorMessage?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
  required?: boolean
}

export const ScRadioButtons = <V,>({
  title,
  description,
  titleSoberStyle = false,
  onChange,
  options,
  value: selectedValue,
  error,
  errorMessage,
  orientation,
  className = '',
  required,
}: ScRadioButtonsProps<V>) => {
  const _id = useId()
  const id = `fr-fieldset-radio-${_id}`
  const legendId = `${id}-legend`
  const radioName = `radio-name-${id}`
  const messagesWrapperId = `${id}-messages`

  const createDescription = (description: ReactNode) => {
    if (typeof description === 'string') {
      return <span className="text-sm text-[#666666]">{description}</span>
    } else {
      return <div className="z-10">{description}</div>
    }
  }

  return (
    <fieldset
      id={id}
      className={`fr-fieldset ${orientation === 'horizontal' && 'fr-fieldset--inline'} ${
        error ? 'fr-fieldset--error' : ''
      } ${className}`}
      aria-labelledby={`${title && legendId} ${messagesWrapperId}`}
      role="group"
    >
      {title && (
        <legend id={legendId} className={`fr-fieldset__legend ${titleSoberStyle ? '!font-normal !pb-0' : ''}`}>
          {title}
          {required && <span> *</span>}
          {description && <span className="fr-hint-text">{description}</span>}
        </legend>
      )}
      <div
        className={`fr-fieldset__content fr-fieldset__element !ml-0 !mt-4 ${
          orientation === 'horizontal' && 'fr-fieldset__element--inline'
        }`}
      >
        {options.map(({label, description, value, specify, disabled}, i) => {
          const inputId = `radio-rich-${id}-${i}`
          const checked = value === selectedValue
          return (
            <div
              key={i}
              className={`fr-radio-group !max-w-full border border-gray-300 border-solid mb-1 hover:bg-gray-100 hover:border-scbluefrance ${
                disabled ? 'pointer-events-none opacity-60' : ''
              } ${checked ? 'border-scbluefrance border-2' : ''}`}
            >
              <input type="radio" id={inputId} name={radioName} onChange={() => onChange(value)} checked={checked}></input>
              <label className="fr-label !pr-4 ml-4" htmlFor={inputId}>
                {label}
                {description && createDescription(description)}
                {checked && specify}
              </label>
            </div>
          )
        })}
      </div>
      {error && errorMessage && (
        <div className="fr-messages-group" id={messagesWrapperId} aria-live="assertive">
          <p className="fr-message fr-message--error">{errorMessage}</p>
        </div>
      )}
    </fieldset>
  )
}
