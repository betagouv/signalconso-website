import Button from '@codegouvfr/react-dsfr/Button'
import {ForwardedRef, MouseEventHandler, ReactNode, forwardRef, useId} from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
  placeholder?: string
  error: boolean
  helperText?: ReactNode
  required: boolean
  label?: ReactNode
  desc?: ReactNode
  autocomplete?: string
  type?: 'text' | 'email' | 'tel' | 'number'
  inputtype?: 'numeric'
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
  onClick?: MouseEventHandler<HTMLDivElement>
  disableLeftBorderOnError?: boolean
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
    inputtype,
    disabled = false,
    editable,
    clearable,
    onClick = () => {},
    disableLeftBorderOnError = false,
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
      className={`fr-input-group ${error ? 'fr-input-group--error' : ''} ${disabled ? 'fr-input-group--disabled' : ''} ${
        disableLeftBorderOnError ? 'before:!hidden' : ''
      } sctextinput`}
      onClick={onClick}
    >
      {label && (
        <label className={`fr-label ${disabled ? '!text-gray-600' : ''}`} htmlFor={inputId}>
          {labelWithAsterisk}
          {desc && <span className={`fr-hint-text ${disabled ? '!text-gray-600' : ''}`}>{desc}</span>}
        </label>
      )}

      <div className="flex">
        <input
          autoComplete={autocomplete}
          id={inputId}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          type={type}
          {...(inputtype ? {inputtype} : null)}
          readOnly={disabled}
          placeholder={placeholder}
          className={`fr-input ${error ? 'fr-input--error' : ''} ${disabled ? '!text-gray-600 !shadow-none' : ''}`}
          aria-describedby={helperTextId}
          {...(error ? {'aria-invalid': true} : null)}
          {...(required ? {'aria-required': true} : null)}
          // If the edit button is displayed
          // no need for the input itself to be accessible through keyboard
          {...(editable && disabled ? {tabIndex: -1} : null)}
        />
        {editable && (
          <Button
            iconId="fr-icon-edit-line"
            onClick={() => {
              document.getElementById(inputId)?.focus()
              editable.onEdit()
            }}
            priority="tertiary"
            title={editable.label}
          />
        )}
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
