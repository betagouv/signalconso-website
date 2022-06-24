import * as React from 'react'
import {Card, CardProps, LinearProgress} from '@mui/material'

export interface PanelProps extends CardProps {
  loading?: boolean
  hoverable?: boolean
}

export const Panel = ({sx, hoverable, loading, children, elevation, ...other}: PanelProps) => {
  return (
    <Card
      sx={{
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
        border: t => `1px solid ${t.palette.divider}`,
        ...hoverable && {
          cursor: 'pointer',
          transition: t => t.transitions.create('all'),
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: t => t.shadows[4],
          }
        },
        ...elevation && {
          border: 'none',
        },
        ...sx
      }}
      {...other}
    >
      {loading && <LinearProgress sx={{mb: '-5px'}}/>}
      {children}
    </Card>
  )
}
