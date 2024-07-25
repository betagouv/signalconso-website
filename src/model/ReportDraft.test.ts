import {toApiInfluencer} from '@/feature/fromReportDraftToApi'
import {SocialNetwork} from '../anomalies/Anomaly'
import {Fixture} from '../test/fixture'

describe('ReportDraft.toApi', () => {
  it('should correctly convert the social network', () => {
    const toString = (socialNetwork: SocialNetwork) => {
      switch (socialNetwork) {
        case 'YOUTUBE':
          return 'YouTube'
        case 'FACEBOOK':
          return 'Facebook'
        case 'INSTAGRAM':
          return 'Instagram'
        case 'TIKTOK':
          return 'TikTok'
        case 'TWITTER':
          return 'Twitter'
        case 'LINKEDIN':
          return 'LinkedIn'
        case 'SNAPCHAT':
          return 'Snapchat'
        case 'TWITCH':
          return 'Twitch'
      }
    }
    const influencer = Fixture.genInfluencer()
    const result = toApiInfluencer(influencer)
    expect(result).toEqual({
      name: influencer.name,
      socialNetwork: toString(influencer.socialNetwork),
    })
  })
})
