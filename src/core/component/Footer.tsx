import {FacebookIcon, TwitterIcon} from '../../alexlibs/mui-extension'
import {alpha, Box, Grid, Theme, useTheme} from '@mui/material'
import Link from 'next/link'
import {SxProps} from '@mui/system'
import {Section} from './Section'
import {siteMap} from '../siteMap'

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
      {/*<Box sx={{*/}
      {/*  height: 8 * 3,*/}
      {/*  borderTopLeftRadius: '50%',*/}
      {/*  borderTopRightRadius: '50%',*/}
      {/*  background: theme.palette.secondary.main,*/}
      {/*}}>*/}
      {/*</Box>*/}
      <Section
        component="footer"
        style={{
          // padding: theme.spacing(3),
          // paddingTop: 0,
          background: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        <section className="section-small bg-secondary">
          <Grid container>
            <Grid item md={4}>
              <Box component="h3" sx={{m: 0, fontSize: 24}}>
                SignalConso
              </Box>
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
                    <img
                      style={{borderRadius: 2, height: iconHeight}}
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
                    <img
                      style={{borderRadius: 2, height: iconHeight}}
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
                    <img
                      style={{height: iconHeight + 4}}
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
                  <Link href={siteMap.suiviEtViePrivee}>
                    <a>Suivi d'audience et vie privée</a>
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.cookies}>
                    <a>Gestion des cookies</a>
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.conditionsGeneralesUtilisation}>
                    <a title="Conditions générales d'utilisation (nouvelle fenêtre)" target="_blank">
                      Conditions générales d'utilisation
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.accessibilite}>
                    <a title="Accessibilité">Accessibilité (partiellement conforme)</a>
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.planDuSite}>
                    <a title="Plan du site">Plan du site</a>
                  </Link>
                </li>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box component="ul" sx={sxList}>
                <li>
                  <Link href={siteMap.quiSommesNous}>
                    <a>Qui sommes-nous ?</a>
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.connexion}>
                    <a>Espace DGCCRF</a>
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.stats}>
                    <a>Statistiques</a>
                  </Link>
                </li>
                <li>
                  <Link href={siteMap.contact}>
                    <a>Contact</a>
                  </Link>
                </li>
              </Box>
            </Grid>
          </Grid>
        </section>
      </Section>
    </>
  )
}
