'use client'
import {CallOut} from '@codegouvfr/react-dsfr/CallOut'
import {internalPageDefs} from '../../core/pagesDefinitions'
import {useEffect, useId, useState} from 'react'
import {useI18n} from '../../i18n/I18n'
import {LocalStorageEntity} from '../../utils/localStorageApi'

const localStorageHidden = new LocalStorageEntity('translated-limited-website-alert-hidden')

export const TranslatedWebsiteAlert = () => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const displayAlert = localStorageHidden.load()
    if (displayAlert !== true) {
      setHidden(false)
    }
  }, [])
  function onClose() {
    localStorageHidden.save(true)
    setHidden(true)
  }

  if (hidden) {
    return null
  }

  return (
    <CallOut
      title={'Information'}
      buttonProps={{
        children: 'Close / Fermer',
        onClick: () => onClose(),
      }}
      iconId="ri-information-line"
    >
      <span>
        <div className="m-4">
          This is a limited version of SignalConso dedicated to consumer issues regarding individuals visiting France. If you are
          confortable with french, switch to the{' '}
          <a href={`/fr${internalPageDefs.index.url}`} rel="noreferrer">
            french website
          </a>{' '}
          to see full version.
        </div>
        <hr style={{borderTop: '1px solid #ccc'}} />
        <div className="m-4">
          Ceci est une version limitée de SignalConso dédiée aux problèmes de consommation rencontrés par les personnes de passage
          en France , basculez sur la{' '}
          <a href={`/fr${internalPageDefs.index.url}`} rel="noreferrer">
            {' '}
            version française
          </a>{' '}
          pour voir la version complète.
        </div>
      </span>
    </CallOut>
  )
}
