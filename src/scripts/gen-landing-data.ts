import fs from 'fs'
import path from 'path'
import csvParser from 'csv-parse'

// This script reads the CSV version of this google sheet
// https://docs.google.com/spreadsheets/d/1Z_R7hGExAyMJrN4FFTsrfMLmvW_XDafIF6glYzFY61Y/edit#gid=0
// Then it outputs the wordings.
//
// We commit the output. The script is meant to be rerun only if needed.
//
// To run this script, first download the google sheet as CSV
// put it in the root folder as landings.csv
// then run this script

const csvFilePath = './landings.csv'
const outputFile = path.join('src', 'landings', 'landingsData.ts')

async function readCsv(): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    console.log(`Reading CSV file ${csvFilePath}`)
    fs.readFile(csvFilePath, 'utf8', (err, fileContent) => {
      if (err) reject(err)
      csvParser.parse(fileContent, {columns: false}, (err, rows) => {
        if (err) {
          console.error(err)
          return
        }
        resolve(rows)
      })
    })
  })
}

async function start() {
  const rows = (await readCsv())
    // remove header row
    .filter((_, idx) => idx >= 2)
  const data = rows.map(row => {
    const [category, , , , title, catchPhrase, secondaryTitle1, secondaryTitle2, ...sampleReports] = row
    return {
      category,
      title,
      catchPhrase,
      secondaryTitle1,
      secondaryTitle2,
      sampleReports: sampleReports
        .filter(_ => _.length > 0)
        .map(_ => {
          return {
            text: _,
            author: genAuthorName(),
          }
        }),
    }
  })
  // add dummy data for the demo category
  data.push({
    category: 'DemoCategory',
    title: 'Titre (inutilisé)',
    catchPhrase: "Phrase d'accroche blabla, bla bla répression des fraudes",
    secondaryTitle1: 'Titre bla bla pourquoi faire signalement',
    secondaryTitle2: 'Titre bla bla que va devenir le signalement',
    sampleReports: [
      {
        text: "Texte d'un signalement",
        author: genAuthorName(),
      },
      {
        text: "Texte d'un autre signalement",
        author: genAuthorName(),
      },
    ],
  })
  console.log(`Generating output file ${outputFile}`)
  fs.writeFileSync(
    outputFile,
    `// Generated file, do not edit manually
export const landingsData = ` +
      JSON.stringify(data, null, 2) +
      ';',
  )
  console.log(`You should reformat this file now ("yarn format")`)
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
