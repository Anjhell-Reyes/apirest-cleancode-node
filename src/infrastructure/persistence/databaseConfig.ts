import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import config from '../../config/config'
import { TaskEntity } from './entities/taskEntity';
import { ResponsableEntity } from './entities/responsableEntity';


const isProduction = process.env.NODE_ENV === 'development';

export default new DataSource({
  type: 'mysql',  //'postgres',  // config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.dbname,
  entities: [
    TaskEntity,
    ResponsableEntity
  ],
  synchronize: config.db.synchronize,
  logging: config.db.logging,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: isProduction ? ['dist/src/infrastructure/persistence/migrations/*.js'] : ['src/infrastructure/persistence/migrations/*.ts'],
})
