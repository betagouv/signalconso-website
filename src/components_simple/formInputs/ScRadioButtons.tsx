import {useAutoscrollContext} from '@/context/AutoscrollContext'
import {KeyboardEvent, ReactElement, ReactNode, Ref, forwardRef, useEffect, useId} from 'react'

interface Props<V> {
  title?: ReactNode
  description?: string
  // do not respect DSFR style, less bold, less margins, etc.
  titleSoberStyle?: boolean
  titleNoAutoAsterisk?: boolean
  onChange: (value: V) => void
  options: {
    label: ReactNode
    description?: ReactNode
    value: V
    specify?: ReactNode
    disabled?: boolean
  }[]
  value: V | undefined
  error?: boolean
  errorMessage?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
  required: boolean
  // If you use this component within react-hook-form, and pass the ref properly,
  // react-hook-form will handle autofocus and scroll properly
  // This option is only for when we use this component outside of react-hook-form
  autoFocusOnError?: boolean
}
type RefType = Ref<HTMLFieldSetElement>

function ScRadioButtonsWithRef<V>(props: Props<V>, ref: RefType) {
  const {
    title,
    description,
    titleSoberStyle = false,
    titleNoAutoAsterisk = false,
    onChange,
    options,
    value: selectedValue,
    error,
    errorMessage,
    orientation,
    className = '',
    required,
    autoFocusOnError,
  } = props
  const _id = useId()
  const {disableAutoscrollTemporarily} = useAutoscrollContext()
  const id = `fr-fieldset-radio-${_id}`
  const legendId = `${id}-legend`
  const radioName = `radio-name-${id}`
  const messagesWrapperId = `${id}-messages`

  useEffect(() => {
    if (error && autoFocusOnError) {
      const element = document.getElementById(id)
      if (element) {
        element.focus()
        element.scrollIntoView({block: 'center'})
      }
    }
  }, [error, autoFocusOnError])

  const createDescription = (description: ReactNode) => {
    if (typeof description === 'string') {
      return <span className="text-sm text-[#666666]">{description}</span>
    } else {
      return <div className="z-10">{description}</div>
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // Accessibility : when navigating between the subcategories with arrow keys
    // the autoscroll is extremely annoying
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      disableAutoscrollTemporarily()
    }
  }

  const horizontal = orientation === 'horizontal'
  return (
    <fieldset
      id={id}
      className={`fr-fieldset ${horizontal && 'fr-fieldset--inline'} ${error ? 'fr-fieldset--error' : ''} ${className}`}
      aria-labelledby={`${title && legendId} ${messagesWrapperId}`}
      {...(required ? {'aria-required': true} : null)}
      ref={ref}
    >
      {title && (
        <legend id={legendId} className={`fr-fieldset__legend ${titleSoberStyle ? '!font-normal' : ''}`}>
          {title}
          {required && !titleNoAutoAsterisk && <span> *</span>}
          {description && <span className="fr-hint-text">{description}</span>}
        </legend>
      )}
      <div className={`fr-fieldset__content fr-fieldset__element !ml-0  ${horizontal && 'fr-fieldset__element--inline'}`}>
        {options.map(({label, description, value, specify, disabled}, i) => {
          const inputId = `radio-rich-${id}-${i}`
          const checked = value === selectedValue
          return (
            <div
              key={i}
              className={`fr-radio-group !max-w-full border border-gray-300 border-solid mb-1 hover:bg-gray-100 hover:border-scbluefrance ${
                disabled ? 'pointer-events-none opacity-60' : ''
              } ${checked ? 'border-scbluefrance border-2' : ''} ${horizontal && '!mr-1'}`}
            >
              <input
                type="radio"
                id={inputId}
                name={radioName}
                onChange={() => onChange(value)}
                checked={checked}
                {...{onKeyDown}}
                {...(disabled ? {disabled} : null)}
              />
              <label className="fr-label !pr-4 ml-4" htmlFor={inputId}>
                <div className="flex flex-col gap-2 items-start justify-start ">
                  {label}
                  {description && createDescription(description)}
                </div>
              </label>
              {checked && specify && <div className="ml-12 mr-4 mb-3 mt-[-4px] max-w-sm">{specify}</div>}
            </div>
          )
        })}
      </div>
      {error && errorMessage && (
        <div className="fr-messages-group" id={messagesWrapperId} aria-live="assertive">
          <p className="fr-message fr-message--error">{errorMessage}</p>
        </div>
      )}
    </fieldset>
  )
}

// forwardRef doesn't play well with generics
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
export const ScRadioButtons = forwardRef(ScRadioButtonsWithRef) as <V>(p: Props<V> & {ref?: RefType}) => ReactElement
