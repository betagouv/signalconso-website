import fs from 'fs'
import path from 'path'
import Airtable from 'airtable'
import {appConfig} from '../../core/appConfig'
import {AirtableBase} from 'airtable/lib/airtable_base'
import mapKeys from 'lodash/mapKeys'
import findKey from 'lodash/findKey'
import sortBy from 'lodash/sortBy'

// This script reads data from our Airtable account
// Then it outputs all the texts for our landing pages.
//
// We commit the output.
// This script is meant to be rerun only occasionally when needed.

const outputFile = path.join(__dirname, '..', 'landingsData.ts')

// To get a nice generated doc of Airtable API using our tables/fields,
// go to https://airtable.com/developers/web/api/introduction
// then select the workspace immediately in this first page

const BASE_ID = 'appdO2KcJrc2RI28f'

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
  rows.push({
    category: 'DemoCategory',
    catchPhrase: "Phrase d'accroche blabla, bla bla répression des fraudes",
    secondaryTitle1: 'Titre bla bla pourquoi faire signalement',
    secondaryTitle2: 'Titre bla bla que va devenir le signalement',
    sampleReports: ["Texte d'un signalement", "Texte d'un autre signalement"],
  })
  const rowsWithAuthors = rows.map(row => {
    return {
      ...row,
      sampleReports: row.sampleReports.map(text => {
        return {text, author: genAuthorName()}
      }),
    }
  })
  // we impose a consistent order, for easier diffs
  const rowsSorted = sortBy(rowsWithAuthors, _ => _.category)
  console.log(`Generating output file ${outputFile}`)
  fs.writeFileSync(
    outputFile,
    `// Generated file, do not edit manually
  export const landingsData = ` +
      JSON.stringify(rowsSorted, null, 2) +
      ';',
  )
  console.log(`You should reformat this file now ("yarn format")`)
}

async function readLandingPagesTable(base: AirtableBase) {
  const rows: {
    category: string
    catchPhrase: string
    secondaryTitle1: string
    secondaryTitle2: string
    sampleReports: string[]
  }[] = await readWholeTable(base, 'tbltnMib6IHrTvR6Q', {
    category: 'fldxgFIs3QWNjM2Tj',
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
    res.forEach(row => {
      // verify that there is no empty field
      Object.keys(fieldsMapping).forEach(key => {
        if (!row[key]) {
          throw new Error(`There seems to be at least one row with an empty field (${key})`)
        }
      })
    })
  } catch (err) {
    console.error(err)
    throw err
  }
  return res
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
