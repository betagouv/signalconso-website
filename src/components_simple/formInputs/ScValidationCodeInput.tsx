import {useI18n} from 'i18n/I18n'
import {ForwardedRef, ReactNode, forwardRef, useId} from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
  placeholder?: string
  error: boolean
  helperText?: ReactNode
  required: boolean
}
export const ScValidationCodeInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const {onChange, onBlur, name, error, helperText, required} = props
  const inputId = useId()
  const helperTextId = useId()
  const {m} = useI18n()
  return (
    <div className={`fr-input-group ${error ? 'fr-input-group--error' : null}`}>
      <div className={`before:content-['SC-'] before:absolute before:top-2 before:left-2 before:text-gray-600`}>
        <input
          aria-label={m.consumerValidationCode}
          className={`fr-input ${error ? 'fr-input--error' : null} !pl-9`}
          id={inputId}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          type={'number'}
          placeholder={m.consumerCodePlaceholder}
          aria-describedby={helperTextId}
          {...(error ? {'aria-invalid': true} : null)}
          {...(required ? {'aria-required': true} : null)}
          autoFocus
        />
      </div>
      {helperText && (
        <p id={helperTextId} className={error ? 'fr-error-text' : 'fr-info-text'} {...(error ? {'aria-live': 'polite'} : null)}>
          {helperText}
        </p>
      )}
    </div>
  )
})
