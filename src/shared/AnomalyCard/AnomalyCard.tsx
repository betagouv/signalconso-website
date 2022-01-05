import {Anomaly, Index} from '@signal-conso/signalconso-api-sdk-js'
import {useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import {Txt} from 'mui-extension/lib'
import Link from 'next/link'

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

const Article = styled('article')(({theme}) => ({
  display: 'flex',
  // border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  // margin: theme.spacing(2),
  transition: theme.transitions.create('all'),
  height: '100%',
  '&:hover': {
    boxShadow: theme.shadows[4],
    // transform: 'scale(1.01)',
  }
}))

export const AnomalyCard = ({anomaly}: AnomalyCardProps) => {
  const theme = useTheme()
  return (
    <Link href={'/' + anomaly.path}>
      <a>
        <Article>
          <div
            style={{
              ...(anomaly.sprite ? {
                background: 'url("/image/pictos/sprite.png") no-repeat bottom',
                backgroundPosition: backgroundPosition[anomaly.sprite],
                backgroundRepeat: 'no-repeat',
              } : {}),
              marginRight: theme.spacing(2),
              minWidth: 72,
              minHeight: 72,
              maxWidth: 72,
              maxHeight: 72,
            }}
            className={`sprite-${anomaly.sprite}`}
          />
          <div>
            <h3 style={{
              margin: theme.spacing(0, 0, .5, 0),
              padding: 0
            }}>
              {anomaly.category}
            </h3>
            <Txt color="disabled">{anomaly.description}</Txt>
          </div>
        </Article>
      </a>
    </Link>
  )
}
