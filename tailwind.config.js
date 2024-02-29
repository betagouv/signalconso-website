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
        scorange: '#EA9001', // orange from the logo
        sclightblueinfo: '#e8edff', // used for the blue helper texts
        scblueinfo: '#0063cb', // used for the blue helper texts
        schint: '#656565',
        scerrorred: '#ce0500', // from the DSFR, when inputs are in error
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
