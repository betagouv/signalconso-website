import {Request, Router} from 'express'
import {categories, minimizedAnomaliesEn, minimizedAnomaliesFr} from '../services/categories.service.js'

interface QueryParams {
  lang?: 'fr' | 'en'
}

const CategoriesController = Router()

CategoriesController.get('/', async (req: Request<{}, {}, {}, QueryParams>, res, next) => {
  try {
    const lang = req.query.lang ?? 'fr'
    return res.status(200).send(categories[lang].sort((a, b) => Number(a.id) - Number(b.id)))
  } catch (err) {
    next(err)
  }
})

CategoriesController.get('/minimized', async (req: Request<{}, {}, {}>, res, next) => {
  try {
    return res.status(200).send({
      fr: minimizedAnomaliesFr,
      en: minimizedAnomaliesEn,
    })
  } catch (err) {
    next(err)
  }
})

export {CategoriesController}
