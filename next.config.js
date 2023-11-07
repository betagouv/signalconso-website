/** @type {import("next").NextConfig} */

const hostsToRedirect = ['www.signal.conso.gouv.fr', 'signalconso.beta.gouv.fr', 'www.signalconso.beta.gouv.fr']
const redirectsFromOtherHosts = hostsToRedirect.map(host => ({
  source: '/:path*',
  has: [{type: 'host', value: host}],
  destination: 'https://signal.conso.gouv.fr/:path*',
  permanent: true,
}))

function redirectsToDashboard(page) {
  return {
    source: `/${page}`,
    destination: `${process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL}/${page}`,
    permanent: true,
  }
}

const centreAideCrisp = `https://aide.signal.conso.gouv.fr`
const redirectsForCentreAide = [
  {
    source: `/fr/centre-aide`,
    destination: centreAideCrisp,
    permanent: true,
  },
  {
    source: `/en/centre-aide`,
    destination: centreAideCrisp,
    permanent: true,
  },
]

// these pages have been moved
const changedPaths = [
  ['/news', '/actualites'],
  ['/index.html', '/'],
  ['/comment-%C3%A7a-marche', '/comment-ca-marche'],
  [
    '/news/signalconso-desormais-disponible-en-application-mobile',
    '/actualites/signalconso-desormais-disponible-en-application-mobile',
  ],
  ['/fr/app-mobile', '/fr/actualites/signalconso-desormais-disponible-en-application-mobile'],
  ['/en/app-mobile', '/en/actualites/signalconso-mobile-app-available'],
  ['/d%C3%A9marchage-t%C3%A9l%C3%A9phonique', '/demarchage-telephonique'],
  ['/pompe-%C3%A0-chaleur-pac', '/pompe-a-chaleur-pac'],
]

const redirectsForChangedPaths = changedPaths.map(([source, destination]) => ({
  source,
  destination,
  permanent: true,
}))

const redirects = [
  ...redirectsFromOtherHosts,
  ...redirectsForChangedPaths,
  redirectsToDashboard('connexion'),
  redirectsToDashboard('activation'),
  ...redirectsForCentreAide,
]

//TRELLO-1522 : Implement security headers as DGCCRF is monitoring the website via https://observatory.mozilla.org/
// See https://nextjs.org/docs/advanced-features/security-headers for implementation details

const ContentSecurityPolicy = [
  `default-src 'self' *.aticdn.net *.data.gouv.fr;`,
  `script-src 'self' *.signal.conso.gouv.fr *.data.gouv.fr *.twitter.com 'unsafe-inline' 'unsafe-eval';`,
  `connect-src 'self' *.sentry.io *.data.gouv.fr ${process.env.NEXT_PUBLIC_API_BASE_URL} ${process.env.NEXT_PUBLIC_COMPANY_API_BASE_URL} ${process.env.NEXT_PUBLIC_SIRET_EXTRACTOR_BASE_URL};`,
  `worker-src \'self\' ${process.env.NEXT_PUBLIC_API_BASE_URL} ${process.env.NEXT_PUBLIC_COMPANY_API_BASE_URL} ${process.env.NEXT_PUBLIC_SIRET_EXTRACTOR_BASE_URL} blob:;`,
  `img-src 'self' data: ${process.env.NEXT_PUBLIC_APP_BASE_URL} ${process.env.NEXT_PUBLIC_API_BASE_URL} *.cellar-c2.services.clever-cloud.com *.twitter.com *.xiti.com;`,
  `frame-src *.data.gouv.fr/ *.twitter.com https://www.youtube-nocookie.com;`,
  `frame-ancestors 'self';`,
  `child-src 'self';`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com blob:;`,
  `font-src 'self' https://fonts.gstatic.com;`,
  `report-uri /csp-violation-report-endpoint/;`,
]

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.join(' '),
  },
]

module.exports = {
  images: {
    domains: ['monavis.numerique.gouv.fr'],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  async redirects() {
    return redirects
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  experimental: {
    appDir: true,
  },
  transpilePackages: [
    '@codegouvfr/react-dsfr',
    // TRELLO-1393 the published files of react-hook-form seem not to be transpiled
    // to a low enough version of javascript
    // They use the object spread syntax { ... }, not supported by Safari 10
    'react-hook-form',
  ],
  // Required by @codegouvfr/react-dsfr install doc
  webpack: config => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: 'asset/resource',
    })
    return config
  },
}
