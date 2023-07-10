'use client'

import Header from '@codegouvfr/react-dsfr/Header'
import {pagesDefs} from '../core/pagesDefinitions'
import {HTMLAttributeAnchorTarget} from 'react'
import {appConfig} from 'core/appConfig'
import {urlServicePublicPlus} from './ScFooter'
import {useI18n} from '../i18n/I18n'
import {usePathname} from 'next/navigation'

function buildMenuLink(pathname: String, url: string, text: string, target?: HTMLAttributeAnchorTarget) {
  return {
    isActive: pathname === url,
    linkProps: {
      href: url,
      target,
    },
    text,
  }
}

function buildSubmenu(text: string, menuLinks: ReturnType<typeof buildMenuLink>[]) {
  return {
    text,
    isActive: menuLinks.some(_ => _.isActive),
    menuLinks,
  }
}

export function ScHeader() {
  const pathName = usePathname() ?? ''
  const {m} = useI18n()
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
          href: '/',
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
              href: pagesDefs.connexion.url,
              target: '_self',
            },
            text: m.header.connexionLinkTitle,
          },
        ]}
        // serviceTitle="SignalConso"
        // serviceTagline="un service public pour les consommateurs"
        navigation={[
          buildMenuLink(pathName, pagesDefs.index.url, m.header.indexLinkTitle),
          buildMenuLink(pathName, pagesDefs.commentCaMarche.url, m.header.commentCaMarcheLinkTitle),
          buildMenuLink(pathName, pagesDefs.centreAide.url, m.header.centreAideLinkTitle),
          buildSubmenu(m.header.voirAussiTitle, [
            buildMenuLink(pathName, pagesDefs.quiSommesNous.url, m.header.quiSommesNousLinkTitle),
            buildMenuLink(pathName, pagesDefs.stats.url, m.header.statsLinkTitle),
            buildMenuLink(pathName, pagesDefs.contact.url, m.header.contactLinkTitle),
            buildMenuLink(pathName, pagesDefs.actualites.url, m.header.actualitesLinkTitle),
            buildMenuLink(pathName, urlServicePublicPlus, m.header.servicePublicPlusLinkTitle, '_blank'),
          ]),
          ...(pagesDefs.playground ? [buildMenuLink(pathName, pagesDefs.playground.url, 'Playground')] : []),
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
