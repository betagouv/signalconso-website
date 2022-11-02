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
  permanent: false, // TODO set true when we confirmed it's working properly
}))

module.exports = withTM({
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  async redirects() {
    return redirects
  },
})
