/** @type {import("next").NextConfig} */

// TRELLO-1393 the published files of react-hook-form seem not to be transpiled
// to a low enough version of javascript
// They use the object spread syntax { ... }, not supported by Safari 10
const withTM = require('next-transpile-modules')(['react-hook-form'])

const hostsToRedirect = ['www.signal.conso.gouv.fr', 'signalconso.beta.gouv.fr', 'www.signalconso.beta.gouv.fr']
const redirects = hostsToRedirect.map(host => ({
  source: '/:path*',
  has: [{type: 'host', value: host}],
  destination: 'https://signal.conso.gouv.fr/:path*',
  permanent: true,
}))

//TRELLO-1522 : Implement security headers as DGCCRF is monitoring the website via https://observatory.mozilla.org/
// See https://nextjs.org/docs/advanced-features/security-headers for implementation details

const CommonContentSecurityPolicy = [
  `default-src 'self' *.aticdn.net *.data.gouv.fr;`,
  `connect-src 'self' *.sentry.io *.data.gouv.fr ${process.env.NEXT_PUBLIC_API_BASE_URL} ${process.env.NEXT_PUBLIC_COMPANY_API_BASE_URL};`,
  `worker-src \'self\' ${process.env.NEXT_PUBLIC_API_BASE_URL} ${process.env.NEXT_PUBLIC_COMPANY_API_BASE_URL} blob:;`,
  `img-src 'self' data: ${process.env.NEXT_PUBLIC_APP_BASE_URL} ${process.env.NEXT_PUBLIC_API_BASE_URL} *.cellar-c2.services.clever-cloud.com *.xiti.com;`,
  `frame-src *.data.gouv.fr/ https://www.youtube-nocookie.com;`,
  `frame-ancestors 'self';`,
  `child-src 'self';`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com blob:;`,
  `font-src https://fonts.gstatic.com;`,
  `report-uri /csp-violation-report-endpoint/;`,
]

const ContentSecurityPolicy =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? CommonContentSecurityPolicy.concat([
        //https://github.com/vercel/next.js/issues/14221 need unsafe eval for next js to work in dev env...
        `script-src 'self' 'unsafe-eval';`,
      ])
    : CommonContentSecurityPolicy

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

module.exports = withTM({
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
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
})
