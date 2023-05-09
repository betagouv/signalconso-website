import {checkAnomaliesYaml} from '../anomalies/checks/checkAnomaliesJson'
import fs from 'fs'
import fsExtra from 'fs-extra'
import yaml from 'js-yaml'
import mapValues from 'lodash/mapValues'
import sortBy from 'lodash/sortBy'
import path from 'path'
import {rimrafSync} from 'rimraf'
const rootDir = path.resolve('./src/anomalies/hierarchical')
const jsonOutputFile = path.resolve(rootDir, '..', 'hierarchical.json')
// Attempt to read the new file tree structure from 'hierarchical' folder
// and resolve imports
function readNewHierarchicalAnomalies() {
  const anomalyDirs = sortBy(fs.readdirSync(rootDir), _ => _)
    .filter(_ => _ !== '__imports')
    .map(_ => path.join(rootDir, _))

  const anomalies = anomalyDirs.map(_ => {
    return resolveImportsRecursively(buildSubcategoryFromFileOrFolder(_))
  })

  const ymlBigFile = './src/anomalies/hierarchical.yaml'
  console.log(`Generating YAML file ${ymlBigFile}`)
  writeYamlFile(ymlBigFile, anomalies)

  console.log(`Generating JSON file ${jsonOutputFile}`)
  fs.writeFileSync(jsonOutputFile, JSON.stringify(anomalies, null, 2))
  checkAnomaliesYaml(anomalies)
  console.log(`The YAML is valid`)
}

// Read a file or a folder
// Returns a Subcategory
// except it can use 'customimport', so it's not exactly the correct type
function buildSubcategoryFromFileOrFolder(_path: string): any {
  console.log('Reading ', _path)
  const type = checkPathType(_path)
  if (type === 'missing') {
    throw new Error(`Nothing at path ${_path}`)
  } else if (type === 'file') {
    return readFileYaml(_path)
  } else {
    // Read __index.yaml
    const indexFile = path.join(_path, '__index.yaml')
    const indexType = checkPathType(indexFile)
    if (indexType === 'dir') {
      throw new Error(`${indexFile} is supposed to be a file, not a directory`)
    }
    if (indexType === 'missing') {
      throw new Error(`Missing file __index.yaml in ${_path}`)
    }
    const indexYaml: any = readFileYaml(indexFile)
    // Read the rest (each file or folder turns into a subcat of this subcat)
    const otherFilesOrSubdirs =
      // force the order based on filenames
      sortBy(fs.readdirSync(_path), _ => _)
        .map(_ => path.join(_path, _))
        .filter(_ => _ !== indexFile)
    const subSubcats = otherFilesOrSubdirs.map(subpath => {
      return buildSubcategoryFromFileOrFolder(subpath)
    })
    // Then merge
    const subcat = {
      ...indexYaml,
      subcategories: subSubcats,
    }
    return subcat
  }
}

// Read a file or folder (within __imports)
// Build the object or array that we're supposed to import
//
// the logic is slightly different if it's a folder :
//  - we don't expect an __index.yaml
//  - we build an array of subcategories for each file/subdir
//    (instead of building the subcategory above)
function buildImportableFromFileOrFolder(_path: string): any {
  console.log('Reading ', _path)
  const type = checkPathType(_path)
  if (type === 'missing') {
    throw new Error(`Nothing at path ${_path}`)
  } else if (type === 'file') {
    return readFileYaml(_path)
  } else {
    // Read the rest (each file or folder turns into a subcat of this subcat)
    const filesOrSubdirs = sortBy(fs.readdirSync(_path), _ => _).map(_ => path.join(_path, _))
    const subcats = filesOrSubdirs.map(subpath => {
      // recurse with the other method
      return buildSubcategoryFromFileOrFolder(subpath)
    })
    return subcats
  }
}

function resolveImportsRecursively(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(resolveImportsRecursively)
  }
  if (typeof obj === 'object' && obj !== null) {
    // It's an object
    // Resolve imports
    const {customimport, ...rest} = obj
    let imported = {}
    if (customimport) {
      checkCustomImportIsValid(customimport)
      console.log('Resolving import of ', customimport)
      const fullImportPath = path.join(rootDir, customimport)
      imported = buildImportableFromFileOrFolder(fullImportPath)
    }
    if (Array.isArray(imported)) {
      return imported.map(resolveImportsRecursively)
    } else {
      const obj2 = Array.isArray(imported) ? imported : {...rest, ...imported}
      // Then recurse
      const obj3 = mapValues(obj2, v => {
        return resolveImportsRecursively(v)
      })
      return obj3
    }
  }
  return obj
}

function checkCustomImportIsValid(customimport: string) {
  // make sure that there is not funny import path
  const validPaths = ['__imports/subcategories/', '__imports/blockingInfo/', '__imports/detailInputs/']
  if (!validPaths.some(_ => customimport.startsWith(_))) {
    throw new Error(`Import of "${customimport}" is invalid, it should start with one of these ${validPaths.join(', ')}`)
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

function readFileYaml(filePath: string): any {
  return yaml.load(fs.readFileSync(filePath, 'utf-8'))
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

function mapEachFileOrSubdirInDirectoryExceptIndex<A>(directory: string, callback: (filePath: string) => A): A[] {
  const res: A[] = []
  const files = fs.readdirSync(directory)
  // force the order based on filenames
  const filesSorted = sortBy(files, _ => _)
  for (const file of filesSorted) {
    const filePath = path.join(directory, file)
    res.push(callback(filePath))
  }
  return res
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

function checkPathType(path: string): 'file' | 'dir' | 'missing' {
  if (!fs.existsSync(path)) {
    return 'missing'
  }
  const stats = fs.statSync(path)
  if (stats.isFile()) {
    return 'file'
  }
  return 'dir'
}

function writeYamlFile(filename: string, data: unknown): void {
  const yamlData = yaml.dump(data)
  fs.writeFileSync(filename, yamlData, 'utf8')
}

readNewHierarchicalAnomalies()
