import express from 'express'
import cors from 'cors'
import {UnknownRoutesHandler} from './middlewares/unknown.handler.js'
import {ExceptionsHandler} from './middlewares/exceptions.handler.js'
import {DGCCRFRSSController} from './controllers/dgccrfrss.controller.js'
import morgan from 'morgan'
import {CategoriesController} from './controllers/categories.controller.js'

const app = express()

app.use(morgan('short'))

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())

app.use('/v1/actus', DGCCRFRSSController)
app.use('/v1/categories', CategoriesController)

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler)

export {app}
