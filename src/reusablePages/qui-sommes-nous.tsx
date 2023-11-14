import {MemberCard} from '@/components_simple/MemberCard'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {getTeam} from '@/core/team'
import {Metadata} from 'next'
import Link from 'next/link'
import {getI18n} from '../i18n/I18nDictionnary'
import {AppLang} from '../i18n/localization/AppLangs'

// Avatars générés sur face.co

export function getMetadata(lang: AppLang): Metadata {
  const {messages: m} = getI18n(lang)

  return {
    title: m.titleAndDescriptions.quiSommesNous.title,
    description: m.titleAndDescriptions.quiSommesNous.description,
  }
}

export const QuiSommesNous = ({params}: any) => {
  const {messages: m} = getI18n(params.lang)

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
          <ul className="p-0 list-none grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 fr-pb-4w">
            {getTeam(params.lang).current.map(_ => (
              <li key={_.name}>
                <MemberCard key={_.name} member={_} />
              </li>
            ))}
          </ul>
          <h2>{m.quiSommesNous.formerMembersTitle}</h2>
          <ul className="p-0 list-none grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 fr-pb-4w">
            {getTeam(params.lang).former.map(_ => (
              <li key={_.name}>
                <MemberCard key={_.name} member={_} disabled />
              </li>
            ))}
          </ul>
        </div>
      </ContentPageContainer>
    </>
  )
}
