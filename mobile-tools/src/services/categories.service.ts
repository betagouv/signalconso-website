import fs from 'fs'

export interface Category {
  category: string
  description: string
  id: string
}

const anomaliesFr = JSON.parse(fs.readFileSync('../shared/anomalies/json/anomalies_fr.json', 'utf-8'))
const anomaliesEn = JSON.parse(fs.readFileSync('../shared/anomalies/json/anomalies_en.json', 'utf-8'))

const categoriesFr: Category[] = anomaliesFr.map((anomaly: any) => {
  return {
    category: anomaly.category,
    description: anomaly.description,
    id: anomaly.id,
  }
})

const categoriesEn: Category[] = anomaliesEn.map((anomaly: any) => {
  return {
    category: anomaly.category,
    description: anomaly.description,
    id: anomaly.id,
  }
})

export const categories = {
  fr: categoriesFr,
  en: categoriesEn,
}
