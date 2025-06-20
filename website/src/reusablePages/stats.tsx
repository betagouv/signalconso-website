'use client'

import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {appConfig} from '@/core/appConfig'
import {PageComponentProps} from '@/core/metadatas'
import {AppLangs} from '@/i18n/localization/AppLangs'
import {iframeResizer} from 'iframe-resizer'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {useEffect} from 'react'
import satisfactionData from '../generate_stat_data/satisfaction.json'

export function Stats(props: PageComponentProps) {
  const tauxSatisfaction = satisfactionData.valeur
  // We can't translate Metabase
  throwNotFoundIfNotFr(props)
  return (
    <>
      <ContentPageContainer>
        <h1 className="fr-h1">
          <i className="ri-bar-chart-2-line fr-icon--lg" /> Statistiques de SignalConso
        </h1>
        <p className="mb-8">
          Ces statistiques sont mises à jour en temps réel. Des statistiques complémentaires sont aussi disponibles sur le site{' '}
          <Link className="" target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr/pages/signalconso/">
            data.economie.fr
          </Link>
        </p>

        <h2 className="mb-0">Les signalements</h2>
        <div className="flex flex-col md:flex-row">
          <MetabaseIframe dashboardId="10790030-f28c-4726-afe7-d26d7e032094" />
          {tauxSatisfaction && (
            <div className=" w-full md:w-1/3 flex flex-col items-center justify-center ">
              <p className="font-bold text-[56px] text-[#4B5874] ">{tauxSatisfaction} %</p>
              <p className="text-[18px] text-center w-full font-bold text-[#4B5874] mb-0 ">
                des utilisateurs de SignalConso sont satisfaits.
              </p>
              <p className="text-[12px] text-center w-full  text-[#4B5874] ">
                d'après la dernière étude réalisée par{' '}
                <Link className="" target="_blank" rel="noreferrer" href="https://www.plus.transformation.gouv.fr/">
                  Services Publics +
                </Link>
              </p>
            </div>
          )}
        </div>
        <h2>Les promesses d'action</h2>
        <FriendlyHelpText>
          <p className="mb-2">
            <i className={'ri-information-line mr-2'} />
            Lorsqu'une entreprise reçoit un signalement via SignalConso, elle est encouragée à reconnaître son erreur, à s'engager
            dans un processus d'amélioration, et à réparer le préjudice éventuellement causé au consommateur. C'est ce qu'on
            appelle une « promesse d'action ».
          </p>
          <p className="mb-0">
            <span className="font-bold">C'est la métrique phare de SignalConso</span>, celle que notre équipe cherche à améliorer
            en permanence.
          </p>
        </FriendlyHelpText>
        <MetabaseIframe dashboardId="a42aa668-f374-48e1-9120-8610f2a2b76b" />
        <h2 className="mb-0">Les entreprises signalées</h2>
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

function getDashboardUrl(dashboardId: string) {
  return `${appConfig.anonMetabaseUrl}/public/dashboard/${dashboardId}?#bordered=false&titled=false`
}

async function throwNotFoundIfNotFr(props: PageComponentProps) {
  const params = await props.params
  if (params.lang !== AppLangs.fr) {
    notFound()
  }
}
