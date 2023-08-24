import {Box, BoxProps, Icon, IconButton, darken} from '@mui/material'
import {ReactNode, useState} from 'react'
import {usePersistentState} from '../hooks/usePersistentState'
import {otherColorSet} from 'core/theme'

const height = (dense?: boolean) => (dense ? 44 : 52)

interface Props extends Pick<BoxProps, 'children' | 'dangerouslySetInnerHTML' | 'id'> {
  type: 'info' | 'error' | 'warning' | 'success'
  deletable?: boolean
  action?: ReactNode
  dense?: boolean
}

export const alertInfoBackgroundColor = 'rgba(50, 200, 255, .08)'
export const alertInfoTextColor = darken(otherColorSet.success, 0.1)

export const alertWarningBackgroundColor = 'rgba(255, 128, 0, .08)'
export const alertWarningTextColor = darken(otherColorSet.warning, 0.1)

// An alert that looks different (softer, less catchy) of the Alert from DSFR
export const ScAlert = ({type, dense, action, deletable, children, dangerouslySetInnerHTML, ...props}: Props) => {
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

  const roleProp = () => {
    switch (type) {
      case 'warning':
        return {role: 'alert'}
      case 'error':
        return {role: 'alert'}
      default:
        return {}
    }
  }

  return (
    <Box
      {...props}
      {...roleProp()}
      sx={{
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
            color: darken(otherColorSet.success, 0.1),
          },
          info: {
            background: alertInfoBackgroundColor, //'#e1f5fe',
            color: alertInfoTextColor,
          },
          error: {
            background: 'rgba(255, 0, 0, .08)', //'#ffdede',
            color: darken(otherColorSet.error, 0.1),
          },
          warning: {
            background: alertWarningBackgroundColor,
            color: alertWarningTextColor,
          },
        }[type],
        ...((!isVisible || !isPersistentVisible) && {
          minHeight: '0 !important',
          height: '0 !important',
          opacity: '0 !important',
          margin: '0 !important',
        }),
        mb: 2,
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
