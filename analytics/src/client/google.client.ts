import {GoogleAuth} from "google-auth-library";
import {QueryAnalyticsRequest, SearchAnalyticsRequest, SearchAnalyticsResponse} from '../models/model.js'
import {Config} from "../config/config.js";


const SERVICE_ACCOUNT_FILE = Config.googleServiceAccountPrivateKey


// OAuth 2.0 scope for Search Console API
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];
const GOOGLE_API_URL = 'https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fsignal.conso.gouv.fr%2F/searchAnalytics/query';



const executeQuery = async (accessToken: string, requestBody: any) => {
  return await fetch(GOOGLE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
}

const getAccessToken = async () => {
  try {
    // Load the service account credentials
    const auth = new GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: SCOPES,
    });
    
    // Get an access token
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken.token;
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
}

export const fetchSearchAnalyticsData = async (request: SearchAnalyticsRequest): Promise<SearchAnalyticsResponse> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error('Failed to obtain access token');
    throw Error("Failed to obtain access token")
  }


  const containsFilters = request.contains.map((containsString: string) => ({
    dimension: "page",
    operator: "contains",
    expression: containsString
  }));

  const notContainsFilters = request.notContains.map((notContainsString: string) => ({
    dimension: "page",
    operator: "notContains",
    expression: notContainsString
  }));

  const requestBody = {
    startDate: request.startDate,  // Use a wider range
    endDate: request.endDate,
    dimensions: ["page"],
    rowLimit: 1,
    dimensionFilterGroups: [{
      filters:
        [...containsFilters, ...notContainsFilters]
    }]
  };


  try {
    const response = await executeQuery(accessToken, requestBody)
    const jsonResponse: SearchAnalyticsResponse = await response.json();

    console.log(`Got ${jsonResponse.rows.length} elements from google for period ${request.startDate} - ${request.endDate}`)

    const dateObject = {
      month: request.startDate
    }

    return {
      ...dateObject,
      ...jsonResponse
    }
  } catch (error) {
    console.error('Error fetching search analytics data:', error);
    throw error
  }
}


export const fetchQueryAnalyticsData = async (request: QueryAnalyticsRequest): Promise<SearchAnalyticsResponse> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error('Failed to obtain access token');
    throw Error("Failed to obtain access token")
  }

  const requestBody = {
    startDate: request.startDate,  // Use a wider range
    endDate: request.endDate,
    dimensions: ["page", "query"],
    rowLimit: 1,
    orderBy: [{
      fieldName: "clicks",
      sortOrder: "descending"
    }],
    dimensionFilterGroups: [{
      filters:
        [{
          dimension: "page",
          operator: "contains",
          expression: request.page
        }]
    }]
  };

  try {
    const response = await executeQuery(accessToken, requestBody)

    const jsonResponse: SearchAnalyticsResponse = await response.json();

    const dateObject = {
      month: request.startDate
    }

    return {
      ...dateObject,
      ...jsonResponse
    }
  } catch (error) {
    console.error('Error fetching search analytics data:', error);
    throw error
  }
}
