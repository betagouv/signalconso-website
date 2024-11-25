function noTrailingSlash(str: string) {
  return str.replace(/\/$/, '')
}

export const Config = {
  port: process.env.MOBILE_HELPERS_PORT,
  dgccrfRSSUrl: noTrailingSlash(process.env.DGCCRF_RSS_URL ?? ''),
  rappelConsoUrl: noTrailingSlash(process.env.RAPPELCONSO_URL ?? ''),
  fetchTimeout: parseInt(process.env.MOBILE_HELPERS_FETCH_TIMEOUT ?? '5000'),
  oneSignalUrl: process.env.ONE_SIGNAL_URL ?? '',
  oneSignalEnablePush: process.env.ONE_SIGNAL_ENABLE_PUSH === 'true',
  oneSignalAppId: process.env.ONE_SIGNAL_APP_ID ?? '',
  oneSignaleApiKey: process.env.ONE_SIGNAL_API_KEY ?? '',
  websiteUrl: process.env.WEBSITE_URL ?? '',
}
