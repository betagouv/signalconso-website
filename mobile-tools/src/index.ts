import {Config} from './config/config.js'
import cron from 'node-cron'
import {fetchAndExtractRappelConso} from './services/rappelconso.service.js'
import {app} from './app.js'
import {readBuildInfo} from './services/health.service.js'

if (Config.oneSignalEnablePush) {
  console.log('Push notifications are enabled')
  // Every day at 9AM UTC
  // Rappel conso is sending new item every hour
  cron.schedule('0 9 * * *', fetchAndExtractRappelConso)
} else {
  console.log('Push notifications are disabled, nothing to schedule.')
}

app.locals.buildInfo = readBuildInfo(new URL('./buildinfo.json', import.meta.url))

const port = Config.port

app.listen(port, () => {
  console.log(
    `[server]: Server v${app.locals.buildInfo.version} (${app.locals.buildInfo.gitCommit}) is running at http://localhost:${port}`,
  )
})
