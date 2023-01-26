import {ScButton} from 'components_simple/Button/Button'
import {ButtonProps} from '@mui/material'
import {useI18n} from '../i18n/I18n'
import {siteMap} from '../core/siteMap'
import {useWindowWidth} from '../hooks/useWindowWidth'
import Link from 'next/link'
import {useRouter} from 'next/router'

export const LinkBackToHome = ({...props}: ButtonProps) => {
  const {m} = useI18n()
  const {query} = useRouter()
  return query.app_type != 'mobile' ? (
    <Link href={siteMap.index}>
      <ScButton {...props} color="primary" variant="contained" icon="home">
        {m.backToHome}
      </ScButton>
    </Link>
  ) : (
    <></>
  )
}
