import {Footer} from '@codegouvfr/react-dsfr/Footer'
import Link from 'next/link'
import {siteMap} from '../core/siteMap'
import {MinistryName} from './ScHeader'

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
        websiteMapLinkProps={{href: siteMap.planDuSite}}
        accessibility="partially compliant"
        accessibilityLinkProps={{href: siteMap.accessibilite}}
        termsLinkProps={{href: siteMap.conditionsGeneralesUtilisation}}
        homeLinkProps={{href: '/', title: 'Accueil - SignalConso'}}
        personalDataLinkProps={{href: siteMap.suiviEtViePrivee}}
        cookiesManagementLinkProps={{href: siteMap.cookies}}
        bottomItems={[
          {
            text: 'Espace DGCCRF',
            linkProps: {
              href: siteMap.connexion,
            },
          },
          {
            text: 'Infos délai de rétractation',
            linkProps: {
              href: siteMap.delaiRetractation,
            },
          },
          {
            text: 'Info résolution de litige',
            linkProps: {
              href: siteMap.litige,
            },
          },
        ]}
      />
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
