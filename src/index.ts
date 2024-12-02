import 'reflect-metadata'

import config from './config/config'
import database from './infrastructure/persistence/databaseConfig'
import Server from './bootstrap/server'
import IoC from './bootstrap/ioc/serviceCollection'

const logger = IoC.getLogger()

async function main () {
  try {
    await database.initialize()
    logger.info('Database connected successfully!')

    await new Server(config.app).start()
  } catch (err) {
    logger.error(err)
  }
}

main()
