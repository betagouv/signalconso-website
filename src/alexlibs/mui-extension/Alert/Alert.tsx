import * as React from 'react'
import {CSSProperties, ReactNode, useState} from 'react'
import {Box, BoxProps, darken, Icon, IconButton} from '@mui/material'
import {usePersistentState} from '../../react-persistent-state'
import {colorError, colorInfo, colorSuccess, colorWarning} from '../_core/style/color'

const height = (dense?: boolean) => (dense ? 44 : 52)

interface AlertProps extends BoxProps {
  type: 'info' | 'error' | 'warning' | 'success'
  deletable?: boolean
  action?: ReactNode
  dense?: boolean
  gutterBottom?: boolean
}

export const Alert = ({
  type,
  dense,
  action,
  deletable,
  sx,
  gutterBottom,
  children,
  dangerouslySetInnerHTML,
  ...props
}: AlertProps) => {
  const [isPersistentVisible, setPersistentIsVisible] = usePersistentState<boolean>(true, props.id || 'alert')
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const getIconFromType = () => {
    switch (type) {
      case 'info':
        return 'info'
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'success':
        return 'check_circle'
      default:
        return 'info'
    }
  }

  return (
    <Box
      {...props}
      sx={{
        // paddingLeft: t.spacing(2),
        // paddingRight: t.spacing(2),
        // [t.breakpoints.up('sm')]: {
        //   paddingLeft: t.spacing(3),
        //   paddingRight: t.spacing(3),
        // },
        transition: t => t.transitions.create('all'),
        // @ts-ignore
        minHeight: height(props.dense),
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: '4px',
        // @ts-ignore
        paddingLeft: dense ? 1 : 2,
        paddingRight: dense ? 1 : 2,
        ...{
          success: {
            background: 'rgba(50, 255, 150, .08)', //'#e1ffe1',
            color: darken(colorSuccess, 0.1),
          },
          info: {
            background: 'rgba(50, 200, 255, .08)', //'#e1f5fe',
            color: darken(colorInfo, 0.1),
          },
          error: {
            background: 'rgba(255, 0, 0, .08)', //'#ffdede',
            color: darken(colorError, 0.1),
          },
          warning: {
            background: 'rgba(255, 128, 0, .08)',
            color: darken(colorWarning, 0.1),
          },
        }[type],
        ...((!isVisible || !isPersistentVisible) && {
          minHeight: '0 !important',
          height: '0 !important',
          opacity: '0 !important',
          margin: '0 !important',
        }),
        ...(gutterBottom && {
          mb: 1,
        }),
        ...sx,
      }}
    >
      <Icon
        sx={{
          mr: dense ? 0 : 1,
          height: `${height(dense)}px !important`,
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
        }}
      >
        {getIconFromType()}
      </Icon>
      <Box
        {...(children ? {children} : {dangerouslySetInnerHTML})}
        sx={{
          flex: 1,
          py: dense ? 1 : 2,
          px: 1,
        }}
      />
      {action ||
        (deletable && (
          <Box
            sx={{
              textAlign: 'right',
              mt: 1,
              ml: 0,
              mb: 1,
              mr: -1,
            }}
          >
            {action}
            {deletable && (
              <IconButton
                onClick={() => {
                  setIsVisible(false)
                  setPersistentIsVisible(false)
                }}
                size="large"
              >
                <Icon>clear</Icon>
              </IconButton>
            )}
          </Box>
        ))}
    </Box>
  )
}
