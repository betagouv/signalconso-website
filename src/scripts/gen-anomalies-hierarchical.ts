import toml from '@iarna/toml'
import {Anomaly, Subcategory} from 'anomalies/Anomaly'
import fs from 'fs'
import fsExtra from 'fs-extra'
import yaml from 'js-yaml'
import path from 'path'
import {rimrafSync} from 'rimraf'
import slugify from 'slugify'
import * as yamlImport from 'yaml-import'
import {instanceOfAnomaly} from '../anomalies/Anomalies'

const classicYmlRoot = path.resolve('./src/anomalies/yml')
const tmpYmlRoot = path.resolve('./src/anomalies/yml2')
const targetDir = path.resolve('./src/anomalies/hierarchical')
const FILE_FORMAT: 'json' | 'toml' | 'yaml' = 'yaml'

// Make a copy of the classic yml folder
// into a new 'hierarchical' folder, using the new structure and imports
function rewriteCurrentYamlAsFileTree() {
  resetDir(targetDir)
  removeWholeDir(tmpYmlRoot)
  copyWholeDir(classicYmlRoot, tmpYmlRoot)
  rewriteImports(tmpYmlRoot)

  const tmpYamlFile = path.resolve(tmpYmlRoot, 'tmp.yml')
  const ymlFileRoot = path.join(tmpYmlRoot, 'anomalies.yml')
  console.log(`Reading ${ymlFileRoot}, resolving imports and writing into ${tmpYamlFile}`)
  yamlImport.write(ymlFileRoot, tmpYamlFile)
  // Technically the types are inexact because of the imports, but it should correct enough for this use case
  const anomaliesWithCustomImports = yaml.load(readFileRaw(tmpYamlFile)) as Anomaly[]
  removeFile(tmpYamlFile)
  anomaliesWithCustomImports.forEach((anomaly, idx) => {
    writeSubcatAsFileTree(targetDir, anomaly, idx)
  })

  // Copy common/info and common/inputs
  copyWholeDir(path.join(tmpYmlRoot, 'common', 'info'), path.join(targetDir, '__imports', 'blockingInfo'))
  copyWholeDir(path.join(tmpYmlRoot, 'common', 'inputs'), path.join(targetDir, '__imports', 'detailInputs'))

  // Copy common/*.yml but transformed as file hierarchy
  forEachFileInDirectory(path.join(tmpYmlRoot, 'common'), f => {
    const importableSubcats = yaml.load(readFileRaw(f)) as Subcategory[]
    const folder = path.join(targetDir, '__imports', 'subcategories', extractFileName(f))
    resetDir(folder)
    importableSubcats.forEach((subcat, idx) => {
      writeSubcatAsFileTree(folder, subcat, idx)
    })
  })

  removeWholeDir(tmpYmlRoot)
}

// Rewrite all the :
//
// foo: !!import/single ../relative/import/path
//
// as
//
// foo:
//   customimport: __imports/absolute/import/path
//
//
// but preserve the ones in anomalies.yml
function rewriteImports(dir: string) {
  forEachFileInDirectoryRecursive(dir, yamlPath => {
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
${indent}  customimport: ${adjustImportPath(importPath)}`
          fileContents = fileContents.replace(fullMatch, replacement)
          match = importStatementRegex.exec(fileContents)
        }
        fs.writeFileSync(yamlPath, fileContents, 'utf-8')
      }
    }
  })
}

function adjustImportPath(importPath: string) {
  let s = importPath
  s = removePrefix(s, '../common/')
  s = removePrefix(s, './common/')
  s = removePrefix(s, './')
  s = replacePrefix(s, 'info/', '__imports/blockingInfo/')
  s = replacePrefix(s, 'inputs/', '__imports/detailInputs/')
  if (!s.startsWith('__imports')) {
    s = '__imports/subcategories/' + removeExtension(s)
  }
  return s
}

function writeSubcatAsFileTree(parentDir: string, subcat: Subcategory, idxInParent: number) {
  const nameInFileSystem = `${padTo2(idxInParent + 1)}_${slugify(subcat.title, {strict: true, replacement: '_'})}`
  const {subcategories, id, ...rest} = subcat
  let fileContent: any = {
    // preserve id only at the top level
    ...(instanceOfAnomaly(subcat) ? {id} : {}),
    ...rest,
  }

  if (subcategories && (subcategories as any).customimport) {
    // subcategories have been replaced by an object { customimport: 'xxx' }
    // write it as a file, with the subcategories object
    fileContent = {...fileContent, subcategories}
    const filePath = path.join(parentDir, `${nameInFileSystem}.${FILE_FORMAT}`)
    createFile(filePath, fileContent, FILE_FORMAT)
  } else if (subcategories && subcategories.length > 0) {
    // subcategories array : we create a folder
    const folderPath = path.join(parentDir, `${nameInFileSystem}`)
    createDir(folderPath)
    const filePath = path.join(folderPath, `__index.${FILE_FORMAT}`)
    createFile(filePath, fileContent, FILE_FORMAT)
    subcategories?.forEach((subsubcat, idx) => {
      writeSubcatAsFileTree(folderPath, subsubcat, idx)
    })
  } else {
    // no subcategories : we create a file
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

function removePrefix(text: string, prefix: string): string {
  if (text.startsWith(prefix)) {
    return text.slice(prefix.length)
  } else {
    return text
  }
}

function replacePrefix(text: string, prefix: string, replacement: string): string {
  if (text.startsWith(prefix)) {
    return replacement + text.slice(prefix.length)
  } else {
    return text
  }
}

function removeExtension(s: string): string {
  const lastDotIndex = s.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return s
  } else {
    return s.substring(0, lastDotIndex)
  }
}

rewriteCurrentYamlAsFileTree()
