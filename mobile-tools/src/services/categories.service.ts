import fs from 'fs'
import {Config} from '../config/config.js'

export interface Category {
  category: string
  name: string
  description: string
  id: string
  path: string
  img: string
}

const anomaliesFr = JSON.parse(fs.readFileSync('../shared/anomalies/json/anomalies_fr.json', 'utf-8'))
const anomaliesEn = JSON.parse(fs.readFileSync('../shared/anomalies/json/anomalies_en.json', 'utf-8'))

export const minimizedAnomaliesFr = JSON.parse(fs.readFileSync('../shared/anomalies/json/minimized-anomalies_fr.json', 'utf-8'))
export const minimizedAnomaliesEn = JSON.parse(fs.readFileSync('../shared/anomalies/json/minimized-anomalies_en.json', 'utf-8'))

const specialCategories = ['OpenFoodFacts', 'RappelConso']

const categoriesFr: Category[] = anomaliesFr
  .filter((anomaly: any) => !anomaly.hidden && !anomaly.isHiddenDemoCategory)
  .filter((anomaly: any) => !anomaly.specialCategory)
  .map((anomaly: any) => {
    return {
      category: anomaly.title,
      description: anomaly.description,
      id: anomaly.id,
      path: anomaly.path,
      img: `${Config.websiteUrl}/image/pictos/${anomaly.img}`,
    }
  })

const categoriesEn: Category[] = anomaliesEn
  .filter((anomaly: any) => !anomaly.hidden && !anomaly.isHiddenDemoCategory)
  .filter((anomaly: any) => !anomaly.specialCategory)
  .map((anomaly: any) => {
    return {
      category: anomaly.title,
      description: anomaly.description,
      id: anomaly.id,
      path: anomaly.path,
      img: `${Config.websiteUrl}/image/pictos/${anomaly.img}`,
    }
  })

export const categories = {
  fr: categoriesFr.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)),
  en: categoriesEn.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)),
}
