import {Box, Link} from '@mui/material'
import {Alert} from '@mui/lab'
import {styleUtils} from '../../core/theme/theme'
import {useConfig} from '../../core/context/ConfigContext'


export const InfoBanner = () => {
  const config = useConfig().config

  return config.infoBanner ? (
    <Alert severity="warning">
      <Box className="blog" sx={{
        textAlign: 'center',
        fontSize: t => styleUtils(t).fontSize.big,
      }} dangerouslySetInnerHTML={{__html: config.infoBanner}}/>
    </Alert>
  ) : <></>
}

