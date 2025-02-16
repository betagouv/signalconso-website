import Airtable from 'airtable'
import {Config} from "../config/config.js";

import {AirtableAnalyticsData} from "../models/model.js";
import _ from 'lodash';

const {findKey, mapKeys} = _;

const BASE_ID = Config.airtableBaseId
const TABLE_ID = Config.airtableTableId

// To get a nice generated doc of Airtable API using our tables/fields,
// go to https://airtable.com/developers/web/api/introduction
// then select the workspace immediately in this first page
// That's where I got these fields IDs
const FIELD_MAPPING = {
  date: 'fldijdao0zmTO4pz3',
  page: 'fldFMJ4xJJxmekYdx',
  clicks: 'flddkFd5Zs3I9ZVWV',
  impressions: 'fldHJGJVaFmHBSOP2',
  ctr: 'fldu7hDmcndusF3V6',
  position: 'fldxubWYjn5E3IRKB',
  landingType: 'fldCHPowLng3GKd3A',
  topRequest: 'fldkUpAjoyjLrQQ7w',
  topRequestClicks: 'fld2kulJihLdhIPka',
  topRequestImpressions: 'fldM08I8eEyvrRsg7'
}


function setupAirtable() {
  const apiKey = Config.airtableToken
  if (!apiKey) {
    throw new Error(`You need to configure the api token in your environnement`)
  }
  const base: Airtable.Base = new Airtable({apiKey}).base(BASE_ID)
  return base
}


export async function clearTable() {
  try {
    console.log('Clearing previous airtable records');
    const base = setupAirtable();
    const records: any[] = [];

    // Retrieve all records in the table
    await base(TABLE_ID).select().eachPage(async (pageRecords, fetchNextPage) => {
      records.push(...pageRecords);
      fetchNextPage(); // Ensure fetchNextPage is awaited to handle pagination correctly
    });

    await batchAirtableAction(records
      , batchedRecord => base(TABLE_ID).destroy(batchedRecord.map((e: any) => e.id)))

    console.log('All records deleted successfully');
  } catch (error) {
    console.error('Error clearing table:', error);
  }
}

export async function start(lines: AirtableAnalyticsData[]) {
  const base = setupAirtable()
  const rows = await readLandingPagesTable(base)
  await pushRecordsToTable(base, TABLE_ID, lines, FIELD_MAPPING)
  console.log(rows)
}

async function readLandingPagesTable(base: Airtable.Base) {
  return await readWholeTable(base, TABLE_ID, FIELD_MAPPING)
}

async function readWholeTable(
  base: Airtable.Base,
  tableId: string,
  fieldsMapping: {
    [k: string]: string
  },
): Promise<any[]> {
  const res: any[] = []
  try {
    console.log(`Reading table ${tableId} from Airtable API`)
    await base(tableId)
      .select({
        fields: Object.values(fieldsMapping),
        returnFieldsByFieldId: true,
      })
      .eachPage((records, fetchNextPage) => {
        records.forEach(({fields}) => {
          const rowTransformed: any = mapKeys(fields, (_: any, key: string) => {
            const newKey = findKey(fieldsMapping, mappingValue => mappingValue === key)
            if (!newKey) {
              throw new Error(`Couldn't map field ${key}`)
            }
            return newKey
          })

          res.push(rowTransformed)
        })
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, this function will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage()
      })
  } catch (err) {
    console.error(err)
    throw err
  }
  return res
}


async function pushRecordsToTable(
  base: Airtable.Base,
  tableId: string,
  records: any[],
  fieldsMapping: { [k: string]: string },
): Promise<void> {
  try {
    console.log(`Pushing records to table ${tableId} in Airtable`);

    const fields = Array.from(records.entries()).map(([_, record]) => {
      const fields = mapKeys(record, (value: any, key: any) => {
        const fieldId = fieldsMapping[key];
        if (!fieldId) {
          throw new Error(`Couldn't map field ${key}`);
        }
        return fieldId;
      });
      return {fields};
    })

    await batchAirtableAction(fields
      , batchedRecord => base(TABLE_ID).create(batchedRecord))

    console.log('Records pushed successfully');
  } catch (err) {
    console.error('Error pushing records to Airtable:', err);
    throw err;
  }
}


async function batchAirtableAction(records: any[], action: (r: any) => Promise<any>) {
  //Max batch size for airtable is 10 records
  const batchSize = 10;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await action(batch);
  }
}

