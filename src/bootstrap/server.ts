import express, { Router } from 'express'
import * as http from 'http'
import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import cors from "cors";
import handlebars from 'handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import path from 'path'

import { registerRoutes } from '../routes'
import errorHandlerMiddleware from '../app/middlewares/errorHandlerMiddleware'
import morganMiddleware from '../app/middlewares/morganMiddleware'
import { AppConfig } from '../config/appConfig'
import * as swaggerDocument from './../../swagger.json'

//const compression = require('compression');

// Helper formatShortDate
handlebars.registerHelper('formatShortDate', function (date) {
  const dateObject = new Date(date)
  const day = dateObject.getDate()
  const month = dateObject.toLocaleString('default', { month: 'short' })
  const year = dateObject.getFullYear()
  return new handlebars.SafeString(`${day} ${month} ${year}`)
})

// Helper formatNumber
handlebars.registerHelper('formatNumber', function (number) {
  return new handlebars.SafeString(number.toLocaleString())
})

export default class Server {
  private readonly server: express.Express

  private httpServer?: http.Server

  constructor(
    private readonly config: AppConfig
  ) {
    this.server = express()
    this.server.use(express.json({limit:'50mb'}))
    this.server.use(express.urlencoded({extended:true,limit:'50mb'}))
  }

  getHTTPServer (): Server['httpServer'] {
    return this.httpServer
  }

  async start (): Promise<void> {
    await this.registerServices()

    return await new Promise(resolve => {

      this.httpServer = this.server.listen(this.config.port, () => {

        console.log(`Server is running on port ${this.config.port} in ${this.config.env} mode`)
        console.log('Press CTRL-C to stop\n')
      })
      resolve()
    })
  }

  async stop (): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close(error => {
          if (error != null) {
            reject(error)
          }
        })
      }

      resolve()
    })
  }

  private async registerServices(): Promise<void> {    
    this.server.use(json())
    this.server.use(urlencoded({ extended: false }))
    this.registerHelmet()
    this.server.use(cors())
    this.server.use(morganMiddleware)
    this.server.use(compression())
    // zona horaria de la aplicacion en Bogota
    //process.env.TZ = 'America/Bogota'
    // Configuración y registro de Handlebars y sus helpers
    this.registerHandlebars()
    await this.registerRoutes()
    this.server.use(errorHandlerMiddleware)
    this.registerSwagger()
  }

  private registerHelmet(): void {
    this.server.use(helmet.xssFilter())
    this.server.use(helmet.noSniff())
    this.server.use(helmet.hidePoweredBy())
    this.server.use(helmet.frameguard({ action: 'deny' }))
  }

  private async registerRoutes() {
    const router = Router()
    this.server.use(router)
    await registerRoutes(router, this.config.prefix)
  }

  private registerSwagger(): void {
    this.server.use(
      this.config.swaggerPath,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, { explorer: true })
    )
  }

  private registerHandlebars (): void {
    // Directorio donde se encuentran las plantillas Handlebars
    this.server.set('views', path.join(__dirname, '/assets/templates/pdf'))

    this.server.engine('hbs', handlebars.create)
    this.server.set('view engine', 'hbs')

    // Registro de helpers de handlebars-helpers
    handlebarsHelpers({ handlebars })
  }
}
