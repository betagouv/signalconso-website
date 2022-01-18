import {alpha, Box, BoxProps, Checkbox, Radio, Theme} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React, {ReactNode} from 'react'
import {Txt} from 'mui-extension/lib'
import {classes} from '../../core/helper/utils'

const useStyle = makeStyles((t: Theme) => {
  const defaultMuiRadioPadding = 9
  const padding =  t.spacing(1.5)
  return {
    root: {
      display: 'flex',
      // alignItems: 'center',
      alignItems: 'flex-start',
      border: '1px solid ' + t.palette.divider,
      borderBottomColor: 'transparent',
      paddingRight: 2,
      paddingBottom: 2,
      // padding: t.spacing(1.5, 2, 1.5, 1),
      transition: 'all .2s ease-in-out',
      cursor: 'pointer',

      '&:last-of-type': {
        borderBottom: '1px solid ' + t.palette.divider,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
      },
      '&:first-of-type': {
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
      },
      '&:hover': {
        zIndex: 1,
        border: `1px solid ${t.palette.primary.main}`,
        background: 'rgba(0,0,0,.04)',
      },
      '&:not(:first-of-type)': {
        marginTop: -2,
      }
    },
    rootSelected: {
      zIndex: 1,
      border: `1px solid ${t.palette.primary.main} !important`,
      background: alpha(t.palette.primary.main, 0.1),
      boxShadow: `inset 0 0 0 1px ${t.palette.primary.main}`,
    },
    rootError: {
      borderColor: t.palette.error.main + ' !important',
    },
    body: {
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: t.spacing(1.5),
      paddingBottom: t.spacing(1.5),
      // minHeight: 42,
      flexDirection: 'column',
      marginLeft: t.spacing(.5),
    },
    bodyDense: {
      paddingTop: t.spacing(1 / 4),
      paddingBottom: t.spacing(1 / 4),
    },
    radio: {
      marginLeft: t.spacing(1),
      marginTop: `calc(${padding} - ${defaultMuiRadioPadding}px)`
    }
  }
})

export interface ScRadioGroupItemProps<T> extends Omit<BoxProps, 'title'> {
  title?: string | ReactNode
  description?: string | ReactNode
  value: T
  selected?: boolean
  children?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  dense?: boolean
  error?: boolean
  multiple?: boolean
}

export const ScRadioGroupItem = <T,>({
  title,
  description,
  error,
  dense,
  value,
  children,
  selected,
  onClick,
  className,
  multiple,
  ...rest
}: ScRadioGroupItemProps<T>) => {
  const css = useStyle()

  return (
    <Box
      className={classes(css.root, selected && css.rootSelected, error && css.rootError, className)}
      onClick={onClick}
      {...rest}
    >
      {multiple ? (
        <Checkbox size={dense ? 'small' : undefined} checked={selected} className={css.radio}/>
      ) : (
        <Radio size={dense ? 'small' : undefined} checked={selected} className={css.radio}/>
      )}
      <div className={classes(css.body, dense && css.bodyDense)}>
        {title && (
          <Txt block size="big">
            {title}
          </Txt>
        )}
        {description && (
          <Txt block color="disabled">
            {description}
          </Txt>
        )}
        {children && children}
      </div>
    </Box>
  )
}
