import {Box} from '@mui/material'
import {Animate} from 'components_simple/Animate'
import {useI18n} from 'i18n/I18n'
import {alertWarningBackgroundColor, alertWarningTextColor} from '../../../components_simple/ScAlert'
import {Txt} from '../../../alexlibs/Txt'

export function ConsumerAnonymousInformation() {
  const {m} = useI18n()
  const textStyle = {lineHeight: '1.3'}
  return (
    <Animate>
      <Box
        sx={{
          py: 2,
          px: 4,
          background: alertWarningBackgroundColor,
          color: alertWarningTextColor,
        }}
      >
        <Txt sx={textStyle} block>
          {m.consumerAnonymousInformation}
        </Txt>
      </Box>
    </Animate>
  )
}
