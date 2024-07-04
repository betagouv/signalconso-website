'use client'
import {appConfig} from '@/core/appConfig'
import {Footer} from '@codegouvfr/react-dsfr/Footer'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {pagesDefs} from '../core/pagesDefinitions'
import {useI18n} from '../i18n/I18n'
import buildMenuLink from '../utils/menuLinks'

export const urlServicePublicPlus = `https://www.plus.transformation.gouv.fr/experience/step_1?pk_campaign=DGCCRF`

export function ScFooter() {
  const {m, currentLang} = useI18n()
  const pathName = usePathname() ?? ''
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
        bottomItems={[
          buildMenuLink(currentLang, pathName, pagesDefs.suiviEtViePrivee.url, m.footer.privacyTitle),
          buildMenuLink(currentLang, pathName, pagesDefs.cookies.url, m.footer.cookiesTitle),
          {
            text: m.footer.connexionLinkTitle,
            linkProps: {
              href: pagesDefs.espaceProConnexion.url,
              target: '_self',
            },
          },
          buildMenuLink(currentLang, pathName, pagesDefs.delaiRetractation.url, m.footer.retractationLinkTitle),
          buildMenuLink(currentLang, pathName, pagesDefs.litige.url, m.footer.litigeLinkTitle),
          {
            text: m.footer.servicePublicPlusLinkTitle,
            linkProps: {
              href: urlServicePublicPlus,
            },
          },
          buildMenuLink(currentLang, pathName, pagesDefs.actualites.url, m.footer.actualitesLinkTitle),
          ...(appConfig.showPlayground ? [buildMenuLink(currentLang, pathName, pagesDefs.playground.url, 'Playground')] : []),
        ]}
      />
    </>
  )
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
