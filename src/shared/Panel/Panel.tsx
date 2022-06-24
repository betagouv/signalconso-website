import {ReactNode} from 'react'
import {Txt} from '../../alexlibs/mui-extension'
import {Box, BoxProps, Card, CardProps} from '@mui/material'
import {styleUtils} from '../../core/theme/theme'

export interface PanelProps extends Omit<CardProps, 'title'> {
  title?: ReactNode
  desc?: ReactNode
  border?: boolean
}

export const Panel = ({title, desc, children, sx, elevation = 0, border, ...rest}: PanelProps) => {
  return (
    <Card
      role="article"
      elevation={elevation}
      {...rest}
      sx={{
        overflow: 'visible',
        '&:not(:first-of-type)': {
          mb: 3,
        },
        ...(!border &&
          !elevation && {
            borderRadius: 0,
          }),
        ...(elevation && {
          p: 2,
        }),
        ...(border && {
          p: 2,
          border: t => (border ? `1px solid ${t.palette.divider}` : `none`),
        }),
        '& + &': {
          pt: 3,
          mt: 3,
          ...(!border && !elevation
            ? {
                borderTop: t => `1px solid ${t.palette.divider}`,
              }
            : {}),
        },
        ...sx,
      }}
    >
      {title && (
        <Box
          component="h2"
          sx={{
            fontWeight: t => t.typography.fontWeightBold,
            m: 0,
            mb: 1,
            p: 0,
            fontSize: t => styleUtils(t).fontSize.title,
          }}
        >
          {title}
        </Box>
      )}
      {desc && (
        <Txt bold color="hint" block sx={{mb: 0}}>
          {desc}
        </Txt>
      )}
      {children}
    </Card>
  )
}

export const PanelBody = ({children, sx, ...rest}: BoxProps) => {
  return (
    <Box
      {...rest}
      sx={{
        ...sx,
        mt: 2,
      }}
    >
      {children}
    </Box>
  )
}

export const PanelActions = ({children, sx, ...rest}: BoxProps) => {
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
        mt: 2,
        '& > :not(:first-of-type)': {
          ml: 1,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
