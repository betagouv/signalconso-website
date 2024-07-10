'use client'
import {getNewsArticleData} from '@/components_feature/actualites/newsArticlesData'
import {appConfig} from '@/core/appConfig'
import {Footer, FooterProps} from '@codegouvfr/react-dsfr/Footer'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {HTMLAttributeAnchorTarget} from 'react'
import {buildLinkNewsArticle, pagesDefs} from '../core/pagesDefinitions'
import {I18nContextProps, useI18n} from '../i18n/I18n'
import buildMenuLink from '../utils/menuLinks'

export const urlServicePublicPlus = `https://www.plus.transformation.gouv.fr/experience/step_1?pk_campaign=DGCCRF`

export function ScFooter() {
  const i18n = useI18n()
  const {m, currentLang} = i18n
  const pathName = usePathname() ?? ''

  function link(url: string, text: string, target?: HTMLAttributeAnchorTarget) {
    return buildMenuLink(currentLang, pathName, url, text, target)
  }

  const linkList = buildLinksList(i18n, link)
  return (
    <>
      <FollowUs />
      <Footer
        brandTop={<MinistryName />}
        contentDescription={
          <>
            {m.footer.text1}
            <br />
            {m.footer.text2}
            <Link target="_blank" href="https://www.economie.gouv.fr/dgccrf">
              {m.footer.dgccrfLink}
            </Link>
            .
          </>
        }
        operatorLogo={{orientation: 'horizontal', imgUrl: '/image/logo-dgccrf.png', alt: m.footer.homeLinkTitle}}
        websiteMapLinkProps={{href: `/${currentLang}${pagesDefs.planDuSite.url}`}}
        accessibility="partially compliant"
        accessibilityLinkProps={{href: `/${currentLang}${pagesDefs.accessibilite.url}`}}
        termsLinkProps={{href: `/${currentLang}${pagesDefs.conditionsGeneralesUtilisation.url}`}}
        homeLinkProps={
          {
            href: `/${currentLang}`,
            // The accessibility audit told us not to put a title attribute here
            // The types ask for it but it still works without it
          } as any
        }
        {...{linkList}}
        bottomItems={[
          link(pagesDefs.suiviEtViePrivee.url, m.footer.privacyTitle),
          link(pagesDefs.cookies.url, m.footer.cookiesTitle),
          link(pagesDefs.actualites.url, m.footer.actualitesLinkTitle),
          {
            text: m.footer.connexionLinkTitle,
            linkProps: {
              href: pagesDefs.espaceProConnexion.url,
              target: '_self',
            },
          },
          {
            text: m.footer.servicePublicPlusLinkTitle,
            linkProps: {
              href: urlServicePublicPlus,
            },
          },
          ...(appConfig.showPlayground ? [link(pagesDefs.playground.url, 'Playground')] : []),
        ]}
      />
    </>
  )
}

function buildLinksList(
  i18n: I18nContextProps,
  link: (url: string, text: string) => FooterProps.LinkList.Link,
): FooterProps.LinkList.List | undefined {
  const {m, currentLang} = i18n
  if (currentLang !== 'fr') {
    return undefined
  }
  const articles = getNewsArticleData().filter(_ => _.lang === currentLang)
  const articlesLink: FooterProps.LinkList.Link[] = articles.map(article =>
    link(buildLinkNewsArticle(article), article.veryShortTitle),
  )
  const fivesArticlesLinks = articlesLink.slice(0, 5) as [
    FooterProps.LinkList.Link,
    FooterProps.LinkList.Link,
    FooterProps.LinkList.Link,
    FooterProps.LinkList.Link,
    FooterProps.LinkList.Link,
  ]
  return [
    {
      categoryName: 'Actualités',
      links: fivesArticlesLinks,
    },
    {
      categoryName: 'Je signale',
      links: [
        link(pagesDefs.signalInfluenceur.url, 'Un influenceur'),
        link(pagesDefs.obligationFibre.url, 'Un passage forcé à la fibre'),
        link(pagesDefs.obsolescencePage.url, 'Une obsolescence programmée'),
        link(pagesDefs.demarchageTelephonique.url, 'Un démarchage téléphonique'),
        link(pagesDefs.intoxAlimentaire.url, 'Une intoxication alimentaire'),
      ],
    },
    {
      categoryName: 'Par grande thématique',
      links: [
        link('/achat-site', 'Achats sur Internet'),
        link('/achat-magasin', 'Achats en magasin'),
        link('/eau-gaz-electricite', 'Eau, gaz, et électricité'),
        link('/travaux-renovation', 'Travaux, rénovation, artisans'),
        link('/voyage-loisirs', 'Transports en commun, voyages'),
      ],
    },
    {
      categoryName: 'Je signale aussi',
      links: [
        link('/tel-internet-media', 'Un opérateur mobile ou FAI'),
        link('/fichage-bancaire-injustifie', 'Un fichage bancaire injustifié'),
        link('/retard-train', 'Un retard de train'),
      ],
    },
    {
      categoryName: 'Arnaques courantes',
      links: [
        link('/arnaques-primes-energie-renovation', 'Arnaque aux primes énergie ou MaPrimeRénov'),
        link('/cpf-formation', 'Arnaque au CPF'),
        link('/pompe-a-chaleur-pac', `Arnaque à l'installation de pompe à chaleur PAC`),
      ],
    },
    {
      categoryName: 'Pour aller plus loin',
      links: [
        link(pagesDefs.commentCaMarche.url, m.header.commentCaMarcheLinkTitle),
        link(pagesDefs.litige.url, m.footer.litigeLinkTitle),
      ],
    },
  ]
}

// En se basant sur https://www.diplomatie.gouv.fr/en/
// On ne traduit pas le nom du ministère
function MinistryName() {
  return (
    <>
      Ministère <br /> de l'économie <br /> des finances <br /> et de la souveraineté <br /> industrielle et numérique
    </>
  )
}

function FollowUs() {
  const {m} = useI18n()
  // not in react-dsfr yet
  return (
    <div className="fr-follow">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-follow__social">
              <p className="fr-h5" dangerouslySetInnerHTML={{__html: m.footer.suivezNous}} />
              <ul className="fr-btns-group">
                <li>
                  <Link
                    className="fr-btn--facebook fr-btn"
                    href="https://www.facebook.com/DGCCRF"
                    target="_blank"
                    title={m.footer.facebookTitle}
                  >
                    facebook
                  </Link>
                </li>
                <li>
                  <Link
                    className="fr-btn--twitter fr-btn"
                    href="https://twitter.com/SignalConso"
                    target="_blank"
                    title={m.footer.twitterTitle}
                  >
                    twitter
                  </Link>
                </li>
                <li>
                  <Link
                    className="fr-btn--instagram fr-btn"
                    href="https://www.instagram.com/dgccrf_off/"
                    target="_blank"
                    title={m.footer.instagramTitle}
                  >
                    instagram
                  </Link>
                </li>
                <li>
                  <Link
                    className="fr-btn--linkedin fr-btn"
                    href="https://www.linkedin.com/company/dgccrf/"
                    target="_blank"
                    title={m.footer.linkedinTitle}
                  >
                    linkedin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
