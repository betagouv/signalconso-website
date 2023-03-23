import {ReportDraft} from './ReportDraft'
import {Fixture} from '../test/fixture'
import {SocialNetworks} from '../anomalies/Anomaly'

describe('ReportDraft.toApi', () => {
  it('should correctly convert the social network', () => {
    const toString = (socialNetwork: SocialNetworks) => {
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
    const result = ReportDraft.toApiInfluencer(influencer)
    expect(result).toEqual({
      name: influencer.name,
      socialNetwork: toString(influencer.socialNetwork),
    })
  })
})
