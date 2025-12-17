import {NextResponse} from 'next/server'

import Negotiator from 'negotiator'
import {AppLangs, getSupportedLang} from './i18n/localization/AppLangs'
import {match} from '@formatjs/intl-localematcher'

// Order is important for lang selection below, first is preferred lang
let supportedLang = [AppLangs.fr, AppLangs.en]

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

    const computedLang = isWebviewAndShouldRedirectToFr ? AppLangs.fr : computeLang(currentCookieLang, request.headers)

    const redirectUrl = `/${computedLang}/${pathname}`
    return buildRedirectToNewLangResponse(request, redirectUrl, computedLang)
  } else {
    // path contains lang but =! from cookie lang => rewrite update cookie lang
    if (currentCookieLang != currentPathLang) {
      return buildRewriteToNewLangResponse(request, pathname, currentPathLang)
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

function buildRewriteToNewLangResponse(request: any, rewriteUrl: string, newLang: string) {
  // You have to clone the url to keep query params
  const url = request.nextUrl.clone()
  url.pathname = rewriteUrl

  const res = NextResponse.rewrite(new URL(url, request.url))
  res.cookies.set('NEXT_LANG', newLang)
  return res
}

function computeLang(currentCookieLang: string | undefined, headers: any) {
  if (currentCookieLang) {
    return currentCookieLang
  } else {
    return AppLangs.fr
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|sitemap.xml|robots.txt|_next/image|image|icons|favicon.ico).*)',
  ],
}
