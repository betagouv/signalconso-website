'use client'
import {Footer} from '@codegouvfr/react-dsfr/Footer'
import Link from 'next/link'
import {pagesDefs} from '../core/pagesDefinitions'
import {useI18n} from '../i18n/I18n'

export const urlServicePublicPlus = `https://www.plus.transformation.gouv.fr`

export function ScFooter() {
  const {m} = useI18n()
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
        operatorLogo={{orientation: 'horizontal', imgUrl: '/image/logo-dgccrf.png', alt: 'Logo DGCCRF'}}
        websiteMapLinkProps={{href: pagesDefs.planDuSite.url}}
        accessibility="partially compliant"
        accessibilityLinkProps={{href: pagesDefs.accessibilite.url}}
        termsLinkProps={{href: pagesDefs.conditionsGeneralesUtilisation.url}}
        homeLinkProps={{href: '/', title: m.footer.homeLinkTitle}}
        // personalDataLinkProps={{href: pagesDefs.suiviEtViePrivee.url}}
        // cookiesManagementLinkProps={{href: pagesDefs.cookies.url}}
        bottomItems={[
          {
            text: m.footer.connexionLinkTitle,
            linkProps: {
              href: pagesDefs.connexion.url,
              target: '_self',
            },
          },
          {
            text: m.footer.retractationLinkTitle,
            linkProps: {
              href: pagesDefs.delaiRetractation.url,
            },
          },
          {
            text: m.footer.litigeLinkTitle,
            linkProps: {
              href: pagesDefs.litige.url,
            },
          },
          {
            text: m.footer.actualitesLinkTitle,
            linkProps: {
              href: pagesDefs.actualites.url,
            },
          },
          {
            text: m.footer.servicePublicPlusLinkTitle,
            linkProps: {
              href: urlServicePublicPlus,
            },
          },
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
              <h2 className="fr-h5" dangerouslySetInnerHTML={{__html: m.footer.suivezNous}} />
              <ul className="fr-btns-group">
                <li>
                  <Link
                    className="fr-btn--facebook fr-btn"
                    href="https://www.facebook.com/SignalConso/"
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
