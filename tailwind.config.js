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
  },
  plugins: [],
  corePlugins: {
    // disable the CSS reset from Tailwind
    // thus we can inherit default styles from the DSFR on h1 etc.
    preflight: false,
  },
}
