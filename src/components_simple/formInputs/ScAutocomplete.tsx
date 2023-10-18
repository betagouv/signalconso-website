import {Combobox} from '@headlessui/react'
import {useI18n} from 'i18n/I18n'
import {ChangeEvent, ReactNode, useId} from 'react'

// Based on headless-ui, with rendering similar to a DSFR input
// Note : we don't pass ref and value, not sure why but it seems to work
// It's hardcoded as a required field ("*" and aria-required), but this could also be parametrized if needed
export function ScAutoComplete<Item>({
  label,
  desc,
  placeholder,
  query,
  setQuery,
  options,
  optionsAreSame,
  optionKey,
  optionRender,
  hideNoResult,
  inputDisplayValue,
  name,
  onChange,
  onBlur,
  error,
  helperText,
}: {
  label: string
  desc?: string
  placeholder?: string
  query: string
  setQuery: (query: string) => void
  options: Item[]
  optionsAreSame: (a?: Item, b?: Item) => boolean
  optionKey: (item: Item) => string
  optionRender: (item: Item) => ReactNode
  hideNoResult?: boolean
  inputDisplayValue: (item: Item) => string
  onChange: (chosenItem: Item) => void
  onBlur: () => void
  name: string
  error: boolean
  helperText?: string
}) {
  const inputId = useId()
  const helperTextId = useId()
  const {m} = useI18n()
  const showNoResult = options.length === 0 && query.length > 0 && !hideNoResult
  return (
    <Combobox<Item> name={name} onChange={onChange} by={optionsAreSame}>
      <div className={`fr-input-group ${error ? 'fr-input-group--error' : ''}`}>
        <Combobox.Label htmlFor={inputId} className="fr-label">
          {label} *{desc && <span className="fr-hint-text">{desc}</span>}
        </Combobox.Label>
        <div className="relative">
          <Combobox.Input<Item>
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setQuery(event.target.value)
            }}
            onBlur={onBlur}
            displayValue={inputDisplayValue}
            className={`fr-input ${error ? 'fr-input--error' : ''}`}
            autoComplete="country-name"
            id={inputId}
            aria-required
            aria-describedby={helperTextId}
            {...(error ? {'aria-invalid': true} : null)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute top-0 bottom-[2px] right-0 flex items-center pr-2">
            <span className="ri-arrow-down-s-line h-5 w-5" aria-hidden={true} />
          </Combobox.Button>
        </div>
      </div>
      <div className="relative">
        {(options.length > 0 || showNoResult) && (
          <Combobox.Options className="bg-white absolute max-h-52 overflow-auto w-full top-[-24px] m-0 z-10 list-none p-2 border-solid border-gray-500 border-[1px]">
            {showNoResult && <span className="py-2 text-gray-500 cursor-default">{m.noResult}</span>}
            {options.map(option => (
              <Combobox.Option key={optionKey(option)} value={option} className="py-1 ui-active:bg-gray-300 cursor-pointer">
                {optionRender(option)}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {helperText && (
          <p id={helperTextId} className={error ? 'fr-error-text' : 'fr-info-text'} {...(error ? {'aria-live': 'polite'} : null)}>
            {helperText}
          </p>
        )}
      </div>
    </Combobox>
  )
}
