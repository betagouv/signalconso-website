import {alpha, Box, useTheme} from '@mui/material'
import {Txt} from '../../alexlibs/mui-extension'
import Link from 'next/link'
import {AnomalyImage} from './AnomalyImage'
import {Anomaly} from '../../anomaly/Anomaly'

interface AnomalyCardProps {
  anomaly: Anomaly
}

export const AnomalyCard = ({anomaly}: AnomalyCardProps) => {
  const theme = useTheme()
  return (
    <Link href={'/' + anomaly.path}>
      <a>
        <Box
          component="article"
          sx={{
            background: t => t.palette.background.paper,
            display: 'flex',
            // border: `1px solid ${theme.palette.divider}`,
            padding: 1.5,
            borderRadius: `${theme.shape.borderRadius}px`,
            // boxShadow: theme.shadows[2],
            // margin: theme.spacing(2),
            transition: theme.transitions.create('all'),
            height: '100%',
            border: t => `2px solid ${t.palette.background.paper}`,
            '&:hover': {
              // border: t => `2px solid ${t.palette.primary.main}`,
              // background: t => alpha(t.palette.primary.main, .05),
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
      </a>
    </Link>
  )
}
