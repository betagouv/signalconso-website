import {Box, BoxProps, Icon, darken} from '@mui/material'
import {otherColorSet} from 'core/theme'
import {ReactNode} from 'react'

const height = (dense?: boolean) => (dense ? 44 : 52)

interface Props extends Pick<BoxProps, 'children' | 'dangerouslySetInnerHTML' | 'id'> {
  type: 'info' | 'error' | 'warning' | 'success'
  action?: ReactNode
  dense?: boolean
}

export const alertInfoBackgroundColor = 'rgba(50, 200, 255, .08)'
const alertInfoTextColor = darken(otherColorSet.info, 0.3)

export const alertWarningBackgroundColor = 'rgba(255, 128, 0, .08)'
export const alertWarningTextColor = darken(otherColorSet.warning, 0.4)

// An alert that looks different (softer, less catchy) of the Alert from DSFR
// note : you should wrap the content in <p> (one or several)
// accessibility audit recommends it
// and this component won't do it for you
export const ScAlert = ({type, dense, action, children, dangerouslySetInnerHTML, ...props}: Props) => {
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
            color: darken(otherColorSet.success, 0.3),
          },
          info: {
            background: alertInfoBackgroundColor, //'#e1f5fe',
            color: alertInfoTextColor,
          },
          error: {
            background: 'rgba(255, 0, 0, .08)', //'#ffdede',
            color: darken(otherColorSet.error, 0.3),
          },
          warning: {
            background: alertWarningBackgroundColor,
            color: alertWarningTextColor,
          },
        }[type],
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
      {action && (
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
        </Box>
      )}
    </Box>
  )
}
