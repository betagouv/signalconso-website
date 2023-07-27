import {NextResponse} from 'next/server'

import Negotiator from 'negotiator'
import {AppLangs} from './i18n/localization/AppLangs'
import {match} from '@formatjs/intl-localematcher'

//TODO BEGIN REVERT FOR MULTI LANG SUPPORT
// let supportedLang = [AppLangs.en, AppLangs.fr]
//TODO END REVERT FOR MULTI LANG SUPPORT
let supportedLang = [AppLangs.fr]

export function middleware(request: any) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLang = supportedLang.every(lang => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`)
  const currentPathLang = pathname!.toLowerCase().split('/')[1]
  const currentCookieLang = request.cookies.get('NEXT_LANG')?.value

  if (supportedLang.every(lang => lang != currentCookieLang)) {
    request.cookies.delete('NEXT_LANG')
  }

  // No local in path, get the cookie lang or header lang or default lang
  if (pathnameIsMissingLang) {
    //TODO BEGIN REVERT FOR MULTI LANG SUPPORT
    // const defaultLang = AppLangs.fr
    // // Negotiator expects plain object so we need to transform headers
    // const negotiatorHeaders: Record<string, string> = {}
    // request.headers.forEach((value: string, key: string) => (negotiatorHeaders[key] = value))
    //
    // // Use negotiator and intl-localematcher to get best locale
    // let languages = new Negotiator({headers: negotiatorHeaders}).languages()
    // const locale = currentCookieLang || match(languages, supportedLang, defaultLang)
    //TODO END REVERT FOR MULTI LANG SUPPORT
    const locale = AppLangs.fr

    // You have to clone the url to keep query params
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/${pathname}`

    const res = NextResponse.redirect(new URL(url, request.url))
    res.cookies.set('NEXT_LANG', locale)
    return res
  }

  // path contains lang but =! from cookie lang => update cookie lang
  if (!pathnameIsMissingLang && currentCookieLang != currentPathLang) {
    // You have to clone the url to keep query params
    const url = request.nextUrl.clone()
    url.pathname = currentCookieLang ? pathname.replace(/\/[^/]+(?=\/|$)/, `/${currentPathLang}`) : pathname

    const res = NextResponse.redirect(new URL(url, request.url))
    res.cookies.set('NEXT_LANG', currentPathLang)
    return res
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|sitemap.xml|_next/image|image|favicon.ico).*)',
  ],
}
