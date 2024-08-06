import request from 'supertest'
import {app} from './app'
import {Category} from './services/categories.service'
import {Config} from './config/config'

describe('Test the actus path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/actus')
    expect(response.statusCode).toBe(200)
  })
})

describe('Test the categories path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/categories')
    expect(response.statusCode).toBe(200)
  })

  test('It should return french categories by default', async () => {
    const response = await request(app).get('/v1/categories')
    const categories = response.body as Category[]
    expect(categories).toContainEqual({
      category: 'AchatMagasin',
      description: 'Prix, promotion, qualité, poids, garantie, magasin éphémère…',
      id: '10',
      path: 'achat-magasin',
      img: `${Config.websiteUrl}/image/pictos/category-store.png`,
    })
  })
  test('It should return french categories', async () => {
    const response = await request(app).get('/v1/categories').query({lang: 'fr'})
    const categories = response.body as Category[]
    expect(categories).toContainEqual({
      category: 'AchatMagasin',
      description: 'Prix, promotion, qualité, poids, garantie, magasin éphémère…',
      id: '10',
      path: 'achat-magasin',
      img: `${Config.websiteUrl}/image/pictos/category-store.png`,
    })
  })
  test('It should return english categories', async () => {
    const response = await request(app).get('/v1/categories').query({lang: 'en'})
    const categories = response.body as Category[]
    expect(categories).toContainEqual({
      category: 'AchatMagasin',
      description: 'Price, promotion, quality, weight, warranty, etc.',
      id: '10',
      path: 'achat-magasin',
      img: `${Config.websiteUrl}/image/pictos/category-store.png`,
    })
  })
})
