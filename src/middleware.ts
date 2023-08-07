import {NextResponse} from 'next/server'

import Negotiator from 'negotiator'
import {AppLang, AppLangs, getSupportedLang} from './i18n/localization/AppLangs'
import {match} from '@formatjs/intl-localematcher'
import {internalPageDefs, pagesDefs} from './core/pagesDefinitions'
import {appConfig} from './core/appConfig'

let supportedLang = appConfig.translationFeatureFlagEnabled ? [AppLangs.en, AppLangs.fr] : [AppLangs.fr]

export function middleware(request: any) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathIsMissingSupportedLang = supportedLang.every(lang => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`)
  const currentPathLang = pathname!.toLowerCase().split('/')[1]
  const currentCookieLang: string | undefined = request.cookies.get('NEXT_LANG')?.value

  currentCookieLang && removeUnsupportedLangInCookiesIfAny(request, currentCookieLang)

  // No local in path, get the cookie lang or header lang or default lang
  if (pathIsMissingSupportedLang) {
    //Should always redirect to French version when /webview with no lang to ensure backward compatibility to mobile app
    const isWebviewAndShouldRedirectToFr = isWebview(pathname)

    const computedLang =
      isWebviewAndShouldRedirectToFr || !appConfig.translationFeatureFlagEnabled
        ? AppLangs.fr
        : computeLang(currentCookieLang, request.headers)

    const redirectUrl = `/${computedLang}/${pathname}`
    return buildRedirectToNewLangResponse(request, redirectUrl, computedLang)
  } else {
    const noAlternateLangForCurrentPage = Object.values(internalPageDefs).filter(_ => {
      return !_.hasAlternate && pathname.includes(_.url) && currentPathLang === AppLangs.en
    })

    if (noAlternateLangForCurrentPage.length > 0) {
      return NextResponse.redirect(new URL(`${pagesDefs.index.url}`, request.url))
    }

    // path contains lang but =! from cookie lang => update cookie lang
    if (currentCookieLang != currentPathLang) {
      const redirectUrl = currentCookieLang ? pathname.replace(/\/[^/]+(?=\/|$)/, `/${currentPathLang}`) : pathname
      return buildRedirectToNewLangResponse(request, redirectUrl, currentPathLang)
    }
  }
}

const isWebview = (pathname: string) => {
  const regexPattern = `^\\/webview\\/`
  const regex = new RegExp(regexPattern)
  return regex.test(pathname)
}

function removeUnsupportedLangInCookiesIfAny(request: any, currentCookieLang: string) {
  if (getSupportedLang(currentCookieLang)) {
    request.cookies.delete('NEXT_LANG')
  }
}

function buildRedirectToNewLangResponse(request: any, redirectUrl: string, newLang: string) {
  // You have to clone the url to keep query params
  const url = request.nextUrl.clone()
  url.pathname = redirectUrl

  const res = NextResponse.redirect(new URL(url, request.url))
  res.cookies.set('NEXT_LANG', newLang)
  return res
}

function computeLang(currentCookieLang: string | undefined, headers: any) {
  if (currentCookieLang) {
    return currentCookieLang
  } else {
    const defaultLang = AppLangs.fr
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    headers.forEach((value: string, key: string) => (negotiatorHeaders[key] = value))

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({headers: negotiatorHeaders}).languages()
    return currentCookieLang || match(languages, supportedLang, defaultLang)
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|sitemap.xml|robots.txt|_next/image|image|icons|favicon.ico).*)',
  ],
}
