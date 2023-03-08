import {Box} from '@mui/material'
import {Animate} from 'components_simple/Animate/Animate'
import {useI18n} from 'i18n/I18n'
import {alertWarningBackgroundColor, alertWarningTextColor} from '../../../alexlibs/mui-extension/Alert/Alert'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'

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
          Vous restez anonyme, mais l'entreprise ne sera pas en mesure de résoudre votre problème en particulier. Pas de
          remboursement, de réponse personnalisée, ...
        </Txt>
      </Box>
    </Animate>
  )
}
