import React, {ReactElement, useEffect, useState} from 'react'
import {ScRadioGroupItemProps} from './RadioGroupItem'

interface Props<T> {
  dense?: boolean
  children: React.ReactNode //ReactElement<ScRadioGroupItemProps>[]
  value?: T
  error?: boolean
  onChange?: (_: T) => void
  className?: string
}

const _ScRadioGroup = <T, >({error, className, children, dense, value, onChange}: Props<T>, ref: any) => {
  const [innerValue, setInnerValue] = useState<T>()

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  return (
    <div className={className} ref={ref}>
      {React.Children.map(children as ReactElement<ScRadioGroupItemProps<T>>[], child =>
        React.cloneElement(child, {
          ...child.props,
          dense,
          error,
          selected: innerValue === child.props.value,
          onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setInnerValue(child.props.value)
            if (child.props.onClick) child.props.onClick(event)
            if (onChange) onChange(child.props.value)
          },
        }),
      )}
    </div>
  )
}
/**
 * Workaround because forwardRef break the generic type of ScSelect.
 */
export const ScRadioGroup = React.forwardRef(_ScRadioGroup) as <T>(
  props: Props<T> & {ref?: React.ForwardedRef<any>},
) => ReturnType<typeof _ScRadioGroup>

