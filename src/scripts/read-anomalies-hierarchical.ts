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

// Attempt to read the new file tree structure from 'hierarchical' folder
// and resolve imports
function readNewHierarchicalAnomalies() {}

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

readNewHierarchicalAnomalies()
