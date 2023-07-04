import {fr} from '../i18n/localization/fr'
import fs from 'fs'

const i18nToCSV = (prefix: string, obj: any): string[] => {
  return Object.entries(obj).flatMap(entry => {
    const key = prefix === '' ? entry[0] : `${prefix}.${entry[0]}`
    if (typeof entry[1] === 'string') {
      const escapedValue = entry[1].replace(/"/g, '""')
      return [`${key};"${escapedValue}"`]
    } else if (typeof entry[1] === 'object') {
      return i18nToCSV(`${key}`, entry[1])
    } else {
      // when entry[1] is a function, we ignore it
      return []
    }
  })
}

const content = i18nToCSV('', fr.messages).join('\n')

try {
  fs.writeFileSync('./i18n.csv', content)
  // file written successfully
} catch (err) {
  console.error(err)
}
