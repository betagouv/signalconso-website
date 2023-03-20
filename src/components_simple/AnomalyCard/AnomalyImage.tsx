import {Box, BoxProps} from '@mui/material'
import {Anomaly} from '../../anomalies/Anomaly'
import Image from 'next/image'

interface Props extends BoxProps {
  anomaly: Pick<Anomaly, 'sprite'>
  scale?: number
}

export const AnomalyImage = ({anomaly, className, scale = 1, sx, ...other}: Props) => {
  const size = 72
  return (
    <Box
      {...other}
      sx={{
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
        marginRight: 1,
      }}
      className={`${className ?? ''} sprite-${anomaly.sprite}`}
    >
      <Image
        width={'100%'}
        height={'100%'}
        objectFit={'contain'}
        src={`/image/pictos/${anomaly.sprite}.png`}
        alt={anomaly.sprite}
      />
    </Box>
  )
}
