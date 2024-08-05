import {useI18n} from '@/i18n/I18n'
import {ForwardedRef, ReactNode, forwardRef, useId} from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
  name: string
  error: boolean
  helperText?: ReactNode
  required: boolean
  label?: ReactNode
  desc?: ReactNode
  options: {key: string; label: string}[]
}
export const ScSelect = forwardRef((props: Props, ref: ForwardedRef<HTMLSelectElement>) => {
  const {onChange, onBlur, name, label, desc, error, helperText, required, options} = props
  const inputId = useId()
  const helperTextId = useId()
  const labelWithAsterisk = (
    <>
      {label}
      {required ? ' *' : null}
    </>
  )
  const {m} = useI18n()
  return (
    <div className={`fr-select-group ${error ? 'fr-select-group--error' : null}`}>
      {label && (
        <label className="fr-label" htmlFor={inputId}>
          {labelWithAsterisk}
          {desc && <span className="fr-hint-text">{desc}</span>}
        </label>
      )}

      <select
        className="fr-select"
        id={inputId}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        aria-describedby={helperTextId}
        {...(error ? {'aria-invalid': true} : null)}
        {...(required ? {'aria-required': true} : null)}
      >
        <option value="" disabled hidden>
          {m.select}
        </option>
        {options.map(option => {
          return (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          )
        })}
      </select>
      {helperText && (
        <p id={helperTextId} className={error ? 'fr-error-text' : 'fr-info-text'} {...(error ? {'aria-live': 'polite'} : null)}>
          {helperText}
        </p>
      )}
    </div>
  )
})
