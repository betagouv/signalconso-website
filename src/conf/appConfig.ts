// Env variables must start with 'REACT_APP_' to be considered by CreateReactApp
import {env as _env} from '@alexandreannic/ts-utils/lib/common/env/Env'
import {defaultValue, int} from '@alexandreannic/ts-utils/lib/common/env/EnvParser'

enum Env {
  NEXT_PUBLIC_NODE_ENV = 'NEXT_PUBLIC_NODE_ENV',
  NEXT_PUBLIC_API_BASE_URL = 'NEXT_PUBLIC_API_BASE_URL',
  NEXT_PUBLIC_APP_BASE_URL = 'NEXT_PUBLIC_APP_BASE_URL',
  NEXT_PUBLIC_BASE_PATH = 'NEXT_PUBLIC_BASE_PATH',
  NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB = 'NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB',
  NEXT_PUBLIC_SENTRY_DNS = 'NEXT_PUBLIC_SENTRY_DNS',
  NEXT_PUBLIC_SENTRY_TRACE_RATE = 'NEXT_PUBLIC_SENTRY_TRACE_RATE',
  NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE = 'NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE',
  NEXT_PUBLIC_REPONSECONSO_BASE_URL = 'NEXT_PUBLIC_REPONSECONSO_BASE_URL',
}

const env = _env(process.env)

const parseUrl = (_: string): string => _.replace(/\/$/, '')

export const appConfig = {
  isDev: env()(Env.NEXT_PUBLIC_NODE_ENV) === 'development',
  apiBaseUrl: env(defaultValue('http://localhost:9000'), parseUrl)(Env.NEXT_PUBLIC_API_BASE_URL),
  appBaseUrl: env(defaultValue('http://localhost:4200'), parseUrl)(Env.NEXT_PUBLIC_APP_BASE_URL),
  basePath: env(defaultValue('/'))(Env.NEXT_PUBLIC_BASE_PATH),
  upload_allowedExtensions: ['jpg', 'jpeg', 'pdf', 'png', 'gif', 'docx'],
  reponseConsoDisplayRate: env(int, defaultValue(100))(Env.NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE),
  reponseConsoForwardUrl: (id: string) => env(defaultValue('https://reclamation.conso.gouv.fr'))(Env.NEXT_PUBLIC_REPONSECONSO_BASE_URL).replace('\/$', '') + `/${id}`,
  upload_maxSizeMb: env(int, defaultValue(5))(Env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB),
  contactEmail: 'support@signal.conso.gouv.fr',
  sentry_dns: env()(Env.NEXT_PUBLIC_SENTRY_DNS),
  sentry_traceRate: env(int, defaultValue(0.5))(Env.NEXT_PUBLIC_SENTRY_TRACE_RATE),
  useHashRouter: true,
  reportDateFormat: 'dd/MM/yyyy'
}

export type AppConfig = typeof appConfig;

console.info(appConfig)
