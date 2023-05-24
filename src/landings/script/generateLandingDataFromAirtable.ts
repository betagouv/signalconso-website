import fs from 'fs'
import path from 'path'
import Airtable from 'airtable'
import {appConfig} from '../../core/appConfig'
import {AirtableBase} from 'airtable/lib/airtable_base'
import mapKeys from 'lodash/mapKeys'
import findKey from 'lodash/findKey'
import sortBy from 'lodash/sortBy'
import {allVisibleAnomalies, findAnomaly} from '../../anomalies/Anomalies'
import {LandingData} from 'landings/landingDataUtils'
import {hasNoDuplicates} from '../../utils/utils'

// This script reads data from our Airtable account
// Then it outputs all the texts for our landing pages.
//
// We commit the output.
// This script is meant to be rerun only occasionally when needed.

const outputFile = path.join(__dirname, '..', 'landingsData.ts')

const BASE_ID = 'appdO2KcJrc2RI28f'
const PUBLISHED_STATUS = 'PUBLIEE'

type RawRow = {
  status?: string
  isSemiAutomatic?: boolean
  targetedCategory?: string[]
  url?: string
  seoTitle?: string
  seoDescription?: string
  title?: string
  catchPhrase?: string
  secondaryTitle1?: string
  secondaryTitle2?: string
  sampleReports?: string[]
}

type RowTranformed = LandingData

function setupAirtable() {
  const apiKey = appConfig.airtableApiToken
  if (!apiKey) {
    throw new Error(`You need to configure the api token in your environnement`)
  }
  const base = new Airtable({apiKey}).base(BASE_ID)
  return base
}

async function start() {
  const base = setupAirtable()
  const rows = await readLandingPagesTable(base)
  const rowsPublished = rows.filter(_ => _.status === PUBLISHED_STATUS)
  console.log(`Found ${rowsPublished.length} landings with ${PUBLISHED_STATUS} status`)
  const rowsTranformed = rowsPublished.map(validateAndTransformRow)
  checkNoMissingOrDuplicateAnomalies(rowsTranformed)
  checkNoDuplicates(rowsTranformed)
  // we impose a consistent order, for easier diffs
  const rowsSorted = sortConsistently(rowsTranformed)
  console.log(`Generating output file ${outputFile}`)
  fs.writeFileSync(
    outputFile,
    `// ----------------------------------------------
  // ---- Generated file, do not edit manually ---
  // ----------------------------------------------
  export const landingsData = ` +
      JSON.stringify(rowsSorted, null, 2) +
      ';',
  )
}

function throwForMissingField(): never {
  throw new Error(`There is at least one published row with an empty or missing mandatory field`)
}

function throwForInvalidUrlField(): never {
  throw new Error(`Invalid url field, it should not contain any slashes`)
}

function validateAndTransformRow(row: RawRow): RowTranformed {
  let {
    isSemiAutomatic,
    url,
    seoTitle,
    seoDescription,
    title,
    targetedCategory,
    catchPhrase,
    secondaryTitle1,
    secondaryTitle2,
    sampleReports,
  } = row

  if (!catchPhrase || !secondaryTitle1 || !secondaryTitle2) {
    throwForMissingField()
  }

  sampleReports = sampleReports ?? []
  targetedCategory = targetedCategory ?? []
  isSemiAutomatic = isSemiAutomatic ?? false
  // All the specified categories should exist
  targetedCategory?.forEach(findAnomaly)

  if (isSemiAutomatic) {
    if (targetedCategory.length !== 1) {
      throw new Error(`Invalid landing page, if it's semi-automatic it should target exactly 1 category`)
    }
    if (url || seoTitle || seoDescription || title) {
      throw new Error(
        `Invalid landing page, if it's semi-automatic the fields url/seoTitle/seoDescription/title should be left empty`,
      )
    }
    // Compute some fields from the YML
    const category = targetedCategory[0]
    const anomaly = findAnomaly(category)
    url = anomaly.path
    seoTitle = anomaly.seoTitle
    seoDescription = anomaly.seoDescription
    title = anomaly.title
  } else {
    if (!url || !seoTitle || !seoDescription || !title) {
      throwForMissingField()
    }
  }

  if (url.indexOf('/') !== -1) {
    throwForInvalidUrlField()
  }

  // if multiple categories, always sort them in the same order as the HP
  targetedCategory = sortBy(targetedCategory, _ => parseInt(findAnomaly(_).id, 10))

  return {
    url,
    isSemiAutomatic,
    seoTitle,
    seoDescription,
    title,
    targetedCategory,
    catchPhrase,
    secondaryTitle1,
    secondaryTitle2,
    sampleReports: sampleReports.map(text => {
      return {text, author: genAuthorName()}
    }),
  }
}

async function readLandingPagesTable(base: AirtableBase) {
  const rows: RawRow[] = await readWholeTable(base, 'tbltnMib6IHrTvR6Q', {
    // To get a nice generated doc of Airtable API using our tables/fields,
    // go to https://airtable.com/developers/web/api/introduction
    // then select the workspace immediately in this first page
    // That's where I got these fields IDs
    status: 'fldqrsAm8Jz4LZWkC',
    isSemiAutomatic: 'fldLJOrafPET3x1Mp',
    targetedCategory: 'fldxgFIs3QWNjM2Tj',
    url: 'fldMDKAoeiWysOEvZ',
    seoTitle: 'fldPlHhkFZIPFM3DO',
    seoDescription: 'fldTJo3np2IHj3OYj',
    title: 'fldtDRo0282ECrDev',
    catchPhrase: 'fldLmMIfK3W79tFDN',
    secondaryTitle1: 'fldD4l9zj8ZbCgEqO',
    secondaryTitle2: 'fldT4IBImmXgE3wej',
    // c'est un lookup field qui nous ramène directement le texte des signalements dans un array de string
    sampleReports: 'fldVwLtxwu1AR6npK',
  })
  return rows
}

async function readWholeTable(base: AirtableBase, tableId: string, fieldsMapping: {[k: string]: string}): Promise<any[]> {
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
          const rowTransformed: any = mapKeys(fields, (_, key) => {
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

// All anomalies should have exactly 1 semi-automatic LP
function checkNoMissingOrDuplicateAnomalies(rows: RowTranformed[]) {
  allVisibleAnomalies().forEach(anomaly => {
    const matchingRows = rows
      .filter(_ => _.isSemiAutomatic)
      .filter(_ => _.targetedCategory.length === 1 && _.targetedCategory[0] === anomaly.category)

    if (matchingRows.length === 0) {
      throw new Error(`Missing semi automatic landing page targeting specifically ${anomaly.category}`)
    }
    if (matchingRows.length > 1) {
      throw new Error(
        `Several semi automatic landing pages (${matchingRows.length}) are targeting specifically ${anomaly.category}`,
      )
    }
  })
}

function checkNoDuplicates(rows: RowTranformed[]) {
  if (!hasNoDuplicates(rows.map(_ => _.url))) {
    throw new Error(`Several landing pages are configured on the same URL`)
  }
  if (!hasNoDuplicates(rows.map(_ => _.seoTitle))) {
    throw new Error(`Several landing pages are configured with the same seoTitle`)
  }
  if (!hasNoDuplicates(rows.map(_ => _.seoDescription))) {
    throw new Error(`Several landing pages are configured with the same seoDescription`)
  }
  if (!hasNoDuplicates(rows.map(_ => _.title))) {
    throw new Error(`Several landing pages are configured with the same title`)
  }
}

function sortConsistently(rows: RowTranformed[]) {
  // we impose a consistent order, for easier diffs
  return sortBy(rows, _ => `${!_.isSemiAutomatic}_${_.url}`)
}

function genAuthorName() {
  const firstNames = [
    'Emma',
    'Adam',
    'Léa',
    'Mehdi',
    'Louis',
    'Amira',
    'Jules',
    'Sofia',
    'Timothée',
    'Fatima',
    'Nathan',
    'Leila',
    'Théo',
    'Ali',
    'Zoé',
    'Hassan',
    'Jade',
    'Inès',
    'Ayoub',
    'Clara',
    'Mohamed',
    'Chloé',
    'Rayan',
    'Sarah',
    'Hugo',
    'Amine',
    'Noémie',
    'Idriss',
    'Maria',
    'Mathis',
    'Nour',
    'Léo',
    'Zahra',
    'Axel',
    'Soukaina',
    'Émile',
    'Salma',
    'Anna',
    'Ahmed',
    'Margaux',
    'Élias',
    'Myriam',
    'Juliette',
    'Rachid',
    'Enzo',
    'Yasmina',
    'Alexandre',
    'Nadia',
    'Stella',
    'Dylan',
    'Bernard',
    'Jacqueline',
    'Michel',
    'Simone',
    'Gérard',
  ]

  return `${randomItemFromArray(firstNames)} ${randomItemFromArray(firstNames)[0]}.`
}

function randomItemFromArray(arr: string[]) {
  const nb = seededRandom.getNumber()
  const randomIndex = Math.floor(nb * arr.length)
  return arr[randomIndex]
}

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
// we seed to get the same names each time
let seed = 1
const seededRandom = {
  getNumber() {
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  },
}

start()
