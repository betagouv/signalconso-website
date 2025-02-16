import {fetchQueryAnalyticsData, fetchSearchAnalyticsData} from "./client/google.client.js";
import {start, clearTable} from "./client/airtable.client.js";
import {SearchAnalyticsResponse, AirtableAnalyticsData, SearchAnalyticsRequest} from "./models/model.js";
import {getLast6CompleteMonthRanges} from "./date.utils.js";


const dateRanges = getLast6CompleteMonthRanges();
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


async function fetchAllSearchAnalyticsData(requests: SearchAnalyticsRequest[]) {
  try {
    const results: Awaited<AirtableAnalyticsData>[] = [];

    await Promise.all(
      requests.map(async req => {
        const res = await fetchSearchAnalyticsData(req);

        const transformedRows: Awaited<AirtableAnalyticsData>[] = await Promise.all(
          res.rows.map(async row => {
            const queryData = await fetchQueryAnalyticsData({ ...req, page: row.keys[0] });
            return {
              date: req.startDate,
              page: row.keys[0],
              clicks: row.clicks,
              impressions: row.impressions,
              ctr: row.ctr,
              position: row.position,
              landingType: 'string',
              topRequest: queryData.rows[0].keys[1],
              topRequestClicks: queryData.rows[0].clicks,
              topRequestImpressions: queryData.rows[0].impressions
            };
          })
        );

        results.push(...transformedRows);
      })
    );

    return results;
  } catch (error) {
    console.error('Error fetching search analytics data:', error);
    throw error;
  }
}



const lines: AirtableAnalyticsData[] = await fetchAllSearchAnalyticsData(requests)

lines && clearTable()
  .then(_ => start(lines))
