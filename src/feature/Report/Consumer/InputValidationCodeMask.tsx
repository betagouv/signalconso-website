import * as React from 'react'
import {IMaskInput} from 'react-imask'

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void
  name: string
}

export const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref: any) {
  const {onChange, ...other} = props
  return (
    <IMaskInput
      {...other}
      // @ts-ignore
      mask="#00000"
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({target: {name: props.name, value}})}
      overwrite
    />
  )
})
