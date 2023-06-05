import {Footer} from '@codegouvfr/react-dsfr/Footer'
import Link from 'next/link'
import {pagesDefs} from '../core/pagesDefinitions'

export const urlServicePublicPlus = `https://www.plus.transformation.gouv.fr`

export function ScFooter() {
  return (
    <>
      <FollowUs />
      <Footer
        brandTop={<MinistryName />}
        contentDescription={
          <>
            SignalConso est un service public gratuit pour permettre aux consommateurs de signaler les problèmes rencontrés avec
            les entreprises. Faites un signalement, résolvez votre problème, ou obtenez des informations sur vos droits.
            <br />
            Il est édité par la{' '}
            <Link target="_blank" href="https://www.economie.gouv.fr/dgccrf">
              Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes
            </Link>
            .
          </>
        }
        operatorLogo={{orientation: 'horizontal', imgUrl: '/image/logo-dgccrf.png', alt: 'Logo DGCCRF'}}
        websiteMapLinkProps={{href: pagesDefs.planDuSite.url}}
        accessibility="partially compliant"
        accessibilityLinkProps={{href: pagesDefs.accessibilite.url}}
        termsLinkProps={{href: pagesDefs.conditionsGeneralesUtilisation.url}}
        homeLinkProps={{href: '/', title: 'Accueil - SignalConso'}}
        personalDataLinkProps={{href: pagesDefs.suiviEtViePrivee.url}}
        cookiesManagementLinkProps={{href: pagesDefs.cookies.url}}
        bottomItems={[
          {
            text: 'Espace DGCCRF',
            linkProps: {
              href: pagesDefs.connexion.url,
              target: '_self',
            },
          },
          {
            text: 'Info délai de rétractation',
            linkProps: {
              href: pagesDefs.delaiRetractation.url,
            },
          },
          {
            text: 'Info résolution de litige',
            linkProps: {
              href: pagesDefs.litige.url,
            },
          },
          {
            text: 'Actualités',
            linkProps: {
              href: pagesDefs.actualites.url,
            },
          },
          {
            text: 'Services Publics +',
            linkProps: {
              href: urlServicePublicPlus,
            },
          },
        ]}
      />
    </>
  )
}

function MinistryName() {
  return (
    <>
      Ministère <br /> de l'économie <br /> des finances <br /> et de la souveraineté <br /> industrielle et numérique
    </>
  )
}
function FollowUs() {
  // not in react-dsfr yet
  return (
    <div className="fr-follow">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-follow__social">
              <h2 className="fr-h5">
                Suivez-nous <br /> sur les réseaux sociaux
              </h2>
              <ul className="fr-btns-group">
                <li>
                  <Link
                    className="fr-btn--facebook fr-btn"
                    href="https://www.facebook.com/SignalConso/"
                    target="_blank"
                    title="Retrouvez nous sur Facebook - nouvelle fenêtre"
                  >
                    facebook
                  </Link>
                </li>
                <li>
                  <Link
                    className="fr-btn--twitter fr-btn"
                    href="https://twitter.com/SignalConso"
                    target="_blank"
                    title="Retrouvez nous sur Twitter - nouvelle fenêtre"
                  >
                    twitter
                  </Link>
                </li>
                <li>
                  <Link
                    className="fr-btn--instagram fr-btn"
                    href="https://www.instagram.com/dgccrf_off/"
                    target="_blank"
                    title="Retrouvez la répression des fraudes sur Instagram - nouvelle fenêtre"
                  >
                    instagram
                  </Link>
                </li>
                <li>
                  <Link
                    className="fr-btn--linkedin fr-btn"
                    href="https://www.linkedin.com/company/dgccrf/"
                    target="_blank"
                    title="Retrouvez la répression des fraudes sur LinkedIn - nouvelle fenêtre"
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
