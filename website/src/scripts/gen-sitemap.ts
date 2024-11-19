import fs from 'fs'
import path from 'path'
import {getNewsArticleData} from '../components_feature/actualites/newsArticlesData'
import {appConfig} from '../core/appConfig'
import {buildLinkNewsArticle} from '../core/buildLinks'
import {internalPageDefs} from '../core/pagesDefinitions'
import {AppLangs} from '../i18n/localization/AppLangs'
import {allVisibleAirtableLandings} from '../landings/airtableLandings/airtableLandingsUtils'
import {getManualLandings} from '../landings/manualLandings/manualLandingsUtils'

interface SitemapItem {
  url: string
  priority: number
  hasEnglishVersion?: boolean
  mainLang: AppLangs
}

const outputFile = path.join('./public/sitemap.xml')

const sitemapItems: SitemapItem[] = [
  ...Object.values(internalPageDefs)
    .filter(_ => !_.noIndex)
    .map(_ => ({url: _.url, hasEnglishVersion: _.hasEnglishVersion, mainLang: AppLangs.fr, priority: 1})),
  ...landings(AppLangs.fr),
  ...landings(AppLangs.en),
  ...getNewsArticleData()
    .map(_ => {
      return {
        mainLang: _.lang as AppLangs,
        url: buildLinkNewsArticle(_),
      }
    })
    .map(_ => ({..._, priority: 1})),
]

function landings(lang: AppLangs) {
  return [...allVisibleAirtableLandings(lang), ...getManualLandings(lang)]
    .map(_ => `/${_.url}`)
    .map(url => ({url, lang, mainLang: lang, priority: 1}))
}

//See https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr#sitemap
function createSitemapXml(items: SitemapItem[]): string {
  const urls = items
    .map(item => {
      const priority = `<priority>${item.priority.toFixed(1)}</priority>`
      const mainUrl = `${appConfig.websiteBaseUrl}/${item.mainLang}${item.url}`
      const alternateEn = item.hasEnglishVersion
        ? `<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${`${appConfig.websiteBaseUrl}/en${item.url}`}"/>`
        : ''

      const alternateMain = `<xhtml:link
      rel="alternate"
      hreflang="${item.mainLang}"
      href="${mainUrl}"/>`

      return `  <url>
    <loc>${mainUrl}</loc>         
    ${alternateMain}   
    ${alternateEn}   
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

generateSitemap(sitemapItems)
