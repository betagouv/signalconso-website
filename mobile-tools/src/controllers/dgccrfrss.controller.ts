import {Request, Router} from 'express'
import {feed} from '../services/dgccrfrss.service.js'

const DGCCRFRSSController = Router()

DGCCRFRSSController.get('/', async (req: Request<{}, {}, {}>, res, next) => {
  try {
    return res.status(200).send(feed)
  } catch (err) {
    next(err)
  }
})

export {DGCCRFRSSController}
