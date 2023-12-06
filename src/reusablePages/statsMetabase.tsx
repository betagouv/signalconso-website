'use client'

import {ContentPageContainer} from '@/components_simple/PageContainers'
import Link from 'next/link'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLangs} from '../i18n/localization/AppLangs'
import {iframeResizer} from 'iframe-resizer'
import {useEffect} from 'react'

const IFRAME_URL =
  'https://app-a6c69963-eab5-4de0-bfdb-60704e9a1b01.cleverapps.io/public/dashboard/afef0613-115f-48b3-8d92-82e93a5f5cd0'

export const StatsMetabase = ({params}: any) => {
  const id = 'metabase'
  const {messages: m} = getI18n(params.lang)

  useEffect(() => {
    iframeResizer({log: true, tolerance: 10}, `#${id}`)
  }, [])

  return (
    <>
      <ContentPageContainer>
        <h1 className="">{m.statsTitle}</h1>
        {params.lang == AppLangs.fr && (
          <p>
            {m.statsText}
            <Link className="" target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr/pages/signalconso/">
              data.economie.fr
            </Link>
          </p>
        )}
        <iframe {...{id}} className="w-full" src={IFRAME_URL} />
      </ContentPageContainer>
    </>
  )
}
