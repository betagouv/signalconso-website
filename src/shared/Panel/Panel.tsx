import {ReactNode} from 'react'
import {Txt} from 'mui-extension'
import {Box, BoxProps, Card, CardProps} from '@mui/material'

export interface PanelProps extends Omit<CardProps, 'title'> {
  title?: ReactNode
  desc?: ReactNode
  border?: boolean
}

export const Panel = ({title, desc, children, sx, elevation = 0, border, ...rest}: PanelProps) => {
  return (
    <Card role="article" elevation={elevation} {...rest} sx={{
      pb: 2,
      pt: 0,
      '&:not(:first-of-type)': {
        pt: 2,
      },
      ...(!border && !elevation) && {
        borderRadius: 0,
      },
      ...(border ? {
        border: t => border ? `1px solid ${t.palette.divider}` : `none`,
        px: 2,
      } : {}),
      ...sx,
      '& + &': {
        pt: 3,
        mt: 3,
        ...(!border && !elevation ? {
          borderTop: t => `1px solid ${t.palette.divider}`,
        } : {})
      }
    }}>
      {title && <Txt bold block sx={{mb: 0}} size="title">{title}</Txt>}
      {desc && <Txt bold color="hint" block sx={{mb: 0}}>{desc}</Txt>}
      {children}
    </Card>
  )
}

export const PanelBody = ({children, sx, ...rest}: BoxProps) => {
  return (
    <Box {...rest} sx={{
      ...sx,
      mt: 2
    }}>
      {children}
    </Box>
  )
}

export const PanelActions = ({children, sx, ...rest}: BoxProps) => {
  return (
    <Box {...rest} sx={{
      ...sx,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'right',
      mt: 2,
      '& > :not(:first-of-type)': {
        ml: 1,
      },
    }}>
      {children}
    </Box>
  )
}
