'use client'
import {pagesDefs} from 'core/pagesDefinitions'
import {useI18n} from 'i18n/I18n'
import Link from 'next/link'
import {useEffect, useId, useState} from 'react'
import {LocalStorageEntity} from '../../utils/localStorageApi'

const localStorageEntity = new LocalStorageEntity<boolean>('rgpd-banner-hidden')

export function RgpdBanner() {
  // true at first so that it don't appears in SSR
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    const hiddenInStorage = localStorageEntity.load()
    if (hiddenInStorage !== true) {
      setHidden(false)
    }
  }, [])
  const {m} = useI18n()
  const id = useId()

  function onClose() {
    localStorageEntity.save(true)
    setHidden(true)
  }
  if (hidden) {
    return null
  }
  // code HTML de https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/gestionnaire-de-consentement
  // avec le bouton de fermeture de https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale
  // avec correction indiquée ici https://github.com/GouvernementFR/dsfr/issues/591
  return (
    <div className="fr-consent-banner" id={id}>
      <button
        className="fr-btn--close fr-btn"
        title="Fermer : À propos des cookies sur signalconso.gouv.fr"
        aria-controls={id}
        onClick={onClose}
      >
        {m.close}
      </button>
      <h2 className="fr-h6">{m.bannerCookieRemark}</h2>
      <div className="fr-consent-banner__content">
        <p className="fr-text--sm">
          {m.bannerCookie} <Link href={pagesDefs.cookies.url}>{m.bannerCookieSeeMore}</Link>
        </p>
      </div>
    </div>
  )
}
