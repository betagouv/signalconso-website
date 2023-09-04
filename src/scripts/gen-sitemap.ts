import fs from 'fs'
import {allVisibleLandings} from '../landings/landingDataUtils'
import path from 'path'
import {appConfig} from '../core/appConfig'
import {newsArticlesData} from '../components_feature/actualites/newsArticlesData'
import {buildLinkNewsArticle, internalPageDefs} from '../core/pagesDefinitions'
import {AppLangs} from '../i18n/localization/AppLangs'

interface SitemapItem {
  url: string
  priority: number
  hasAlternate?: boolean
  mainLang: AppLangs
}

const outputFile = path.join('./public/sitemap.xml')

const sitemapItems: SitemapItem[] = [
  ...Object.values(internalPageDefs)
    .filter(_ => !_.noIndex)
    .map(_ => ({url: _.url, hasAlternate: _.hasAlternate, mainLang: AppLangs.fr, priority: 1})),
  ...landing(AppLangs.fr),
  ...(appConfig.translationFeatureFlagEnabled ? [...landing(AppLangs.en)] : []),
  ...newsArticlesData
    .filter(_ => appConfig.translationFeatureFlagEnabled || _.lang == AppLangs.fr)
    .map(_ => {
      return {
        mainLang: _.lang as AppLangs,
        url: buildLinkNewsArticle(_),
      }
    })
    .map(_ => ({..._, priority: 1})),
]

function landing(lang: AppLangs) {
  return allVisibleLandings(lang)
    .map(_ => `/${_.url}`)
    .map(url => ({url, lang, mainLang: lang, priority: 1}))
}

//See https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr#sitemap
function createSitemapXml(items: SitemapItem[]): string {
  const urls = items
    .map(item => {
      const priority = `<priority>${item.priority.toFixed(1)}</priority>`

      const alternateEn = item.hasAlternate
        ? `<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${`${appConfig.appBaseUrl}/en${item.url}`}"/>`
        : ''

      const alternateMain = `<xhtml:link
      rel="alternate"
      hreflang="${item.mainLang}"
      href="${`${appConfig.appBaseUrl}/${item.mainLang}${item.url}`}"/>`

      return `  <url>
    <loc>${`${appConfig.appBaseUrl}/${item.mainLang}${item.url}`}</loc>         
    ${alternateMain}   
    ${appConfig.translationFeatureFlagEnabled ? alternateEn : ''}   
    ${priority}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
}

function generateSitemap(items: SitemapItem[]): void {
  console.log(`Generating ${outputFile}`)
  const xml = createSitemapXml(items)
  fs.writeFileSync(outputFile, xml)
  console.log(`${outputFile} generated.`)
}

console.log('appConfig.translationFeatureFlagEnabled')
console.log(appConfig.translationFeatureFlagEnabled)
console.log('appConfig.translationFeatureFlagEnabled')

generateSitemap(sitemapItems)
