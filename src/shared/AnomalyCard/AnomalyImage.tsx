import {Box, BoxProps} from '@mui/material'
import {Anomaly} from '../../anomaly/Anomaly'

interface Props extends BoxProps {
  anomaly: Pick<Anomaly, 'sprite'>
  scale?: number
}

const backgroundPosition: Record<string, string> = {
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

export const AnomalyImage = ({anomaly, className, scale = 1, sx, ...other}: Props) => {
  const size = 72
  return (
    <Box
      {...other}
      sx={{
        ...sx,
        ...(anomaly.sprite
          ? anomaly.sprite === 'category-bloctel'
            ? {
                background: 'url("/image/pictos/bloctel.png") no-repeat center',
                backgroundSize: 'contain',
              }
            : {
                background: 'url("/image/pictos/sprite.png") no-repeat bottom',
                backgroundPosition: backgroundPosition[anomaly.sprite],
                backgroundRepeat: 'no-repeat',
              }
          : {}),
        transform: `scale(${scale})`,
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
      }}
      className={`${className ?? ''} sprite-${anomaly.sprite}`}
    />
  )
}
