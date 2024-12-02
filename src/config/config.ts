//import dotenv from 'dotenv'
import * as dotenv from 'dotenv';

import { DatabaseConfig } from './dbConfig'
import { AppConfig } from './appConfig'
import { BusinessConfig } from './businessConfig'

dotenv.config()

class Config {
  constructor(
    readonly app = new AppConfig(),
    readonly db = new DatabaseConfig(),
    readonly business = new BusinessConfig()
  ) {
  }
}

let config: Config

try {
  config = new Config()
} catch (error) {
  const err = error as Error
  err.message = `Error loading config: ${err.message} environment variable is not defined`
  throw err
}

export default config
