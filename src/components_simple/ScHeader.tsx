'use client'

import Header from '@codegouvfr/react-dsfr/Header'
import {pagesDefs} from '../core/pagesDefinitions'
import {HTMLAttributeAnchorTarget} from 'react'
import {appConfig} from 'core/appConfig'
import {urlServicePublicPlus} from './ScFooter'
import {useI18n} from '../i18n/I18n'
import {usePathname} from 'next/navigation'
import {SwitchLang} from './SwitchLang'
import {AppLang, AppLangs} from '../i18n/localization/AppLangs'
import {addLangInPath, replaceLangInPath} from '../i18n/I18nTools'
import buildMenuLink from '../utils/MenuLink'

function buildSubmenu(text: string, menuLinks: ReturnType<typeof buildMenuLink>[]) {
  return {
    text,
    isActive: menuLinks.some(_ => _.isActive),
    menuLinks,
  }
}

export function ScHeader() {
  const pathName = usePathname() ?? ''
  const {m, currentLang} = useI18n()
  // En se basant sur https://www.diplomatie.gouv.fr/en/
  // On ne traduit pas République Française
  return (
    <>
      <Header
        brandTop={
          <>
            République
            <br />
            Française
          </>
        }
        homeLinkProps={{
          href: `/${currentLang}`,
          title: m.header.homeLinkTitle,
        }}
        operatorLogo={{
          alt: 'SignalConso',
          imgUrl: '/image/logo-signalconso.png',
          orientation: 'horizontal',
        }}
        quickAccessItems={[
          {
            iconId: 'fr-icon-briefcase-line',
            linkProps: {
              href: pagesDefs.espaceProWelcome.url,
              target: '_self',
            },
            text: m.header.connexionLinkTitle,
          },
          appConfig.translationFeatureFlagEnabled ? <SwitchLang key="translate-button" /> : <></>,
        ]}
        // serviceTitle="SignalConso"
        // serviceTagline="un service public pour les consommateurs"
        navigation={[
          buildMenuLink(currentLang, pathName, pagesDefs.index.url, m.header.indexLinkTitle),
          buildMenuLink(currentLang, pathName, pagesDefs.commentCaMarche.url, m.header.commentCaMarcheLinkTitle),
          buildMenuLink(currentLang, pathName, pagesDefs.centreAide.url, m.header.centreAideLinkTitle),
          buildSubmenu(m.header.voirAussiTitle, [
            buildMenuLink(currentLang, pathName, pagesDefs.quiSommesNous.url, m.header.quiSommesNousLinkTitle),
            buildMenuLink(currentLang, pathName, pagesDefs.stats.url, m.header.statsLinkTitle),
            buildMenuLink(currentLang, pathName, pagesDefs.contact.url, m.header.contactLinkTitle),
            {
              isActive: false,
              linkProps: {
                href: urlServicePublicPlus,
                target: '_blank',
              },
              text: m.header.servicePublicPlusLinkTitle,
            },
            ...(currentLang === AppLangs.fr
              ? [buildMenuLink(currentLang, pathName, pagesDefs.actualites.url, m.header.actualitesLinkTitle)]
              : []),
          ]),
          ...(pagesDefs.playground ? [buildMenuLink(currentLang, pathName, pagesDefs.playground.url, 'Playground')] : []),
        ]}
      />
      <EnvMarker />
    </>
  )
}

function EnvMarker() {
  const marker = appConfig.envMarker ?? (appConfig.isDev ? 'dév' : null)
  if (marker) {
    return (
      <div className="absolute z-[999] pointer-events-none top-0 w-full flex justify-center">
        <div className="fr-container ">
          <div className="text-green-900 border-green-900 border border-solid w-fit p-1 ml-32 mt-3 text-sm">{marker}</div>
        </div>
      </div>
    )
  }
  return null
}
