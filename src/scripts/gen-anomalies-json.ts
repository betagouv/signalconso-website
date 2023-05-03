import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import * as yamlImport from 'yaml-import'
import {checkAnomaliesYaml} from '../anomalies/checks/checkAnomaliesJson'

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

const ymlRoot = path.join(__dirname, '..', 'anomalies', 'yml')
files.forEach(file => {
  const tmpFile = path.join(ymlRoot, 'tmp.yml')
  const ymlFileRoot = path.join(ymlRoot, file.input)
  console.log(`Reading YAML and resolving imports from ${ymlFileRoot}`)
  yamlImport.write(ymlFileRoot, tmpFile)
  const obj = yaml.load(fs.readFileSync(tmpFile, {encoding: 'utf-8'})) as any
  fs.unlinkSync(tmpFile)
  // const version = '1'
  // obj.version = version
  checkAnomaliesYaml(obj)
  console.log(`The YAML is valid`)
  addUniqueId(obj)
  const outputFile = path.join(ymlRoot, file.output)
  console.log(`Generating JSON file ${outputFile}`)
  fs.writeFileSync(outputFile, JSON.stringify(obj, null, 2))
})
