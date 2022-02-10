import {alpha, Box, BoxProps, Checkbox, Radio} from '@mui/material'
import React, {ReactNode} from 'react'
import {Txt} from 'mui-extension/lib'

const defaultMuiRadioPadding = 9

export interface ScRadioGroupItemProps<T> extends Omit<BoxProps, 'title'> {
  title?: string | ReactNode
  description?: string | ReactNode
  value: T
  disabled?: boolean
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
  disabled,
  value,
  children,
  selected,
  onClick,
  className,
  multiple,
  ...rest
}: ScRadioGroupItemProps<T>) => {

  return (
    <Box
      role={multiple ? 'checkbox' : 'radio'}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        border: t => '1px solid ' + t.palette.divider,
        borderBottomColor: 'transparent',
        paddingRight: '2px',
        paddingBottom: '2px',
        transition: 'all .2s ease-in-out',
        cursor: 'pointer',
        '&:last-of-type': {
          borderBottom: t => '1px solid ' + t.palette.divider,
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
        },
        '&:first-of-type': {
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6,
        },
        '&:hover': {
          zIndex: 1,
          border: t => `1px solid ${t.palette.primary.main}`,
          background: 'rgba(0,0,0,.04)',
        },
        '&:not(:first-of-type)': {
          marginTop: '-2px',
        },
        ...selected && {
          zIndex: 1,
          border: t => `1px solid ${t.palette.primary.main} !important`,
          background: t => alpha(t.palette.primary.main, 0.1),
          boxShadow: t => `inset 0 0 0 1px ${t.palette.primary.main}`,
        },
        ...error && {
          '&$rootSelected': {
            borderColor: t => t.palette.error.main + ' !important',
          },
          boxShadow: t => `inset 0 0 0 1px ${t.palette.error.main}`,
        }
      }}
      // className={classes(css.root, selected && css.rootSelected, error && css.rootError, className)}
      onClick={onClick}
      {...rest}
    >
      {multiple ? (
        <Checkbox
          disabled={disabled}
          size={dense ? 'small' : undefined}
          checked={selected}
          sx={{
            marginLeft: 1,
            marginTop: t => `calc(${t.spacing(1.5)} - ${defaultMuiRadioPadding}px)`
          }}/>
      ) : (
        <Radio
          disabled={disabled}
          size={dense ? 'small' : undefined}
          checked={selected}
          sx={{
            marginLeft: 1,
            marginTop: t => `calc(${t.spacing(1.5)} - ${defaultMuiRadioPadding}px)`
          }}
        />
      )}
      <Box
        sx={{
          alignSelf: 'center',
          display: 'flex',
          justifyContent: 'center',
          pt: 1.5,
          pb: 1.5,
          // minHeight: 42,
          flexDirection: 'column',
          ml: .5,
          mr: 2,
          width: '100%',
          ...dense && {
            pt: 1,
            pb: 1,
          }
        }}>
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
      </Box>
    </Box>
  )
}
