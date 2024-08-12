import {ReactNode, Ref, forwardRef, useId} from 'react'

interface Props {
  onChange: (value: boolean) => void
  label: ReactNode
  value: boolean
  error?: boolean
  errorMessage?: string
  required: boolean
}
type RefType = Ref<HTMLFieldSetElement>

export const ScCheckbox = forwardRef((props: Props, ref: RefType) => {
  const {onChange, value, label, error, errorMessage, required} = props
  const _id = useId()
  const id = `fr-fieldset-checkbox-${_id}`
  const checkboxName = `checkbox-name-${id}`
  const messagesWrapperId = `${id}-messages`
  const inputId = `checkbox-rich-${id}`
  const checked = value
  return (
    <fieldset
      id={id}
      className={`fr-fieldset ${error ? 'fr-fieldset--error' : ''}`}
      aria-labelledby={`${messagesWrapperId}`}
      {...(required ? {'aria-required': true} : null)}
      ref={ref}
    >
      <div className="fr-fieldset__content fr-fieldset__element">
        <div className={`fr-checkbox-group`}>
          <input type="checkbox" id={inputId} name={checkboxName} onChange={() => onChange(value)} checked={checked}></input>
          <label className="fr-label" htmlFor={inputId}>
            <div className="flex flex-col gap-2 items-start justify-start ">{label}</div>
          </label>
        </div>
      </div>
      {error && errorMessage && (
        <div className="fr-messages-group" id={messagesWrapperId} aria-live="assertive">
          <p className="fr-message fr-message--error">{errorMessage}</p>
        </div>
      )}
    </fieldset>
  )
})
