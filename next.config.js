/** @type {import('next').NextConfig} */

// TRELLO-1393 the published files of react-hook-form seem not to be transpiled
// to a low enough version of javascript
// They use the object spread syntax { ... }, not supported by Safari 10
const withTM = require('next-transpile-modules')(['react-hook-form'])

module.exports = withTM({
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
})
