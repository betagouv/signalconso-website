import {Input} from '@codegouvfr/react-dsfr/Input'
import {ForwardedRef, LegacyRef, ReactNode, forwardRef, useId} from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  name: string
  placeholder?: string
  error: boolean
  helperText: ReactNode
  required: boolean
  label: ReactNode
  desc?: ReactNode
}

export const ScTextarea = forwardRef((props: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const {onChange, onBlur, name, placeholder, label, desc, error, helperText, required} = props
  const inputId = useId()
  const helperTextId = useId()
  const labelWithAsterisk = (
    <>
      {label}
      {required ? ' *' : null}
    </>
  )
  const state = error ? 'error' : 'default'

  return (
    <div className={`fr-input-group ${error ? 'fr-input-group--error' : null}`}>
      <label className="fr-label" htmlFor={inputId}>
        {labelWithAsterisk}
        {desc && <span className="fr-hint-text">{desc}</span>}
      </label>
      <textarea
        id={inputId}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        className={`fr-input ${error ? 'fr-input--error' : null}`}
        aria-describedby={helperTextId}
        rows={5}
        {...(required ? {'aria-required': true} : null)}
      />
      <p id={helperTextId} className={error ? 'fr-error-text' : 'fr-info-text'} {...(error ? {'aria-live': 'polite'} : null)}>
        {helperText}
      </p>
    </div>
  )
})
