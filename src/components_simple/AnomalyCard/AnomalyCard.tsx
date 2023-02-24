import {alpha, Box, useTheme} from '@mui/material'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import Link from 'next/link'
import {AnomalyImage} from './AnomalyImage'
import {Anomaly} from '../../anomalies/Anomaly'
import {MouseEvent} from 'react'
import {useReportFlowContext} from '../../components_feature/Report/ReportFlowContext'

interface AnomalyCardProps {
  anomaly: Anomaly
}

export const AnomalyCard = ({anomaly}: AnomalyCardProps) => {
  const theme = useTheme()
  const _reportFlow = useReportFlowContext()
  return (
    <Link
      href={'/' + anomaly.path}
      onClick={() => {
        // on veut repartir de zéro
        _reportFlow.resetFlow()
      }}
      legacyBehavior={false}
    >
      <Box
        component="article"
        sx={{
          background: t => t.palette.background.paper,
          display: 'flex',
          padding: 1.5,
          borderRadius: `${theme.shape.borderRadius}px`,
          transition: theme.transitions.create('all'),
          height: '100%',
          border: t => `2px solid ${t.palette.background.paper}`,
          '&:hover': {
            boxShadow: theme.shadows[5],
            transform: 'scale(1.04)',
          },
        }}
      >
        <AnomalyImage anomaly={anomaly} sx={{mr: 2}} />
        <div>
          <h3
            style={{
              fontSize: '1.15rem',
              margin: 0,
              marginBottom: theme.spacing(0.5),
              marginRight: -6,
              padding: 0,
              lineHeight: 1.3,
            }}
          >
            {anomaly.category}
          </h3>
          <Txt color="hint" sx={{fontSize: '0.9rem'}}>
            {anomaly.description}
          </Txt>
        </div>
      </Box>
    </Link>
  )
}
