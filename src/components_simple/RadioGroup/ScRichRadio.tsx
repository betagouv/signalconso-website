// based on https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/boutons-radio-riches
// without the images
// with the "need to specify" option

import {useId} from 'react'

export function ScRichRadio<V extends string>({
  title,
  titleDesc,
  onChange,
  options,
  value: selectedValue,
  errorMessage,
}: {
  title?: string
  titleDesc?: string
  onChange: (value: V) => void
  options: {
    label: string
    description?: string
    needToSpecify?: boolean
    value: V
  }[]
  value: V | undefined
  errorMessage?: string
}) {
  const elementId = useId()
  return (
    <div className="fr-form-group">
      <fieldset className={`fr-fieldset ${errorMessage ? 'fr-fieldset--error' : ''}`} role="group">
        {title && (
          <legend className="fr-fieldset__legend">
            {title}
            {titleDesc && <span className="fr-hint-text">{titleDesc}</span>}
          </legend>
        )}
        <div className="fr-fieldset__content">
          {options.map((option, idx) => {
            const {label, value, description, needToSpecify} = option
            const inputId = `radio-rich-hint-${elementId}-${idx}`
            const checked = value === selectedValue
            return (
              <div key={value} className="fr-radio-group fr-radio-rich">
                <input type="radio" id={inputId} name="radio-rich-hint" onChange={() => onChange(value)} checked={checked} />
                <label
                  className="fr-label"
                  htmlFor={inputId}
                  style={{
                    paddingRight: '3.5rem',
                  }}
                >
                  {label}
                  {description && <span className="fr-hint-text">{description}</span>}
                  {needToSpecify && checked && (
                    <input
                      className="fr-input"
                      type="text"
                      id="text-input-text"
                      name="text-input-text"
                      placeholder="Précisez..."
                    />
                  )}
                </label>
              </div>
            )
          })}
        </div>
        {errorMessage && <p className="fr-error-text">{errorMessage}</p>}
      </fieldset>
    </div>
  )
}
