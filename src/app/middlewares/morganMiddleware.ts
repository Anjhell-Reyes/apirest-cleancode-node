import morgan, { StreamOptions } from 'morgan'
import { Request } from 'express'

import config from '../../config/config'
import IoC from '../../bootstrap/ioc/serviceCollection'

const logger = IoC.getLogger()

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message: string) => logger.http(message)
}

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = (): boolean => !config.app.isDevelopment

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  '[:date[iso]] :remote-addr ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :req-body :response-time ms',
  { stream, skip }
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
)

morgan.token('req-body', (req: Request) => JSON.stringify(req.body))

export default morganMiddleware
