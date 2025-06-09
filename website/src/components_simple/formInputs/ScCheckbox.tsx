import {ChangeEventHandler, FocusEventHandler, ReactNode, Ref, forwardRef, useId} from 'react'

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  name: string
  label: ReactNode
  checked: boolean
  error?: boolean
  errorMessage?: string
  required: boolean
}
type RefType = Ref<HTMLFieldSetElement>

export const ScCheckbox = forwardRef((props: Props, ref: RefType) => {
  const {label, error, errorMessage, required, name, onBlur, onChange, checked} = props
  const _id = useId()
  const id = `fr-fieldset-checkbox-${_id}`
  const messagesWrapperId = `${id}-messages`
  const inputId = `checkbox-rich-${id}`
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
          <input type="checkbox" id={inputId} {...{name, onBlur, onChange, checked}} />
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
