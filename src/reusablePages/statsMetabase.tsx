'use client'

import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {iframeResizer} from 'iframe-resizer'
import Link from 'next/link'
import {useEffect} from 'react'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLangs} from '../i18n/localization/AppLangs'

const anonMetabaseDomain = `app-2361543a-545f-4c8e-88f5-89f57aaffc78.cleverapps.io`

function getDashboardUrl(dashboardId: string) {
  return `https://${anonMetabaseDomain}/public/dashboard/${dashboardId}?#bordered=false&titled=false`
}

export const StatsMetabase = ({params}: any) => {
  const {messages: m} = getI18n(params.lang)
  return (
    <>
      <ContentPageContainer>
        <h1 className="fr-h1">
          <i className="ri-bar-chart-2-line fr-icon--lg" /> {m.statsTitle}{' '}
        </h1>
        {params.lang == AppLangs.fr && (
          <p className="mb-8">
            {m.statsText}
            <Link className="" target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr/pages/signalconso/">
              data.economie.fr
            </Link>
          </p>
        )}
        <h2>Les signalements</h2>

        <MetabaseIframe dashboardId="10790030-f28c-4726-afe7-d26d7e032094" />
        <h2>Les promesses d'action</h2>
        <FriendlyHelpText>
          <i className={'ri-information-line mr-2'} />
          Lors qu'une entreprise reçoit un signalement de SignalConso, elle est invitée à reconnaître sa faute et s'engager à
          s'améliorer, et à réparer le tort éventuel fait au consommateur. C'est ce qu'on appelle une «promesse d'action».
        </FriendlyHelpText>
        <MetabaseIframe dashboardId="a42aa668-f374-48e1-9120-8610f2a2b76b" />
        <h2>Les entreprises signalées</h2>
        <MetabaseIframe dashboardId="70ca31ae-8f81-487d-a6c5-798e6f7834dc" />
      </ContentPageContainer>
    </>
  )
}

function MetabaseIframe({dashboardId, className = ''}: {dashboardId: string; className?: string}) {
  // for some reason the resize doesn't work if we use an id from "useId()", even if properly escaped
  const id = `metabase${dashboardId}`
  useEffect(() => {
    iframeResizer({log: true, tolerance: 10}, `#${CSS.escape(id)}`)
  }, [])
  return <iframe {...{id}} className={`${className} w-full mb-4`} src={getDashboardUrl(dashboardId)} />
}
