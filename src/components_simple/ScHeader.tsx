import Header from '@codegouvfr/react-dsfr/Header'
import {pagesDefs} from '../core/pagesDefinitions'
import {NextRouter, useRouter} from 'next/router'
import {HTMLAttributeAnchorTarget} from 'react'
import {appConfig} from 'core/appConfig'
import {urlServicePublicPlus} from './ScFooter'

function buildMenuLink(router: NextRouter, url: string, text: string, target?: HTMLAttributeAnchorTarget) {
  return {
    isActive: router.pathname === url,
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
  const router = useRouter()
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
          title: 'Accueil - SignalConso',
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
            text: 'Espace professionnels',
          },
        ]}
        // serviceTitle="SignalConso"
        // serviceTagline="un service public pour les consommateurs"
        navigation={[
          buildMenuLink(router, pagesDefs.index.url, 'Accueil'),
          buildMenuLink(router, pagesDefs.commentCaMarche.url, 'Comment ça marche ?'),
          buildMenuLink(router, pagesDefs.centreAide.url, `Aide`),
          buildSubmenu('Voir aussi', [
            buildMenuLink(router, pagesDefs.quiSommesNous.url, 'Qui sommes-nous ?'),
            buildMenuLink(router, pagesDefs.stats.url, 'Statistiques'),
            buildMenuLink(router, pagesDefs.contact.url, `Contact`),
            buildMenuLink(router, pagesDefs.actualites.url, `Actualités`),
            buildMenuLink(router, urlServicePublicPlus, `Services Publics +`, '_blank'),
          ]),
          ...(pagesDefs.playground ? [buildMenuLink(router, pagesDefs.playground.url, 'Playground')] : []),
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
