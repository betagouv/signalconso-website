import fs from 'fs'
import {Config} from '../config/config.js'

export interface Category {
  category: string
  description: string
  id: string
  path: string
  img: string
}

const anomaliesFr = JSON.parse(fs.readFileSync('../shared/anomalies/json/anomalies_fr.json', 'utf-8'))
const anomaliesEn = JSON.parse(fs.readFileSync('../shared/anomalies/json/anomalies_en.json', 'utf-8'))

export const minimizedAnomaliesFr = JSON.parse(fs.readFileSync('../shared/anomalies/json/minimized-anomalies_fr.json', 'utf-8'))
export const minimizedAnomaliesEn = JSON.parse(fs.readFileSync('../shared/anomalies/json/minimized-anomalies_en.json', 'utf-8'))

const categoriesFr: Category[] = anomaliesFr.map((anomaly: any) => {
  return {
    category: anomaly.category,
    description: anomaly.description,
    id: anomaly.id,
    path: anomaly.path,
    img: `${Config.websiteUrl}/image/pictos/${anomaly.img}.png`,
  }
})

const categoriesEn: Category[] = anomaliesEn.map((anomaly: any) => {
  return {
    category: anomaly.category,
    description: anomaly.description,
    id: anomaly.id,
    path: anomaly.path,
    img: `${Config.websiteUrl}/image/pictos/${anomaly.img}.png`,
  }
})

export const categories = {
  fr: categoriesFr,
  en: categoriesEn,
}
