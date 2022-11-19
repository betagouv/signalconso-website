/** @type {import('next').NextConfig} */

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

const ContentSecurityPolicy = `
  default-src 'self';
  connect-src *.cleverapps.io;
  worker-src *.cleverapps.io blob:;
  script-src 'self';
  img-src 'self' data: *.cleverapps.io *.cellar-c2.services.clever-cloud.com;
  child-src 'self';
  style-src 'unsafe-inline';
  font-src https://fonts.gstatic.com;
  report-uri /csp-violation-report-endpoint/  
`

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
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]

module.exports = withTM({
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
})
