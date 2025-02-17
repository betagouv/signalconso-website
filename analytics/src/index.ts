import {fetchQueryAnalyticsData, fetchSearchAnalyticsData} from "./client/google.client.js";
import {clearTable, read, start} from "./client/airtable.client.js";
import {AirtableAnalyticsData, SearchAnalyticsRequest} from "./models/model.js";
import {getLastNCompleteMonthRanges} from "./date.utils.js";


const dateRanges = getLastNCompleteMonthRanges(6);

const oldestDate = dateRanges.sort((a, b) => {
  const dateA = new Date(a.startDate).getTime();
  const dateB = new Date(b.startDate).getTime();
  return dateA - dateB;
})[0].startDate;

const requests = dateRanges.map(d =>
  ({
    startDate: d.startDate,
    endDate: d.endDate,
    contains: ["https://signal.conso.gouv.fr/fr/"],
    notContains: ["/actualites",
      "/faire-un-signalement",
      "/comment-ca-marche",
      "/plan-du-site",
      "/accessibilite",
      "/litige",
      "/delai-de-retractation",
      "/centre-aide",
      "/suivi-et-vie-privee",
      "/conditions-generales-utilisation",
      "/docs",
      "/stats",
      "/contact",
      "/cookies",
      "/qui-sommes-nous"]
  })
)

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAllSearchAnalyticsData(requests: SearchAnalyticsRequest[], existingLines: AirtableAnalyticsData[]) {
  const results: Awaited<AirtableAnalyticsData>[] = [];

  await Promise.all(
    requests.map(async req => {
      try {
        const res = await fetchSearchAnalyticsData(req);

        const transformedRows: Awaited<AirtableAnalyticsData | null>[] = await Promise.all(
          res.rows.flatMap(async row => {
            try {

              if (existingLines.find((v) => {
                return v.page === row.keys[0] && v.date === req.startDate;
              })) {
                return null;
              } else {

                const queryData = await delay(1000).then(_ => fetchQueryAnalyticsData({...req, page: row.keys[0]}));

                if (queryData.error) {
                  return null; //Can happen when reaching quota, will try again next time
                }
                console.log(`processing req ${req.startDate} to ${req.endDate} for page ${row.keys[0]}`)

                //Here we are handling the fact that some pages have no query stats
                const topRequest = queryData.rows?.[0]?.keys[1] ?? 'NO DATA'
                const topRequestClicks = queryData.rows?.[0]?.clicks ?? 0
                const topRequestImpressions = queryData.rows?.[0].impressions ?? 0

                if (topRequest === 'NO DATA') {
                  console.log(`Page ${row.keys[0]} has no query stats available`)
                }

                return {
                  date: req.startDate,
                  page: row.keys[0],
                  clicks: row.clicks,
                  impressions: row.impressions,
                  ctr: row.ctr,
                  position: row.position,
                  topRequest,
                  topRequestClicks,
                  topRequestImpressions
                }
              }
            } catch (error) {
              console.error('Error processing row:', error);
              return null;
            }
          })
        );

        // Filter out null values
        const validRows = transformedRows.filter((row): row is AirtableAnalyticsData => row !== null);
        results.push(...validRows);
      } catch (error) {
        // Do not add anything to results if there's an error with the request
        console.error('Error fetching search analytics data for request:', error);
      }
    })
  );

  return results;
}

//Make sure that we keep the same history of 6 month, removing all lines older than that
await clearTable(oldestDate)

read()
  .then(existingLines => fetchAllSearchAnalyticsData(requests, existingLines))
  .then((lines) => start(lines))

