import Link from 'next/link'
import {FacebookIcon, TwitterIcon} from 'mui-extension/lib'
import {useTheme} from '@mui/material'

export const Footer = () => {
  const theme = useTheme()
  return (
    <footer style={{
      padding: theme.spacing(3),
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    }}>
      <section className="section-small bg-secondary">
        <strong>SignalConso</strong>
        <a href="https://www.economie.gouv.fr/dgccrf" target="_blank" rel="noreferrer" title="Un service proposé par la DGCCRF (nouvelle fenêtre)">
          Un service proposé par la <abbr title="Direction Général de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>
        </a>
        <ul className="footer__social d-none d-lg-block">
          <li>
            <a href="https://twitter.com/SignalConso" target="_blank" rel="noreferrer" title="Retrouvez-nous sur Twitter (nouvelle fenêtre)">
              <TwitterIcon title="Twitter"/>
              <span className="d-none">Twitter</span>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/SignalConso/" target="_blank" rel="noreferrer" title="Retrouvez-nous sur Facebook (nouvelle fenêtre)">
              <FacebookIcon title="Facebook"/>
              <span className="d-none">Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://www.economie.gouv.fr/dgccrf" target="_blank" rel="noreferrer" title="Accédez au site de la DGCCRF (nouvelle fenêtre)">
              <img alt="Logo de la Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes" src="/assets/images/logo-dgccrf.png"
                   loading="lazy"/>
            </a>
          </li>
        </ul>
        <div className="col-12 col-lg-3">
          <ul className="footer__links">
            <li>
              <Link href="/conditions-generales-utilisation/consommateur">
                <a title="Conditions générales d'utilisation (nouvelle fenêtre)" target="_blank">
                  Conditions générales d'utilisation
                </a>
              </Link>

            </li>
            <li>
              <Link href="/accessibilite">
                <a title="Accessibilité">Accessibilité (partiellement conforme)</a>
              </Link>
            </li>
            <li>
              <Link href="/plan-du-site">
                <a title="Plan du site">Plan du site</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-12 col-lg-3">
          <ul className="footer__links">
            <li>
              <Link href="/qui-sommes-nous">
                <a>Qui sommes-nous ?</a>
              </Link>
            </li>
            <li>
              <Link href="/dgccrf">
                <a>Espace DGCCRF</a>
              </Link>
            </li>
            <li>
              <Link href="/stats">
                <a>Statistiques</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  )
}
