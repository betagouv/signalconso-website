import {FacebookIcon} from '../alexlibs/mui-extension/icon/FacebookIcon'
import {TwitterIcon} from '../alexlibs/mui-extension/icon/TwitterIcon'
import {alpha, Box, Grid, Theme, useTheme} from '@mui/material'
import Link from 'next/link'
import {SxProps} from '@mui/system'
import {Section} from './Section'
import {siteMap} from '../core/siteMap'
import Image from 'next/image'

const sxList: SxProps<Theme> = {
  listStyle: 'none',
  mb: 1,
  '& > li': {
    color: t => alpha(t.palette.secondary.contrastText, 0.7),
    transition: t => t.transitions.create('all'),
    mb: 1,
    '&:hover': {
      color: t => t.palette.secondary.contrastText,
    },
  },
}

const iconHeight = 34

export const Footer = () => {
  const theme = useTheme()
  return (
    <>
      <Section
        component="footer"
        style={{
          background: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        <section className="section-small bg-secondary">
          <Grid container>
            <Grid item md={4}>
              <h3 className="text-white font-normal m-0">SignalConso</h3>
              <a
                style={{
                  color: alpha(theme.palette.secondary.contrastText, 0.7),
                }}
                href="https://www.economie.gouv.fr/dgccrf"
                target="_blank"
                rel="noreferrer"
                title="Un service proposé par la DGCCRF (nouvelle fenêtre)"
              >
                Un service proposé par la{' '}
                <Box
                  sx={{textDecoration: 'none', fontWeight: 'bold'}}
                  component="abbr"
                  title="Direction Général de la Concurrence, Consommation et Répression des Fraudes"
                >
                  DGCCRF
                </Box>
              </a>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  mt: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '& > li': {
                    transition: t => t.transitions.create('all'),
                    opacity: 0.6,
                    mr: 2,
                    '&:hover': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <li>
                  <a
                    href="https://twitter.com/SignalConso"
                    target="_blank"
                    rel="noreferrer"
                    title="Retrouvez-nous sur Twitter (nouvelle fenêtre)"
                  >
                    <TwitterIcon title="Twitter" style={{width: iconHeight, height: iconHeight}} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/SignalConso/"
                    target="_blank"
                    rel="noreferrer"
                    title="Retrouvez-nous sur Facebook (nouvelle fenêtre)"
                  >
                    <FacebookIcon title="Facebook" style={{width: iconHeight, height: iconHeight}} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.economie.gouv.fr/dgccrf"
                    target="_blank"
                    rel="noreferrer"
                    title="Accédez au site de la DGCCRF (nouvelle fenêtre)"
                  >
                    <Image
                      height={iconHeight}
                      width={70}
                      alt="Logo de la Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes"
                      src="/image/logo-dgccrf.png"
                      loading="lazy"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.plus.transformation.gouv.fr/"
                    target="_blank"
                    rel="noreferrer"
                    title="Accédez au site de la Direction interministérielle de la transformation publique (nouvelle fenêtre)"
                  >
                    <Image
                      height={iconHeight}
                      width={70}
                      alt="Logo de la Direction interministérielle de la transformation publique"
                      src="/image/service-publics.png"
                      loading="lazy"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.economie.gouv.fr/bercy-vert"
                    target="_blank"
                    rel="noreferrer"
                    title="Accédez au site de la Direction interministérielle de la transformation publique (nouvelle fenêtre)"
                  >
                    <Image
                      height={iconHeight + 4}
                      width={iconHeight + 4}
                      alt="Logo Bercy vert"
                      src="/image/logo-bercyvert-vector-BLANC.png"
                      loading="lazy"
                    />
                  </a>
                </li>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box component="ul" sx={sxList}>
                <li>
                  <Link href={siteMap.suiviEtViePrivee}>Suivi d'audience et vie privée</Link>
                </li>
                <li>
                  <Link href={siteMap.cookies}>Gestion des cookies</Link>
                </li>
                <li>
                  <Link
                    href={siteMap.conditionsGeneralesUtilisation}
                    title="Conditions générales d'utilisation (nouvelle fenêtre)"
                  >
                    Conditions générales d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.accessibilite} title="Accessibilité">
                    Accessibilité (partiellement conforme)
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.planDuSite} title="Plan du site">
                    Plan du site
                  </Link>
                </li>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box component="ul" sx={sxList}>
                <li>
                  <Link href={siteMap.quiSommesNous}>Qui sommes-nous ?</Link>
                </li>
                <li>
                  <Link href={siteMap.connexion}>Espace DGCCRF</Link>
                </li>
                <li>
                  <Link href={siteMap.stats}>Statistiques</Link>
                </li>
                <li>
                  <Link href={siteMap.contact}>Contact</Link>
                </li>
              </Box>
            </Grid>
          </Grid>
        </section>
      </Section>
    </>
  )
}
