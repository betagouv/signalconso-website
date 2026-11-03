/**
 * Génère build/buildinfo.json (version, commit git, date de build), exposé par la route de health check.
 * Même logique que le BuildInfoPlugin des projets Scala : COMMIT_ID, sinon `git rev-parse HEAD`, sinon "unknown".
 */
import {execSync} from 'child_process'
import {mkdirSync, readFileSync, writeFileSync} from 'fs'

const gitCommit = () => {
  if (process.env.COMMIT_ID) {
    return process.env.COMMIT_ID
  }
  try {
    return (
      execSync('git rev-parse HEAD', {stdio: ['ignore', 'pipe', 'ignore']})
        .toString()
        .trim() || 'unknown'
    )
  } catch {
    return 'unknown'
  }
}

const {version} = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'))

const buildInfo = {
  version,
  gitCommit: gitCommit(),
  buildTime: new Date().toISOString(),
}

mkdirSync(new URL('../build/', import.meta.url), {recursive: true})
writeFileSync(new URL('../build/buildinfo.json', import.meta.url), JSON.stringify(buildInfo, null, 2))
console.log('[buildinfo]:', buildInfo)
