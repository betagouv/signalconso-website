import {fetchSearchAnalyticsData} from "./client/google.client.js";

// if (Config.oneSignalEnablePush) {
//   console.log('Push notifications are enabled')
//   // Every day at 9AM UTC
//   // Rappel conso is sending new item every hour
//   cron.schedule('0 9 * * *', fetchAndExtractRappelConso)
// } else {
//   console.log('Push notifications are disabled, nothing to schedule.')
// }


const req = {
  startDate: '2025-01-01',
  endDate: '2025-02-06',
  contains: ["https://signal.conso.gouv.fr/fr/"],
  notContains: ["/actualites",
    "/faire-un-signalement",
    "/comment-ca-marche",
    "/plan-du-site",
    "/accessibilite",
    "/litige",
    "/centre-aide",
    "/cookies",
    "/qui-sommes-nous"]
}


fetchSearchAnalyticsData(req)