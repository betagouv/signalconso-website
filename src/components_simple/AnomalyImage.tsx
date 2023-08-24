import {Box, BoxProps} from '@mui/material'
import {Anomaly} from '../anomalies/Anomaly'
import Image from 'next/image'

interface Props extends BoxProps {
  anomaly: Pick<Anomaly, 'img'>
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
        position: 'relative',
      }}
      className={`${className ?? ''} sprite-${anomaly.img}`}
    >
      <Image fill style={{objectFit: 'contain'}} src={`/image/pictos/${anomaly.img}.png`} alt="" />
    </Box>
  )
}
