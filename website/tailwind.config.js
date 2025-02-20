/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // Override tailwinds breakpoints with the one from the DSFR
      // https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/grille-et-points-de-rupture
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
    },
    extend: {
      colors: {
        sclightblue: '#2b7c9f', // old blue from the old design, still in the logo
        scbluefrance: '#000091',
        scdarkblue: '#1e2b50',
        sclightpurple: '#e3e3fd', // the background of the HP
        sclightpurpledarker: '#cacafb', // slight variant from the previous one
        scpurplepop: '#6a6af4', // purple quite strong, pops out a bit
        scorange: '#EA9001', // orange from the logo

        schint: '#656565',
        scredinputerror: '#ce0500', // from the DSFR, when inputs are in error

        // these colors come directly from the DSFR badges
        // https://storybook.systeme-de-design.gouv.fr/?path=/docs/badge--docs&globals=viewport:lg
        // used for the alerts and helper texts
        sclightblueinfo: '#e8edff',
        scblueinfo: '#0063cb',
        sclightgreensuccess: '#b8fec9',
        scgreensuccess: '#16753c',
        sclightrederror: '#ffe9e9',
        screderror: '#ce0601',
        // for the warning we don't follow the DSFR, we prefer something more orange
        sclightorangewarn: '#ffe1d1',
        scorangewarn: '#ea580c',
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
  corePlugins: {
    // disable the CSS reset from Tailwind
    // thus we can inherit default styles from the DSFR on h1 etc.
    preflight: false,
  },
}
