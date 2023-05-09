import toml from '@iarna/toml'
import {Anomaly, Subcategory} from 'anomalies/Anomaly'
import fs from 'fs'
import fsExtra from 'fs-extra'
import yaml from 'js-yaml'
import path from 'path'
import {rimrafSync} from 'rimraf'
import slugify from 'slugify'
import {allAnomalies, instanceOfAnomaly} from '../anomalies/Anomalies'
import * as yamlImport from 'yaml-import'

const classicYmlRoot = path.resolve('./src/anomalies/yml')
const tmpYmlRoot = path.resolve('./src/anomalies/yml2')
const targetDir = path.resolve('./src/anomalies/hierarchical')
const FILE_FORMAT: 'json' | 'toml' | 'yaml' = 'yaml'

function start() {
  startFromCurrentYaml()
}

function startGenFromJson() {
  resetDir(targetDir)
  allAnomalies.forEach((anomaly, idx) => {
    recurse(targetDir, anomaly, idx)
  })
}

function startFromCurrentYaml() {
  resetDir(targetDir)
  removeWholeDir(tmpYmlRoot)
  copyWholeDir(classicYmlRoot, tmpYmlRoot)
  rewriteImports()

  const tmpYamlFile = path.resolve(tmpYmlRoot, 'tmp.yml')
  const ymlFileRoot = path.join(tmpYmlRoot, 'anomalies.yml')
  console.log(`Reading ${ymlFileRoot}, resolving imports and writing into ${tmpYamlFile}`)
  yamlImport.write(ymlFileRoot, tmpYamlFile)
  // Technically the types are inexact because of the imports, but it should correct enough for this use case
  const anomaliesWithCustomImports = yaml.load(readFileRaw(tmpYamlFile)) as Anomaly[]
  removeFile(tmpYamlFile)
  anomaliesWithCustomImports.forEach((anomaly, idx) => {
    recurse(targetDir, anomaly, idx)
  })

  // TODO handle the imported files
  // Copy common/info and common/inputs
  copyWholeDir(path.join(tmpYmlRoot, 'common', 'info'), path.join(targetDir, '__imports', 'info'))
  copyWholeDir(path.join(tmpYmlRoot, 'common', 'inputs'), path.join(targetDir, '__imports', 'inputs'))

  // common/*.yml will need to be transformed as file hierarchy
  // => parse them as YAML, type them as Subcategory[], then write them each in their own folder

  forEachFileInDirectory(path.join(tmpYmlRoot, 'common'), f => {
    const importableSubcats = yaml.load(readFileRaw(f)) as Subcategory[]
    const folder = path.join(targetDir, '__imports', 'subcategories', extractFileName(f))
    resetDir(folder)
    importableSubcats.forEach((subcat, idx) => {
      recurse(folder, subcat, idx)
    })
  })

  removeWholeDir(tmpYmlRoot)
}

// Rewrite all the :
//
// foo: !!import/single xxxx
//
// as
//
// foo:
//   customimport: xxx
//
// but preserve the ones in anomalies.yml
function rewriteImports() {
  forEachFileInDirectoryRecursive(tmpYmlRoot, yamlPath => {
    if (yamlPath.endsWith('anomalies.yml')) {
      console.log('Preserving !!import statements in ', yamlPath)
    } else {
      let fileContents = readFileRaw(yamlPath)
      if (fileContents.includes('!!import/single')) {
        console.log('Rewriting imports found in', yamlPath)
        const importStatementRegex = /^(\s*)(\w+): !!import\/single (\S+)/gm
        let match = importStatementRegex.exec(fileContents)
        while (match !== null) {
          const fullMatch = match[0]
          const indent = match[1]
          const key = match[2]
          const importPath = match[3]
          const replacement = `${indent}${key}:
${indent}  customimport: ${importPath}`
          fileContents = fileContents.replace(fullMatch, replacement)
          match = importStatementRegex.exec(fileContents)
        }
        fs.writeFileSync(yamlPath, fileContents, 'utf-8')
      }
    }
  })
}

function recurse(parentDir: string, subcat: Subcategory, idxInParent: number) {
  const nameInFileSystem = `${padTo2(idxInParent + 1)}_${slugify(subcat.title, {strict: true, replacement: '_'})}`
  const {subcategories, id, ...rest} = subcat
  const fileContent = {
    // preserve id only at the top level
    ...(instanceOfAnomaly(subcat) ? {id} : {}),
    ...rest,
  }

  if (subcategories && subcategories.length > 0) {
    const folderPath = path.join(parentDir, `${nameInFileSystem}`)
    createDir(folderPath)
    const filePath = path.join(folderPath, `__index.${FILE_FORMAT}`)
    createFile(filePath, fileContent, FILE_FORMAT)
    subcategories?.forEach((subsubcat, idx) => {
      recurse(folderPath, subsubcat, idx)
    })
  } else {
    const filePath = path.join(parentDir, `${nameInFileSystem}.${FILE_FORMAT}`)
    createFile(filePath, fileContent, FILE_FORMAT)
  }
}

function resetDir(path: string): void {
  console.log('Resetting directory', path)
  const exists = fs.existsSync(path)
  if (exists) {
    rimrafSync(path)
  }
  fs.mkdirSync(path, {recursive: true})
}

function removeWholeDir(path: string): void {
  console.log('Removing if it exists', path)
  const exists = fs.existsSync(path)
  if (exists) {
    rimrafSync(path)
  }
}

function removeFile(filePath: string): void {
  fs.unlinkSync(filePath)
}

function createDir(path: string): void {
  fs.mkdirSync(path, {recursive: true})
}

function createFile(path: string, content: unknown, format: typeof FILE_FORMAT): void {
  console.log('Creating ', path)
  let contentStr =
    format === 'json'
      ? JSON.stringify(content, null, 2)
      : format === 'toml'
      ? toml.stringify(content as any)
      : yaml.dump(content as any)
  fs.writeFileSync(path, contentStr, 'utf8')
}

function padTo2(num: number): string {
  return num.toString().padStart(2, '0')
}

function copyWholeDir(source: string, destination: string) {
  console.log(`Copying dir ${source} to ${destination}`)
  fsExtra.copySync(source, destination)
}

function readFileRaw(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8')
}

function forEachFileInDirectoryRecursive(directory: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(directory)
  for (const file of files) {
    const filePath = path.join(directory, file)
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
      callback(filePath)
    } else if (stats.isDirectory()) {
      forEachFileInDirectoryRecursive(filePath, callback)
    }
  }
}

// iterate over the files directly in that directory
// ignores the subdirectories
function forEachFileInDirectory(directory: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(directory)
  for (const file of files) {
    const filePath = path.join(directory, file)
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
      callback(filePath)
    }
  }
}

function extractFileName(path: string): string {
  const fileNameWithExtension = path.split('/').pop()!
  const fileNameWithoutExtension = fileNameWithExtension.replace(/\.[^/.]+$/, '')
  return fileNameWithoutExtension
}

start()
