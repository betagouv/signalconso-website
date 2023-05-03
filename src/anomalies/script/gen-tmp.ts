import {allAnomalies} from '../Anomalies'
import path from 'path'
import fs from 'fs'
import {rimraf} from 'rimraf'
import {Subcategory} from 'anomalies/Anomaly'
import slugify from 'slugify'

const targetDir = path.resolve('./src/anomalies/bigstructure')

function start() {
  console.log('targetDir', targetDir)

  resetDir(targetDir)
  allAnomalies.forEach(anomaly => {
    recurse(targetDir, anomaly)
  })
}

function recurse(parentDir: string, subcat: Subcategory) {
  const hasChildren = subcat.subcategories && subcat.subcategories.length > 0

  // il faudra vérifier que les slugs sont uniques...
  const nameInFileSystem = slugify(subcat.title, '_')

  if (hasChildren) {
    const folderPath = path.join(parentDir, `${nameInFileSystem}`)
    createDir(folderPath)
    const filePath = path.join(folderPath, '__index.json')
    const {subcategories, ...rest} = subcat
    createJsonFile(filePath, rest)

    subcategories?.forEach(subsubcat => {
      recurse(folderPath, subsubcat)
    })
  } else {
    const filePath = path.join(parentDir, `${nameInFileSystem}.json`)
    createJsonFile(filePath, subcat)
  }
}

function resetDir(path: string): void {
  console.log('Resetting directory', path)
  const exists = fs.existsSync(path)
  if (exists) {
    rimraf.sync(`${path}/*`)
  }
  fs.mkdirSync(path, {recursive: true})
}

function createDir(path: string): void {
  fs.mkdirSync(path, {recursive: true})
}

function createJsonFile(path: string, content: unknown): void {
  console.log('Creating ', path)
  const data = JSON.stringify(content, null, 2)
  fs.writeFileSync(path, data, 'utf8')
}

start()
