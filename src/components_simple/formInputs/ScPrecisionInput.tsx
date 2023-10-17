import {useI18n} from 'i18n/I18n'
import {ForwardedRef, ReactNode, forwardRef, useId} from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
  error: boolean
  helperText?: ReactNode
  required: boolean
}
export const ScPrecisionInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const {onChange, onBlur, name, error, helperText, required} = props
  const {m} = useI18n()
  const inputId = useId()
  const helperTextId = useId()

  return (
    <div
      className={`fr-input-group ${error ? 'fr-input-grodup--error' : null}`}
      onClick={e => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <input
        id={inputId}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        type={'text'}
        placeholder={m.specify}
        className={`fr-input ${error ? 'fr-input--error' : null}`}
        aria-describedby={helperTextId}
        {...(error ? {'aria-invalid': true} : null)}
        {...(required ? {'aria-required': true} : null)}
        autoFocus
      />
      {helperText && (
        <p
          id={helperTextId}
          className={`${error ? 'fr-error-text' : 'fr-info-text'} !mt-1`}
          {...(error ? {'aria-live': 'polite'} : null)}
        >
          {helperText}
        </p>
      )}
    </div>
  )
})
