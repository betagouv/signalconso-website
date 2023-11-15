import {I18nMessages, getI18n} from '@/i18n/I18nDictionnary'
import {AppLangs, supportedLang} from '@/i18n/localization/AppLangs'
import {PageDefInternal, internalPageDefs} from './pagesDefinitions'

// Most pages are just under /[lang]
// so they can use this type without providing the generic parameter
export type PathParams<OtherPathParams = {}> = {
  lang: AppLangs
} & OtherPathParams

export type SearchParams = {[key: string]: string | string[] | undefined}

export type PageComponentProps<LocalPathParams = PathParams> = {
  params: LocalPathParams
  searchParams: SearchParams
}

export type GenerateMetadataArg<OtherPathParams = {}> = {
  params: PathParams<OtherPathParams>
  searchParams: SearchParams
}

type InternalPageDefs = keyof typeof internalPageDefs
type InternalPageDefsWithoutPlayground = Exclude<InternalPageDefs, 'playground'>

// Mutualized "generateMetadata" function
// Works nicely for simple, unique pages (ex: /fr/contact)
// For pages with more complex paths and rules we might need to do stuff more manually
export function buildGenerateMetadata(
  // the name of the page must be the same in pageDefs
  // and in i18n messages
  pageName: InternalPageDefsWithoutPlayground & keyof I18nMessages['titleAndDescriptions'],
) {
  return function (arg: GenerateMetadataArg) {
    const lang = arg.params.lang
    const pageDef = internalPageDefs[pageName]
    return {
      ...generateTitleAndDescription(lang, pageName),
      ...generateAlternatesMetadata(lang, pageDef),
      ...generateRobotsMetadata(pageDef),
    }
  }
}

// For pages that have a complex path
// (so we can't use the more generic function)
// that don't need to be indexed
// that need to be viewed by the user (we need a title)
export function buildGenerateMetadataForNoIndexPage(pageName: keyof I18nMessages['titleAndDescriptions']) {
  return function (arg: GenerateMetadataArg) {
    const lang = arg.params.lang
    return {
      ...generateTitleAndDescription(lang, pageName),
      ...generateRobotsMetadata({noIndex: true}),
    }
  }
}

export function buildGenerateMetadataForWebviews() {
  return function () {
    return {
      ...generateRobotsMetadata({noIndex: true}),
    }
  }
}

function generateAlternatesMetadata(lang: AppLangs, pageDef: PageDefInternal) {
  return pageDef.noIndex
    ? null
    : {
        alternates: {
          canonical: buildCleanUrl(lang, pageDef),
          ...(pageDef.hasAlternate
            ? {
                languages: Object.fromEntries(
                  supportedLang.map(l => {
                    return [l, buildCleanUrl(l, pageDef)]
                  }),
                ),
              }
            : null),
        },
      }
}

export function generateRobotsMetadata({noIndex}: {noIndex: boolean}) {
  return noIndex
    ? {
        robots: {
          index: false,
        },
      }
    : null
}

export function generateTitleAndDescription(
  lang: AppLangs,
  pageKeyInMessages: keyof I18nMessages['titleAndDescriptions'],
): {title: string; description: string} {
  const {messages: m} = getI18n(lang)
  return m.titleAndDescriptions[pageKeyInMessages]
}

function withoutTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s
}

// relative url, with lang, without ending slash
function buildCleanUrl(lang: string, pageDef: PageDefInternal) {
  return withoutTrailingSlash(`/${lang}${pageDef.url}`)
}
