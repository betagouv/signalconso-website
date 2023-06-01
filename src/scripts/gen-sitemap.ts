import fs from 'fs'
import {allVisibleLandings} from '../landings/landingDataUtils'
import path from 'path'
import {appConfig} from '../core/appConfig'
import {newsArticlesData} from '../actualites/newsArticlesData'
import {buildLinkLandingPage, buildLinkNewsArticle, internalPageDefs} from '../core/pagesDefinitions'

interface SitemapItem {
  url: string
  priority: number
}

const outputFile = path.join('./public/sitemap.xml')

const sitemapItems: SitemapItem[] = [
  ...Object.values(internalPageDefs)
    .filter(_ => !_.noIndex)
    .map(_ => _.url),
  ...allVisibleLandings().map(buildLinkLandingPage),
  ...newsArticlesData.map(buildLinkNewsArticle),
]
  .map(url => `${appConfig.appBaseUrl}${url}`)
  .map(url => ({url, priority: 1}))

function createSitemapXml(items: SitemapItem[]): string {
  const urls = items
    .map(item => {
      const priority = `<priority>${item.priority.toFixed(1)}</priority>`
      return `  <url>
    <loc>${item.url}</loc>
    ${priority}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
