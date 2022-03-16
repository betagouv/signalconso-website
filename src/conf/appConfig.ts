// Env variables must start with 'REACT_APP_' to be considered by CreateReactApp
import {env as _env} from '@alexandreannic/ts-utils/lib/common/env/Env'
import {bool, defaultValue, int} from '@alexandreannic/ts-utils/lib/common/env/EnvParser'

enum Env {
  NEXT_PUBLIC_SHOW_PLAYGROUND = 'NEXT_PUBLIC_SHOW_PLAYGROUND',
  NEXT_PUBLIC_NODE_ENV = 'NEXT_PUBLIC_NODE_ENV',
  NEXT_PUBLIC_API_BASE_URL = 'NEXT_PUBLIC_API_BASE_URL',
  NEXT_PUBLIC_APP_BASE_URL = 'NEXT_PUBLIC_APP_BASE_URL',
  NEXT_PUBLIC_DASHBOARD_BASE_URL = 'NEXT_PUBLIC_DASHBOARD_BASE_URL',
  NEXT_PUBLIC_BASE_PATH = 'NEXT_PUBLIC_BASE_PATH',
  NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB = 'NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB',
  NEXT_PUBLIC_SENTRY_DNS = 'NEXT_PUBLIC_SENTRY_DNS',
  NEXT_PUBLIC_SENTRY_TRACE_RATE = 'NEXT_PUBLIC_SENTRY_TRACE_RATE',
  NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE = 'NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE',
  NEXT_PUBLIC_MATOMO_SITE_ID = 'NEXT_PUBLIC_MATOMO_SITE_ID',
  NEXT_PUBLIC_MATOMO_URL = 'NEXT_PUBLIC_MATOMO_URL',
}

const persistedTempEnvVariablesForFront: {[key in Env]: string | undefined} = {
  NEXT_PUBLIC_SHOW_PLAYGROUND: process.env.NEXT_PUBLIC_SHOW_PLAYGROUND,
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  NEXT_PUBLIC_DASHBOARD_BASE_URL: process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB: process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB,
  NEXT_PUBLIC_SENTRY_DNS: process.env.NEXT_PUBLIC_SENTRY_DNS,
  NEXT_PUBLIC_SENTRY_TRACE_RATE: process.env.NEXT_PUBLIC_SENTRY_TRACE_RATE,
  NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE: process.env.NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE,
  NEXT_PUBLIC_MATOMO_SITE_ID: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
  NEXT_PUBLIC_MATOMO_URL: process.env.NEXT_PUBLIC_MATOMO_URL,
}

const map = _env(persistedTempEnvVariablesForFront)

const parseUrl = (_: string): string => _.replace(/\/$/, '')

export const appConfig = {
  isDev: map()(Env.NEXT_PUBLIC_NODE_ENV) === 'development',
  showPlayground: map(bool, defaultValue(false))(Env.NEXT_PUBLIC_SHOW_PLAYGROUND),
  apiBaseUrl: map(defaultValue('http://localhost:9000'), parseUrl)(Env.NEXT_PUBLIC_API_BASE_URL),
  appBaseUrl: map(defaultValue('http://localhost:4200'), parseUrl)(Env.NEXT_PUBLIC_APP_BASE_URL),
  dashboardBaseUrl: map(defaultValue('http://localhost:3000'), parseUrl)(Env.NEXT_PUBLIC_DASHBOARD_BASE_URL),
  basePath: map(defaultValue('/'))(Env.NEXT_PUBLIC_BASE_PATH),
  upload_allowedExtensions: ['jpg', 'jpeg', 'pdf', 'png', 'gif', 'docx'],
  reponseConsoDisplayRate: map(int, defaultValue(100))(Env.NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE),
  upload_maxSizeMb: map(int, defaultValue(5))(Env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB),
  contactEmail: 'support@signal.conso.gouv.fr',
  sentry_dns: map()(Env.NEXT_PUBLIC_SENTRY_DNS),
  sentry_traceRate: map(int, defaultValue(0.5))(Env.NEXT_PUBLIC_SENTRY_TRACE_RATE),
  matomo_siteId: map()(Env.NEXT_PUBLIC_MATOMO_SITE_ID),
  matomo_url: map()(Env.NEXT_PUBLIC_MATOMO_URL),
  useHashRouter: true,
  apiDateFormat: 'dd/MM/yyyy',
  browserDateFormat: 'yyyy-MM-dd',
  maxDescriptionInputLength: 500,
  dummyEmailDomain: ['@yopmail.com'],
}

export type AppConfig = typeof appConfig;

console.info(appConfig)
