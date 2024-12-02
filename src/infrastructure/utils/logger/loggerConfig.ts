import winston from 'winston'
import { format } from 'date-fns'
import path from 'path'

import config from '../../../config/config'

const appLogPath: string = path.join(__dirname, '..', '..', '..', 'storage/logger')
const filePrefix: string = format(new Date(), 'yyyyMMdd')

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = config.app.isDevelopment ? 'debug' : 'warn'

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSSS' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message} ${info.stack ? info.stack : ''}`
  )
)

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true })
    )
  }),
  new winston.transports.File({
    filename: `${appLogPath}/${filePrefix}-error.log`,
    level: 'error',
    options: {
      encoding: 'utf8',
      flags: 'a'
    }
  }),
  new winston.transports.File({
    filename: `${appLogPath}/${filePrefix}-all.log`,
    options: {
      encoding: 'utf8',
      flags: 'a'
    }
  })
]

const winstonLogger = winston.createLogger({
  level,
  levels,
  format: logFormat,
  transports
})

export default winstonLogger
