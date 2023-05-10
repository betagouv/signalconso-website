import fs from 'fs'
import yaml from 'js-yaml'
import sortBy from 'lodash/sortBy'
import path from 'path'

// Sort an object keys, recursively
// useful to compare JSONs
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

export function readFileYaml(filePath: string): any {
  return yaml.load(fs.readFileSync(filePath, 'utf-8'))
}

export function exists(_path: string) {
  return fs.existsSync(_path)
}
export function isFile(_path: string) {
  return exists(_path) && fs.statSync(_path).isFile()
}
export function throwIfNotExists(_path: string, message?: string) {
  if (!exists(_path)) {
    throw new Error(message ?? `Nothing at path ${_path}`)
  }
}
export function throwIfNotDir(_path: string, message?: string) {
  if (isFile(_path)) {
    throw new Error(message ?? `This is a file, not a directory: ${_path}`)
  }
}
export function throwIfNotFile(_path: string, message?: string) {
  if (!isFile(_path)) {
    throw new Error(message ?? `This is a file, not a directory: ${_path}`)
  }
}

export function renameFileOrDir(_path: string, newFilename: string): void {
  const newPath = path.join(path.dirname(_path), newFilename)
  if (newPath !== _path) {
    console.log(`Renaming ${_path} -> ${newFilename}`)
    fs.renameSync(_path, newPath)
  }
}

// List both files and subfolders
// Sort them by name
export function dirContentSorted<A>(dirPath: string, {excludedFileNames}: {excludedFileNames?: string[]} = {}) {
  return sortBy(fs.readdirSync(dirPath), _ => _)
    .filter(_ => !excludedFileNames?.includes(_))
    .map(_ => path.join(dirPath, _))
}

export function padTo2(num: number): string {
  return num.toString().padStart(2, '0')
}
