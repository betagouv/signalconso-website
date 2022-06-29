import {SxProps} from '@mui/system'
import {Theme} from '@mui/material'

export const makeSx = <T>(_: {[key in keyof T]: SxProps<Theme>}) => _

export const stopPropagation =
  <
    E extends {
      preventDefault?: () => void
      stopPropagation?: () => void
    },
  >(
    action: (event: E) => any,
  ) =>
  (event: E) => {
    event.stopPropagation?.()
    event.preventDefault?.()
    action(event)
  }
