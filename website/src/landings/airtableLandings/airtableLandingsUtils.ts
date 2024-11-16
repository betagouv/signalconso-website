import {allVisibleAnomalies} from '../../anomalies/Anomalies'
import {AppLangs} from '../../i18n/localization/AppLangs'
import {enAirtableLandingsData} from './airtableLandingsData_en'
import {frAirtableLandingsData} from './airtableLandingsData_fr'

export type AirtableLandingData = {
  isSemiAutomatic: boolean
  lang: string
  // can target multiple categories, or one, or zero (then we target the homepage)
  targetedCategory: string[]
  url: string
  seoTitle: string
  seoDescription: string
  title: string
  catchPhrase: string
  secondaryTitle1: string
  secondaryTitle2?: string
  otherTitle1?: string
  otherText1?: string
  otherTitle2?: string
  otherText2?: string
  otherTitle3?: string
  otherText3?: string
  otherTitle4?: string
  otherText4?: string
  otherTitle5?: string
  otherText5?: string
  sampleReports: {text: string; author: string}[]
}

export function allVisibleAirtableLandings(lang: AppLangs): AirtableLandingData[] {
  const visibleAnomalies = allVisibleAnomalies(lang)
  const landingsData = lang === AppLangs.fr ? frAirtableLandingsData : enAirtableLandingsData
  // Filter out the demo landing, if the demo category is not visible
  return landingsData.filter(landingData => {
    if (landingData.isSemiAutomatic) {
      const category = landingData.targetedCategory[0]
      const correspondingVisibleAnomaly = visibleAnomalies.find(_ => _.category === category)
      return correspondingVisibleAnomaly !== undefined
    }
    return true
  })
}
