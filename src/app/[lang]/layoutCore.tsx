'use client'
import {ApiClientsProvider} from '@/context/ApiClientsContext'
import {AutoscrollProvider} from '@/context/AutoscrollContext'
import {AppLang} from '@/i18n/localization/AppLangs'
import {monkeyPatchDomForGoogleTranslate} from '@/utils/fixGoogleTranslate'
import {SkipLinks} from '@codegouvfr/react-dsfr/SkipLinks'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {usePathname} from 'next/navigation'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import {AnalyticProvider} from '../../analytic/AnalyticContext'
import {Analytic, PageChangesListener} from '../../analytic/analytic'
import {ReportCreateProvider} from '../../components_feature/reportFlow/ReportCreateContext'
import {ReportFlowProvider} from '../../components_feature/reportFlow/ReportFlowContext'
import {ScFooter} from '../../components_simple/ScFooter'
import {ScHeader} from '../../components_simple/ScHeader'
import {RgpdBanner} from '../../components_simple/bigBanners/RgpdBanner'
import {appConfig} from '../../core/appConfig'
import '../../globals.css'
import {ToastProvider} from '../../hooks/useToastError'
import {useI18n} from '../../i18n/I18n'
import {Eularian} from '../../plugins/eularian'
import {Matomo} from '../../plugins/matomo'
import {Sentry} from '../../plugins/sentry'
import Image from 'next/image'
import signalConsoLogo from '@/img/logo-signalconso.png'
import blocMarianne from '@/img/Bloc_Marianne.svg'
import MainNavigation from '@codegouvfr/react-dsfr/MainNavigation'
import Button from '@codegouvfr/react-dsfr/Button'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'

monkeyPatchDomForGoogleTranslate()

const queryClient = new QueryClient()

const LayoutCore: ({children}: {children: React.ReactNode}) => JSX.Element = ({children}: {children: React.ReactNode}) => {
  const [analytic, setAnalytic] = useState<Analytic | undefined>()

  useEffect(() => {
    Sentry.init(appConfig)
    setAnalytic(Analytic.init())
  }, [])

  return (
    <>
      <ApiClientsProvider>
        <QueryClientProvider client={queryClient}>
          <AnalyticProvider analytic={analytic}>
            <ToastProvider>
              <ReportCreateProvider>
                <ReportFlowProvider>
                  <AutoscrollProvider>
                    <Base>{children}</Base>
                  </AutoscrollProvider>
                </ReportFlowProvider>
              </ReportCreateProvider>
            </ToastProvider>
          </AnalyticProvider>
        </QueryClientProvider>
      </ApiClientsProvider>
      {analytic && <PageChangesListener {...{analytic}} />}
    </>
  )
}

function checkIsWebView(pathname: string, currentLang: AppLang) {
  const regexPattern = `^\\/${currentLang}\\/webview\\/`
  const regex = new RegExp(regexPattern)
  return regex.test(pathname)
}

const Base = ({children}: {children: React.ReactNode}) => {
  const {currentLang} = useI18n()
  const pathname = usePathname()
  const isWebView = checkIsWebView(pathname, currentLang)
  return (
    <>
      {appConfig.enableEularian && (
        <Script
          nonce="eYhD6rb8vLVwXsAmnbKl/Q=="
          id="eulerian-analytics"
          dangerouslySetInnerHTML={{
            __html: `(function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);(function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})('wykp.signal.conso.gouv.fr','EA_push');`,
          }}
        />
      )}
      <div className="root">
        {isWebView ? (
          <div className="mt-2">{children}</div>
        ) : (
          <>
            <SkipLinks
              links={[
                {
                  anchor: '#main-content',
                  label: 'Contenu',
                },
                {
                  anchor: '#fr-footer',
                  label: 'Pied de page',
                },
              ]}
            />
            {/* <ScHeader /> */}
            <div className="bg-white fixed top-0 w-full h-[70px] shadow-lg z-50 flex items-center justify-between pl-4 pr-4">
              {/* <div className="flex overflow-hidden  h-6 items-center justify-center">
                  <Image src={blocMarianne} alt="Logo République Française" className="h-full w-auto" />
                </div> */}
              <Image src={signalConsoLogo} alt="Logo SignalConso" className="h-8 w-auto" />

              <div className="flex gap-4 items-center justify-center">
                <div className=" border border-solid border-gray-300 px-2 py-1 font-bold text-scbluefrance">🇫🇷 FR</div>
                <i className="ri-menu-line fr-icon--lg text-black" />
              </div>
            </div>
            <div className="mt-[70px] mb-[90px] overflow-auto">{children}</div>
            <div className="fixed z-50 bottom-[100px] right-2 bg-red-200">
              <Button size="large" iconId="ri-alarm-warning-fill" className="rounded-full !py-4">
                Je fais un signalement
              </Button>
            </div>
            <div className="bg-white fixed bottom-0 w-full h-[90px] z-50">
              <ul className=" flex h-full list-none m-0 p-0 gap-2 px-2">
                <FooterElement icon="ri-home-4-line" label="Accueil" active />
                <FooterElement icon="ri-megaphone-line" label="Actualites" />
                <FooterElement icon="ri-cake-3-line" label="Rappels produits" />
                <FooterElement icon="ri-government-line" label="La DGCCRF" active />
              </ul>
            </div>

            {/* <RgpdBanner /> */}
            {/* <ScFooter /> */}
          </>
        )}
      </div>
    </>
  )
}

function FooterElement({label, icon, active}: {label: string; icon: string; active?: boolean}) {
  return (
    <li
      className={`flex-1 cursor-pointer flex flex-col items-center border-t-[4px] border-solid  border-0 ${
        active ? 'border-scbluefrance' : 'border-white'
      }`}
    >
      <i className={`${icon} fr-icon--lg mt-2`} />
      <span className={`text-sm text-center`} dangerouslySetInnerHTML={{__html: label}} />
    </li>
  )
}

export default LayoutCore
