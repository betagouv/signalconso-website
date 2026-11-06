import {Router} from 'express'
import {health, unknownBuildInfo} from '../services/health.service.js'

const HealthController = Router()

/**
 * Les infos de build sont lues au démarrage dans index.ts et stockées dans app.locals.buildInfo
 */
HealthController.get('/', (req, res) => {
  return res.status(200).json(health(req.app.locals.buildInfo ?? unknownBuildInfo))
})

export {HealthController}
