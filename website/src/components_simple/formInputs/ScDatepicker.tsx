import {useI18n} from '@/i18n/I18n'
import {frenchToIsoFormat} from '@/utils/utils'
import React, {ForwardedRef, ReactNode, forwardRef, useId} from 'react'
import {OptionalLabel} from './OptionalLabel'

export interface ScDatepickerProps {
  label?: ReactNode
  desc?: string
  required: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
  // These are only indicative
  // The user can always go around these limits by typing a date manually instead of using the picker
  min?: string
  max?: string
  placeholder?: string
  error: boolean
  helperText?: ReactNode
}

export const ScDatepicker = forwardRef((props: ScDatepickerProps, ref: ForwardedRef<HTMLInputElement>) => {
  const {onChange, onBlur, name, placeholder, label, desc, error, helperText, required, min, max} = props
  const {m} = useI18n()
  const inputId = useId()
  const helperTextId = useId()
  const labelWithAsterisk = (
    <>
      {label}
      <OptionalLabel {...{required}} />
    </>
  )
  return (
    <div className={`fr-input-group ${error ? 'fr-input-group--error' : null} sctextinput`}>
      {label && (
        <label className="fr-label" htmlFor={inputId}>
          {labelWithAsterisk}
          {desc && <span className="fr-hint-text">{desc}</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        type={'date'}
        {...(max && {max: frenchToIsoFormat(max)})}
        {...(min && {min: frenchToIsoFormat(min)})}
        placeholder={placeholder}
        className={`fr-input ${error ? 'fr-input--error' : null}`}
        {...(error ? {'aria-invalid': true} : null)}
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
