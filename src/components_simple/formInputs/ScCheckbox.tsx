import {ReactNode, useId} from 'react'

interface ScCheckboxProps<V> {
  title?: ReactNode
  description?: string
  onChange: (value: V[]) => void
  options: {
    label: ReactNode
    value: V
    specify?: ReactNode
  }[]
  value: V[] | undefined
  error?: boolean
  errorMessage?: string
}

export const ScCheckbox = <V,>({
  title,
  description,
  onChange,
  options,
  value: selectedValue,
  error,
  errorMessage,
}: ScCheckboxProps<V>) => {
  const _id = useId()
  const id = `fr-fieldset-checkbox-${_id}`
  const legendId = `${id}-legend`
  const checkboxName = `checkbox-name-${id}`
  const messagesWrapperId = `${id}-messages`

  const onChangeValue = (value: V, selectedValue: V[]) => {
    if (selectedValue.includes(value)) {
      onChange(selectedValue.filter(_ => _ !== value))
    } else {
      onChange([...selectedValue, value])
    }
  }

  return (
    <fieldset
      id={id}
      className={`fr-fieldset ${error ? 'fr-fieldset--error' : ''}`}
      aria-labelledby={`${title && legendId} ${messagesWrapperId}`}
      role="group"
    >
      {title && (
        <legend id={legendId} className="fr-fieldset__legend">
          {title}
          {description && <span className="fr-hint-text">{description}</span>}
        </legend>
      )}
      <div className="fr-fieldset__content fr-fieldset__element !ml-0 mt-4">
        {options.map(({label, value, specify}, i) => {
          const inputId = `checkbox-rich-${id}-${i}`
          const checked = selectedValue?.includes(value)
          return (
            <div
              key={i}
              className={`fr-checkbox-group border border-gray-300 border-solid mb-1 hover:bg-gray-100 hover:border-scbluefrance ${
                checked ? 'border-scbluefrance' : ''
              }`}
            >
              <input
                type="checkbox"
                id={inputId}
                name={checkboxName}
                onChange={() => onChangeValue(value, selectedValue ?? [])}
                checked={checked}
              ></input>
              <label className="fr-label !pr-4 !pl-12 !ml-0 before:ml-12" htmlFor={inputId}>
                {label}
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