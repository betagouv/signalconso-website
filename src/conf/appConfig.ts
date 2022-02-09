// Env variables must start with 'REACT_APP_' to be considered by CreateReactApp
import {env as _env} from '@alexandreannic/ts-utils/lib/common/env/Env'
import {defaultValue, int} from '@alexandreannic/ts-utils/lib/common/env/EnvParser'
import {Enum} from '../../../../ts-utils'

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

const env: {[key in Env]: string | undefined} = {
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB: process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB,
  NEXT_PUBLIC_SENTRY_DNS: process.env.NEXT_PUBLIC_SENTRY_DNS,
  NEXT_PUBLIC_SENTRY_TRACE_RATE: process.env.NEXT_PUBLIC_SENTRY_TRACE_RATE,
  NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE: process.env.NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE,
  NEXT_PUBLIC_REPONSECONSO_BASE_URL: process.env.NEXT_PUBLIC_REPONSECONSO_BASE_URL,
}

const map = _env(env)

const parseUrl = (_: string): string => _.replace(/\/$/, '')

export const appConfig = {
  isDev: map()(Env.NEXT_PUBLIC_NODE_ENV) === 'development',
  apiBaseUrl: map(defaultValue('http://localhost:9000'), parseUrl)(Env.NEXT_PUBLIC_API_BASE_URL),
  appBaseUrl: map(defaultValue('http://localhost:4200'), parseUrl)(Env.NEXT_PUBLIC_APP_BASE_URL),
  basePath: map(defaultValue('/'))(Env.NEXT_PUBLIC_BASE_PATH),
  upload_allowedExtensions: ['jpg', 'jpeg', 'pdf', 'png', 'gif', 'docx'],
  reponseConsoDisplayRate: map(int, defaultValue(100))(Env.NEXT_PUBLIC_REPONSECONSO_DISPLAY_PERCENTAGE),
  reponseConsoForwardUrl: (id: string) => map(defaultValue('https://reclamation.conso.gouv.fr'))(Env.NEXT_PUBLIC_REPONSECONSO_BASE_URL).replace('\/$', '') + `/${id}`,
  upload_maxSizeMb: map(int, defaultValue(5))(Env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB),
  contactEmail: 'support@signal.conso.gouv.fr',
  sentry_dns: map()(Env.NEXT_PUBLIC_SENTRY_DNS),
  sentry_traceRate: map(int, defaultValue(0.5))(Env.NEXT_PUBLIC_SENTRY_TRACE_RATE),
  useHashRouter: true,
  reportDateFormat: 'dd/MM/yyyy'
}

export type AppConfig = typeof appConfig;

console.info(appConfig)
