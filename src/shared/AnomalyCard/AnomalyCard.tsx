import {Anomaly, Index} from '@signal-conso/signalconso-api-sdk-js'
import {alpha, Box, useTheme} from '@mui/material'
import {Txt} from 'mui-extension/lib'
import Link from 'next/link'
import {AnomalyImage} from './AnomalyImage'

interface AnomalyCardProps {
  anomaly: Anomaly
}

const backgroundPosition: Index<string> = {
  'category-covid': '0 0',
  'category-store': '-72px 0',
  'category-health': '-144px 0',
  'category-restaurant': '0 -72px',
  'category-service': '-72px -72px',
  'category-energy': '-144px -72px',
  'category-internet': '0px -144px',
  'category-bank': '-72px -144px',
  'category-disease': '-144px -144px',
  'category-hobbies': '0 -216px',
  'category-ecommerce': '-72px -216px',
  'category-real-estate': '-144px -216px',
  'category-craft': '0 -288px',
  'category-transport': '-72px -288px',
  'category-pet': '-144px -288px',
  'category-admin': '0 -360px',
}

export const AnomalyCard = ({anomaly}: AnomalyCardProps) => {
  const theme = useTheme()
  return (
    <Link href={'/' + anomaly.path}>
      <a>
        <Box component="article" sx={{
          background: t => t.palette.background.paper,
          display: 'flex',
          // border: `1px solid ${theme.palette.divider}`,
          padding: 1.5,
          borderRadius: `${theme.shape.borderRadius}px`,
          boxShadow: theme.shadows[2],
          // margin: theme.spacing(2),
          transition: theme.transitions.create('all'),
          height: '100%',
          border: t => `2px solid ${t.palette.background.paper}`,
          '&:hover': {
            border: t => `2px solid ${t.palette.primary.main}`,
            background: t => alpha(t.palette.primary.main, .05),
            boxShadow: theme.shadows[4],
            // transform: 'scale(1.01)',
          }
        }}>

          <AnomalyImage anomaly={anomaly} sx={{mr: 2}}/>
          <div>
            <h3 style={{
              fontSize: '1.15rem',
              margin: theme.spacing(0, 0, .5, 0),
              padding: 0,
              lineHeight: 1.3
            }}>
              {anomaly.category}
            </h3>
            <Txt color="hint" sx={{fontSize: '0.9rem'}}>{anomaly.description}</Txt>
          </div>
        </Box>
      </a>
    </Link>
  )
}
