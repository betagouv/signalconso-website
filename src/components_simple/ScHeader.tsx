import Header from '@codegouvfr/react-dsfr/Header'
import {siteMap} from '../core/siteMap'
import {NextRouter, useRouter} from 'next/router'
import {HTMLAttributeAnchorTarget} from 'react'

export function MinistryName() {
  return (
    <>
      Ministère <br /> de l'économie <br /> des finances <br /> et de la souveraineté <br /> industrielle et numérique
    </>
  )
}

function buildMenuLink(router: NextRouter, url: string, text: string, target?: HTMLAttributeAnchorTarget) {
  return {
    isActive: router.pathname === url,
    linkProps: {
      href: url,
    },
    text,
    target,
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
    <Header
      brandTop={<MinistryName />}
      homeLinkProps={{
        href: '/',
        title: 'Accueil - SignalConso',
      }}
      operatorLogo={{
        alt: 'SignalConso',
        imgUrl: '/image/logo-signalconso.png',
        orientation: 'horizontal',
      }}
      // serviceTitle="SignalConso"
      // serviceTagline="un service public pour les consommateurs"
      navigation={[
        buildMenuLink(router, siteMap.index, 'Accueil'),
        buildMenuLink(router, siteMap.commentCaMarche, 'Comment ça marche ?'),
        buildMenuLink(router, siteMap.centreAide, `Centre d'aide`),
        buildSubmenu('Voir aussi', [
          buildMenuLink(router, siteMap.quiSommesNous, 'Qui sommes-nous ?'),
          buildMenuLink(router, siteMap.stats, 'Statistiques'),
          buildMenuLink(router, siteMap.contact, `Contact`),
        ]),
        buildMenuLink(router, siteMap.connexion, 'Espace professionnels', '_self'),
      ]}
    />
  )
}
