import {ReactNode} from 'react'
import {Txt} from 'mui-extension'
import {Box, BoxProps, Card, CardProps} from '@mui/material'

interface Props extends Omit<CardProps, 'title'> {
  title?: ReactNode
  desc?: ReactNode
}

export const Panel = ({title, desc, children, sx, ...rest}: Props) => {
  return (
    <Card elevation={2} {...rest} sx={{
      ...sx,
      p: 2,
      '& + &': {
        // pt: 3,
        // borderTop: t => `1px solid ${t.palette.divider}`,
        mt: 3,
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
      mt: 3
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
