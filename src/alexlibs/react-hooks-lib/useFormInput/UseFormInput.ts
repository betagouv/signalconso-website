import {Dispatch, SetStateAction, useState} from 'react'

export interface UseFormInputOptions {
  initialValue?: string
  pattern?: string
  errorMessage?: string
  required?: boolean
}

export interface useFormInput {
  inputProps: {
    required: boolean
    pattern: string
    value: string,
    onChange: (e: any) => void,
  }
  setValue: Dispatch<SetStateAction<string>>,
}

export const useFormInput = (name: string, options?: UseFormInputOptions) => {
  const {initialValue, pattern, errorMessage, required} = options || {}
  const [value, setValue] = useState(initialValue || '')
  const [isTouched, setIsTouched] = useState(false)
  const [isBlured, setIsBlured] = useState(false)
  const isValid = !options || (
    (!pattern || new RegExp(pattern).test(value || '')) &&
    (!required || (value && value !== ''))
  )
  const showError = isBlured && !isValid
  return {
    props: {
      error: showError,
      required: required,
      pattern: pattern,
      value,
      helperText: (showError && errorMessage) || ' ',
      onChange: (e: any) => setValue(e.target.value),
      onClick: () => setIsTouched(true),
      onBlur: () => setIsBlured(true),
    },
    setValue,
    isValid: () => isValid
  }
}
