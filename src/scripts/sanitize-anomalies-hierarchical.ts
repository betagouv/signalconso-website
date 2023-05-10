import fs from 'fs'
import yaml from 'js-yaml'
import sortBy from 'lodash/sortBy'
import path from 'path'
import slugify from 'slugify'
import {v4 as uuidv4} from 'uuid'

const rootDir = path.resolve('./src/anomalies/hierarchical')
const INDEX_YAML = '__index.yaml'

// Walks the hierarchical file/directories structure
// Rename all files/folders automatically (adjust names and numbers)
function sanitizeHierarchicalAnomalies() {
  sanitizeDirContents(rootDir, {excludedFileName: '__imports'})
  dirContentSorted(path.join(rootDir, '__imports', 'subcategories')).forEach(subcategoriesSubDir => {
    sanitizeDirContents(subcategoriesSubDir)
  })
}

function sanitizeDirContents(_path: string, options: {excludedFileName?: string} = {}) {
  console.log('Rename contents of dir ', _path)
  throwIfNotExists(_path)
  throwIfNotDir(_path)
  const excludedFileNames = [INDEX_YAML, ...(options.excludedFileName ? [options.excludedFileName] : [])]
  // Rename everything with a random name
  // to avoid potential conflicts when doing the true renaming
  dirContentSorted(_path, {excludedFileNames}).map(subpath => {
    rename(subpath, `tmp_${uuidv4()}`)
  })
  // Rename everything with its proper name
  dirContentSorted(_path, {excludedFileNames}).map((subpath, idx) => {
    const title = findTitleForPath(_path)
    const newName = `${padTo2(idx + 1)}_${slugify(title, {strict: true, replacement: '_'})}`
    rename(subpath, newName)
  })
  // Recurse
  dirContentSorted(_path, {excludedFileNames}).map(subpath => {
    if (!isFile(subpath)) {
      sanitizeDirContents(subpath)
    }
  })
}

function findTitleForPath(_path: string) {
  throwIfNotExists(_path)
  if (isFile(_path)) {
    // it's a leaf yaml file
    return readTitleInYamlFile(_path)
  } else {
    // it's a dir, it should have an __index.yaml with a title
    const indexPath = path.join(_path, INDEX_YAML)
    throwIfNotExists(indexPath, `Missing ${INDEX_YAML} in ${_path}`)
    throwIfNotFile(indexPath)
    return readTitleInYamlFile(indexPath)
  }
}

function readTitleInYamlFile(_path: string) {
  const {title} = readFileYaml(_path)
  if (!title) {
    throw new Error(`This file needs a "title": ${_path}`)
  }
  if (typeof title !== 'string') {
    throw new Error(`"Title" is not a string in ${path}`)
  }
  return title
}

function padTo2(num: number): string {
  return num.toString().padStart(2, '0')
}

// List both files and subfolders
// Sort them by name
function dirContentSorted<A>(dirPath: string, {excludedFileNames}: {excludedFileNames?: string[]} = {}) {
  return sortBy(fs.readdirSync(dirPath), _ => _)
    .filter(_ => !excludedFileNames?.includes(_))
    .map(_ => path.join(dirPath, _))
}

function readFileYaml(filePath: string): any {
  return yaml.load(fs.readFileSync(filePath, 'utf-8'))
}

function exists(_path: string) {
  return fs.existsSync(_path)
}
function isFile(_path: string) {
  return exists(_path) && fs.statSync(_path).isFile()
}
function throwIfNotExists(_path: string, message?: string) {
  if (!exists(_path)) {
    throw new Error(message ?? `Nothing at path ${_path}`)
  }
}
function throwIfNotDir(_path: string, message?: string) {
  if (isFile(_path)) {
    throw new Error(message ?? `This is a file, not a directory: ${_path}`)
  }
}
function throwIfNotFile(_path: string, message?: string) {
  if (!isFile(_path)) {
    throw new Error(message ?? `This is a file, not a directory: ${_path}`)
  }
}

function rename(_path: string, newFilename: string): void {
  const newPath = path.join(path.dirname(_path), newFilename)
  fs.renameSync(_path, newFilename)
}

// Sort an object keys, recursively
// So that we can compare the JSONs
export function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj).sort()
    const res: any = {}
    keys.forEach(k => {
      const value = obj[k]
      res[k] = sortObjectKeys(value)
    })
    return res
  }
  return obj
}

sanitizeHierarchicalAnomalies()
