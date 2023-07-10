import {MemberCard} from 'components_feature/MemberCard/MemberCard'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {team} from 'core/team'
import Head from 'next/head'
import Link from 'next/link'
import {useI18n} from '../i18n/I18n'
import {Metadata} from 'next'
import {getI18n} from '../i18n/I18nDictionnary'

// Avatars générés sur face.co

export function getMetadata(): Metadata {
  const {messages: m} = getI18n('fr')

  return {
    title: m.titleAndDescriptions.quiSommesNous.title,
    description: m.titleAndDescriptions.quiSommesNous.description,
  }
}

export const QuiSommesNous = () => {
  const {messages: m} = getI18n('fr')

  return (
    <>
      <ContentPageContainer>
        <h1>{m.quiSommesNous.title}</h1>
        <div>
          <div>
            <h2>{m.quiSommesNous.structureTitle}</h2>
            <p>{m.quiSommesNous.structureDescription}</p>
            <p>
              {m.quiSommesNous.structureDGCCRFDescription}
              <Link target="_blank" href="https://www.economie.gouv.fr/dgccrf">
                {m.quiSommesNous.structureDGCCRFLink}
              </Link>{' '}
              {m.quiSommesNous.structureDGCCRFMissionDescription}
            </p>
            <ul className="list-inside pl-6">
              <li>{m.quiSommesNous.structureDGCCRFMarketRegulation}</li>
              <li>{m.quiSommesNous.structureDGCCRFConsumerProtection}</li>
              <li>{m.quiSommesNous.structureDGCCRFConsumerSafety}</li>
            </ul>
          </div>

          <div className="">
            <h2>{m.quiSommesNous.workingMethodTitle}</h2>
            <p>{m.quiSommesNous.workingMethodDescription}</p>
            <p>{m.quiSommesNous.workingMethodProductEvolution}</p>

            <blockquote className="text-gray-500 pl-4 border-l-2 border-gray-300">
              <p>
                {m.quiSommesNous.workingMethodQuote}
                <br />
                <span>{m.quiSommesNous.workingMethodQuoteAuthor}</span>
              </p>
            </blockquote>
          </div>
          <h2>{m.quiSommesNous.teamTitle}</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 fr-pb-4w">
            {team.current.map(_ => (
              <MemberCard key={_.avatar} member={_} />
            ))}
          </div>
          <h2>{m.quiSommesNous.formerMembersTitle}</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 fr-pb-4w">
            {team.former.map(_ => (
              <MemberCard key={_.avatar} member={_} disabled />
            ))}
          </div>
        </div>
      </ContentPageContainer>
    </>
  )
}
