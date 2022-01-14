import React, {ReactElement, useEffect, useState} from 'react'
import {ScRadioGroupItemProps} from './RadioGroupItem'
import {Box} from '@mui/material'
import {SxProps} from '@mui/system'
import {Theme} from '@mui/material/styles'

interface SingleProps<T> {
  dense?: boolean
  children: React.ReactNode //ReactElement<ScRadioGroupItemProps>[]
  value?: T
  error?: boolean
  onChange?: (_: T) => void
  className?: string
  sx?: SxProps<Theme>
  multiple?: false
}

interface MultipleProps<T> {
  dense?: boolean
  children: React.ReactNode //ReactElement<ScRadioGroupItemProps>[]
  value?: T[]
  error?: boolean
  onChange?: (_: T[]) => void
  className?: string
  sx?: SxProps<Theme>;
  multiple: true
}

type Props<T> = SingleProps<T> | MultipleProps<T>

const isMultiple = <T, >(multiple: boolean | undefined, t: T | T[]): t is T[] => {
  return !!multiple
}

const _ScRadioGroup = <T, >({error, children, dense, value, onChange, multiple, ...props}: Props<T>, ref: any) => {
  const [innerValue, setInnerValue] = useState<T | T[]>()

  useEffect(() => {
    if (value) {
      setInnerValue(value)
    } else if (multiple) {
      setInnerValue([])
    }
  }, [value])

  return (
    <Box ref={ref} {...props}>
      {React.Children.map(children as ReactElement<ScRadioGroupItemProps<T>>[], child =>
        React.cloneElement(child, {
          ...child.props,
          dense,
          error,
          multiple,
          selected: isMultiple(multiple, innerValue) ? innerValue.includes(child.props.value) : innerValue === child.props.value,
          onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (child.props.onClick) child.props.onClick(event)
            const value = child.props.value
            setInnerValue(currentValue => {
              const newValue = (() => {
                if (isMultiple(multiple, currentValue)) {
                  if (currentValue.includes(value)) {
                    return currentValue.filter(_ => _ !== value)
                  } else {
                    return [...currentValue, value]
                  }
                }
                return value
              })()
              if (onChange) onChange(newValue as any)
              return newValue
            })
          },
        }),
      )}
    </Box>
  )
}
/**
 * Workaround because forwardRef break the generic type of ScSelect.
 */
export const ScRadioGroup = React.forwardRef(_ScRadioGroup) as <T>(
  props: Props<T> & {ref?: React.ForwardedRef<any>},
) => ReturnType<typeof _ScRadioGroup>

