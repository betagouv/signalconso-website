import {useEffect, useMemo, useState} from 'react'
import {LocalStorageEntity} from '../../utils/localStorageApi'
import {useToast} from 'hooks/useToast'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import {ScButton} from 'components_simple/Button/Button'
import {useI18n} from 'i18n/I18n'

export const useRgpdBanner = () => {
  const {m} = useI18n()
  const storage = useMemo(() => new LocalStorageEntity<boolean>('rgpd-banner-hidden'), [])
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    const hidden = storage.load()
    if (hidden === undefined || !hidden) {
      setHidden(false)
    }
  }, [])
  const {toastInfo, toastWarning} = useToast()
  useEffect(() => {
    if (!hidden) {
      toastInfo(m.bannerCookie, {
        onClose: () => {
          setHidden(true)
          storage.save(true)
        },
        autoHideDuration: null,
        keepOpenOnClickAway: true,
        action: (
          <Link href={siteMap.cookies} legacyBehavior>
            <ScButton>{m.bannerCookieSeeMore}</ScButton>
          </Link>
        ),
      })
    }
  }, [hidden])
}
