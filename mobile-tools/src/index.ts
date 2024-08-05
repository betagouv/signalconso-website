import {Config} from './config/config.js'
import cron from 'node-cron'
import {fetchAndExtractRappelConso} from './services/rappelconso.service.js'
import {app} from './app.js'

if (Config.oneSignalEnablePush) {
  console.log('Push notifications are enabled')
  // Every day at 9AM UTC
  // Rappel conso is sending new item every hour
  cron.schedule('0 9 * * *', fetchAndExtractRappelConso)
} else {
  console.log('Push notifications are disabled, nothing to schedule.')
}

const port = Config.port

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
