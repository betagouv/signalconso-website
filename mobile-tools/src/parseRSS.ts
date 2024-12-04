import {fetchDGCCRFRSS} from './clients/dgccrf.rss.client.js'
import jsdom from 'jsdom'
import {DGCCRFActuRSSFeed, DGCCRFActuRssItem} from './models/model.js'
import fs from 'fs'

const rssAsTxt = await fetchDGCCRFRSS()
const dom = new jsdom.JSDOM(rssAsTxt, {contentType: 'text/xml'})
const nodes = dom.window.document.querySelectorAll('item')
const channel = dom.window.document.querySelector('channel')

const res: DGCCRFActuRssItem[] = []

nodes.forEach(node => {
  const title = node.querySelector('title')?.textContent ?? undefined
  const link = node.querySelector('link')?.textContent ?? undefined
  const description = node.querySelector('description')?.textContent ?? undefined
  const guid = node.querySelector('guid')?.textContent ?? undefined
  const date = node.querySelector('pubDate')?.textContent

  res.push({
    title,
    link,
    description,
    guid,
    date: date ? new Date(date).toISOString() : undefined,
  })
})

const fetchedFeed: DGCCRFActuRSSFeed = {
  title: channel?.querySelector('title')?.textContent ?? '',
  link: channel?.querySelector('link')?.textContent ?? '',
  description: channel?.querySelector('description')?.textContent ?? '',
  items: res,
}

const filteredFetchedFeed: DGCCRFActuRSSFeed = {
  title: fetchedFeed.title,
  link: fetchedFeed.link,
  description: fetchedFeed.description,
  items: fetchedFeed.items.filter(item => !!item.description && !!item.title),
}

let writtenFeed: DGCCRFActuRSSFeed | null = null
try {
  const file = fs.readFileSync('./feed.json', 'utf-8')
  writtenFeed = JSON.parse(file)
} catch (err) {
  console.log(err)
}

const newFeed: DGCCRFActuRSSFeed = writtenFeed || filteredFetchedFeed
if (writtenFeed) {
  const writtenItems = writtenFeed.items
  const newItems = filteredFetchedFeed.items.filter(item => writtenItems.findIndex(i => i.guid === item.guid) < 0)
  newFeed.items = newItems
    .concat(writtenItems)
    .sort((a, b) => (a.date && b.date ? -a.date.localeCompare(b.date) : 0))
    .slice(0, 20)
}

try {
  fs.writeFileSync('./feed.json', JSON.stringify(newFeed, null, 2))
} catch (err) {
  console.error(err)
}
