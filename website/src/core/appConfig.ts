function noTrailingSlash(str: string) {
  return str.replace(/\/$/, '')
}

function readInt(str: string | undefined, defaultValue: number) {
  return str === undefined ? defaultValue : parseInt(str, 10)
}

function readBool(str: string | undefined) {
  return str === 'true'
}

const severities = ['info', 'warning', 'error', 'success'] as const
type Severity = (typeof severities)[number]

function readSeverity(severity?: string): Severity | null {
  if (severity && severities.includes(severity as any)) {
    return severity as Severity
  }
  return null
}

export const appConfig = {
  siretExtractorUrl: noTrailingSlash(process.env.NEXT_PUBLIC_SIRET_EXTRACTOR_BASE_URL ?? 'http://localhost:8089'),
  apiCompanyUrl: noTrailingSlash(process.env.NEXT_PUBLIC_COMPANY_API_BASE_URL ?? 'http://localhost:9001'),
  apiAdresseUrl: 'https://api-adresse.data.gouv.fr',
  stationApiUrl: 'https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/gares-de-voyageurs',
  rappelConsoUrl: 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso0',
  isDev: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
  envMarker: process.env.NEXT_PUBLIC_ENV_MARKER,
  showOutilsInternes: readBool(process.env.NEXT_PUBLIC_SHOW_PLAYGROUND),
  showDemoCategory: readBool(process.env.NEXT_PUBLIC_SHOW_DEMO_CATEGORY),
  apiBaseUrl: noTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:9000'),
  websiteBaseUrl: noTrailingSlash(process.env.NEXT_PUBLIC_APP_BASE_URL ?? 'http://localhost:3001'),
  dashboardBaseUrl: noTrailingSlash(process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL ?? 'http://localhost:3000'),
  upload_allowedExtensions: ['.jpg', '.jpeg', '.pdf', '.png', '.gif', '.docx', '.heic'],
  reponseConsoDisplayRate: readInt(process.env.NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE, 100),
  upload_maxSizeMb: readInt(process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB, 5),
  contactEmail: 'support@signal.conso.gouv.fr',
  sentry_dns: process.env.NEXT_PUBLIC_SENTRY_DNS,
  sentry_traceRate: readInt(process.env.NEXT_PUBLIC_SENTRY_TRACE_RATE, 1),
  enableMatomo: readBool(process.env.NEXT_PUBLIC_ENABLE_MATOMO),
  enableEularian: readBool(process.env.NEXT_PUBLIC_ENABLE_EULARIAN),
  maxDescriptionInputLength: 5000,
  infoBanner: process.env.NEXT_PUBLIC_INFO_BANNER,
  infoBannerSeverity: readSeverity(process.env.NEXT_PUBLIC_INFO_BANNER_SEVERITY) ?? 'warning',
  // Used only to regenerate the landing page from Airtable
  // thus no need to configure anywhere but in dev
  airtableApiToken: process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN ?? null,
  maxNumberOfAttachments: readInt(process.env.NEXT_PUBLIC_MAX_NUMBER_OF_ATTACHMENTS, 12),
  anonMetabaseUrl: `https://metabase-publicstats-signalconso.cleverapps.io`,
  iosAppUrl: 'https://apps.apple.com/fr/app/signalconso/id6447964093',
  androidAppUrl: 'https://play.google.com/store/apps/details?id=com.signalconso.signalconso',
}

export type AppConfig = typeof appConfig
