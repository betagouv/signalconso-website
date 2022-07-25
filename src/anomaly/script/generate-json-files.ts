import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import * as yamlImport from 'yaml-import'
import {checkAnomaliesJson} from './checkAnomaliesJson'

const files = [
  {
    input: 'anomalies.yml',
    output: 'anomalies.json',
  },
]

const addUniqueId = (obj: any, depth = 0, prefix?: string) => {
  let index = 1
  obj.forEach((entry: any) => {
    const id = `${prefix ? prefix + '.' : ''}${entry.id || index++}`
    entry.id = id
    if (entry.subcategories) {
      addUniqueId(entry.subcategories, depth + 1, id)
    }
  })
}

const root = path.join(__dirname, '..', 'yml')
files.forEach(file => {
  const tmpFile = path.join(root, 'tmp.yml')
  yamlImport.write(path.join(root, file.input), tmpFile)
  const obj = yaml.load(fs.readFileSync(tmpFile, {encoding: 'utf-8'}))
  fs.unlinkSync(tmpFile)
  // const version = '1'
  // obj.version = version
  addUniqueId(obj.list)
  checkAnomaliesJson(obj)
  fs.writeFileSync(path.join(root, file.output), JSON.stringify(obj, null, 2))
})
