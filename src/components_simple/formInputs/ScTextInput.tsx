import Button from '@codegouvfr/react-dsfr/Button'
import {ForwardedRef, ReactNode, forwardRef, useId} from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
  placeholder?: string
  error: boolean
  helperText?: ReactNode
  required: boolean
  label: ReactNode
  desc?: ReactNode
  autocomplete?: string
  defaultValue?: string
  type?: 'text' | 'email' | 'tel'
  disabled?: boolean
  clearable?: {
    onClear: () => void
    label: string
  }
  editable?: {
    onEdit: () => void
    label: string
  }
  tabIndex?: number
}

export const ScTextInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    onChange,
    onBlur,
    autocomplete,
    name,
    placeholder,
    label,
    desc,
    error,
    helperText,
    required,
    type = 'text',
    disabled = false,
    editable,
    clearable,
    tabIndex,
  } = props
  const inputId = useId()
  const helperTextId = useId()
  const labelWithAsterisk = (
    <>
      {label}
      {required ? ' *' : null}
    </>
  )
  return (
    <div
      className={`fr-input-group ${error ? 'fr-input-group--error' : null} ${
        disabled ? 'fr-input-group--disabled' : null
      } sctextinput`}
    >
      <label className="fr-label" htmlFor={inputId}>
        {labelWithAsterisk}
        {desc && <span className="fr-hint-text">{desc}</span>}
      </label>

      <div className="flex">
        <input
          autoComplete={autocomplete}
          id={inputId}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={`fr-input ${error ? 'fr-input--error' : null}`}
          aria-describedby={helperTextId}
          {...(required ? {'aria-required': true} : null)}
          {...(tabIndex ? {tabIndex} : null)}
        />
        {editable && <Button iconId="fr-icon-edit-line" onClick={editable.onEdit} priority="tertiary" title={editable.label} />}
        {clearable && (
          <Button iconId="fr-icon-close-line" onClick={clearable.onClear} priority="tertiary" title={clearable.label} />
        )}
      </div>
      {helperText && (
        <p id={helperTextId} className={error ? 'fr-error-text' : 'fr-info-text'} {...(error ? {'aria-live': 'polite'} : null)}>
          {helperText}
        </p>
      )}
    </div>
  )
})
