import {readFileSync} from 'fs'

export interface Health {
  name: string
  version: string
  gitCommit: string
  buildTime: string
}

export type BuildInfo = Omit<Health, 'name'>

export const unknownBuildInfo: BuildInfo = {version: 'unknown', gitCommit: 'unknown', buildTime: 'unknown'}

/**
 * Lit le fichier build/buildinfo.json généré par scripts/buildinfo.mjs lors du `yarn build`
 */
export const readBuildInfo = (url: URL): BuildInfo => {
  try {
    return {...unknownBuildInfo, ...JSON.parse(readFileSync(url, 'utf-8'))}
  } catch {
    console.warn(`[health]: Unable to read build info at ${url}`)
    return unknownBuildInfo
  }
}

export const health = (buildInfo: BuildInfo): Health => ({
  name: 'signalconso-mobile-tools',
  ...buildInfo,
})
