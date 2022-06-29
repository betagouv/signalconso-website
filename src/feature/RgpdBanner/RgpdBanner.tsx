import {useEffect, useMemo, useState} from 'react'
import {LocalStorageEntity} from '../../alexlibs/react-persistent-state'
import {useToast} from 'core/toast'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import {ScButton} from 'shared/Button/Button'
import {useI18n} from 'core/i18n'

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
          <Link href={siteMap.cookies}>
            <ScButton>{m.bannerCookieSeeMore}</ScButton>
          </Link>
        ),
      })
    }
  }, [hidden])
}
