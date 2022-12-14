function noTrailingSlash(str: string) {
  return str.replace(/\/$/, '')
}

function readInt(str: string | undefined, defaultValue: number) {
  return str === undefined ? defaultValue : parseInt(str, 10)
}

function readBool(str: string | undefined) {
  return str === 'true'
}

export const appConfig = {
  apiCompanyUrl: noTrailingSlash(process.env.NEXT_PUBLIC_COMPANY_API_BASE_URL ?? 'http://localhost:9001'),
  apiAdresseUrl: 'https://api-adresse.data.gouv.fr',
  isDev: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
  showPlayground: readBool(process.env.NEXT_PUBLIC_SHOW_PLAYGROUND),
  showDemoCategory: readBool(process.env.NEXT_PUBLIC_SHOW_DEMO_CATEGORY),
  apiBaseUrl: noTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:9000'),
  appBaseUrl: noTrailingSlash(process.env.NEXT_PUBLIC_APP_BASE_URL ?? 'http://localhost:4200'),
  dashboardBaseUrl: noTrailingSlash(process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL ?? 'http://localhost:3000'),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '/',
  upload_allowedExtensions: ['jpg', 'jpeg', 'pdf', 'png', 'gif', 'docx'],
  reponseConsoDisplayRate: readInt(process.env.NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE, 100),
  upload_maxSizeMb: readInt(process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB, 5),
  contactEmail: 'support@signal.conso.gouv.fr',
  sentry_dns: process.env.NEXT_PUBLIC_SENTRY_DNS,
  sentry_traceRate: readInt(process.env.NEXT_PUBLIC_SENTRY_TRACE_RATE, 1),
  matomo_siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
  matomo_url: process.env.NEXT_PUBLIC_MATOMO_URL,
  maxDescriptionInputLength: 1000,
  infoBanner: process.env.NEXT_PUBLIC_INFO_BANNER,
  infoBannerOnMobile: readBool(process.env.NEXT_PUBLIC_INFO_BANNER_ON_MOBILE),
  dummyEmailDomain: ['@yopmail.com'],
  atInternet_siteId: process.env.NEXT_PUBLIC_ATINTERNET_SITE_ID,
}

export type AppConfig = typeof appConfig
