import {allVisibleAnomalies, findAnomaly} from '../anomalies/Anomalies'
import {landingsData} from './landingsData'

export type LandingData = {
  isSemiAutomatic: boolean
  // can target multiple categories, or one, or zero (then we target the homepage)
  targetedCategory: string[]
  url: string
  seoTitle: string
  seoDescription: string
  title: string
  catchPhrase: string
  secondaryTitle1: string
  secondaryTitle2: string
  sampleReports: {text: string; author: string}[]
}

export function allVisibleLandings(): LandingData[] {
  const visibleAnomalies = allVisibleAnomalies()
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
