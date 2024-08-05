import fs from 'fs'

export const feed = JSON.parse(fs.readFileSync('./feed.json', 'utf-8'))
