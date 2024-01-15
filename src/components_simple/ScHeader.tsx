'use client'

import Header from '@codegouvfr/react-dsfr/Header'
import {appConfig} from '@/core/appConfig'
import {usePathname} from 'next/navigation'
import {pagesDefs} from '../core/pagesDefinitions'
import {useI18n} from '../i18n/I18n'
import buildMenuLink from '../utils/menuLinks'
import {urlServicePublicPlus} from './ScFooter'
import {SwitchLang} from './SwitchLang'
import {useEffect} from 'react'
import {AppLangs} from '@/i18n/localization/AppLangs'

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

  useEffect(() => {
    const logoLink = document.querySelector('.fr-header__logo a')
    if (logoLink) {
      // accessibility audit asked for this
      logoLink.setAttribute('aria-label', m.header.logoLinkLabel)
    }
  }, [])

  return (
    <>
      <Header
        brandTop={
          // En se basant sur https://www.diplomatie.gouv.fr/en/
          // On ne traduit pas République Française
          <>
            République
            <br/>
            Française
          </>
        }
        homeLinkProps={
          {
            href: `/${currentLang}`,
            // The accessibility audit told us not to put a title attribute here
            // The types ask for it but it still works without it
          } as any
        }
        operatorLogo={{
          alt: m.header.homeLinkTitle,
          imgUrl: '/image/logo-signalconso_145_61.png',
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
          <SwitchLang key={"switchLang"}/>,
        ]}
        // serviceTitle="SignalConso"
        // serviceTagline="un service public pour les consommateurs"
        navigation={[
          buildMenuLink(currentLang, pathName, pagesDefs.index.url, m.header.indexLinkTitle),
          buildMenuLink(currentLang, pathName, pagesDefs.commentCaMarche.url, m.header.commentCaMarcheLinkTitle),
          {
            isActive: false,
            linkProps: {
              href: pagesDefs.centreAide.url,
              target: '_blank',
            },
            text: m.header.centreAideLinkTitle,
          },
          buildSubmenu(m.header.voirAussiTitle, [
            buildMenuLink(currentLang, pathName, pagesDefs.quiSommesNous.url, m.header.quiSommesNousLinkTitle),
            ...(pagesDefs.stats.hasAlternate || currentLang === AppLangs.fr
              ? [buildMenuLink(currentLang, pathName, pagesDefs.stats.url, m.header.statsLinkTitle)]
              : []),
            buildMenuLink(currentLang, pathName, pagesDefs.contact.url, m.header.contactLinkTitle),
            {
              isActive: false,
              linkProps: {
                href: urlServicePublicPlus,
                target: '_blank',
              },
              text: m.header.servicePublicPlusLinkTitle,
            },
            buildMenuLink(currentLang, pathName, pagesDefs.actualites.url, m.header.actualitesLinkTitle),
          ]),
        ]}
      />
      <EnvMarker/>
    </>
  )
}

function EnvMarker() {
  const DEV = 'dév'
  const marker = appConfig.envMarker ?? (appConfig.isDev ? DEV : null)
  if (marker) {
    return (
      <div className="absolute z-[999] pointer-events-none top-0 w-full flex justify-center">
        <div className="fr-container ">
          <div
            className={`${
              marker === DEV ? ` bg-green-700 text-white font-bold uppercase text-2xl` : 'text-sm text-green-900'
            }     border-green-900 border border-solid w-fit p-1 ml-32 mt-3 `}
          >
            {marker}
          </div>
        </div>
      </div>
    )
  }
  return null
}
