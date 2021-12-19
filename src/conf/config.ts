// Env variables must start with 'REACT_APP_' to be considered by CreateReactApp
import {env} from '@alexandreannic/ts-utils/lib/common/env/Env'
import {defaultValue, int} from '@alexandreannic/ts-utils/lib/common/env/EnvParser'

enum Env {
  NODE_ENV = 'NODE_ENV',
  API_BASE_URL = 'API_BASE_URL',
  APP_BASE_URL = 'APP_BASE_URL',
  BASE_PATH = 'BASE_PATH',
  UPLOAD_MAX_SIZE_MB = 'UPLOAD_MAX_SIZE_MB',
  SENTRY_DNS = 'SENTRY_DNS',
  SENTRY_TRACE_RATE = 'SENTRY_TRACE_RATE',
  REPONSECONSO_DISPLAY_PERCENTAGE = 'REPONSECONSO_DISPLAY_PERCENTAGE',
  REPONSECONSO_BASE_URL = 'REPONSECONSO_BASE_URL',
}

const parseUrl = (_: string): string => _.replace(/\/$/, '')

export const config = {
  isDev: env()(Env.NODE_ENV) === 'development',
  apiBaseUrl: env(defaultValue('http://localhost:9000'), parseUrl)(Env.API_BASE_URL),
  appBaseUrl: env(defaultValue('http://localhost:4200'), parseUrl)(Env.APP_BASE_URL),
  basePath: env(defaultValue('/'))(Env.BASE_PATH),
  upload_allowedExtensions: ['jpg', 'jpeg', 'pdf', 'png', 'gif', 'docx'],
  reponseConsoDisplayRate: env(int, defaultValue(100))(Env.REPONSECONSO_DISPLAY_PERCENTAGE),
  reponseConsoForwardUrl: (id: string) => env(defaultValue('https://reclamation.conso.gouv.fr'))(Env.REPONSECONSO_BASE_URL).replace('\/$', '') + `/${id}`,
  upload_maxSizeMb: env(int, defaultValue(5))(Env.UPLOAD_MAX_SIZE_MB),
  contactEmail: 'support@signal.conso.gouv.fr',
  sentry_dns: env()(Env.SENTRY_DNS),
  sentry_traceRate: env(int, defaultValue(0.5))(Env.SENTRY_TRACE_RATE),
  useHashRouter: true,
}

export type Config = typeof config;

console.info(config)
