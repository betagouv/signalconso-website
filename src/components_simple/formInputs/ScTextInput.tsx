import {ForwardedRef, ReactNode, forwardRef, useId} from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
  placeholder?: string
  error: boolean
  helperText: ReactNode
  required: boolean
  label: ReactNode
  desc?: ReactNode
}

export const ScTextInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const {onChange, onBlur, name, placeholder, label, desc, error, helperText, required} = props
  const inputId = useId()
  const helperTextId = useId()
  const labelWithAsterisk = (
    <>
      {label}
      {required ? ' *' : null}
    </>
  )
  return (
    <div className={`fr-input-group ${error ? 'fr-input-group--error' : null}`}>
      <label className="fr-label" htmlFor={inputId}>
        {labelWithAsterisk}
        {desc && <span className="fr-hint-text">{desc}</span>}
      </label>
      <input
        id={inputId}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        type="text"
        placeholder={placeholder}
        className={`fr-input ${error ? 'fr-input--error' : null}`}
        aria-describedby={helperTextId}
        {...(required ? {'aria-required': true} : null)}
      />
      {helperText && (
        <p id={helperTextId} className={error ? 'fr-error-text' : 'fr-info-text'} {...(error ? {'aria-live': 'polite'} : null)}>
          {helperText}
        </p>
      )}
    </div>
  )
})
