import * as dotenv from 'dotenv';
//import { parse } from 'pg-connection-string';

dotenv.config();

export class DatabaseConfig {
  /* readonly host: string;
  readonly port: number;
  readonly dbname: string;
  readonly username: string;
  readonly password: string;
  readonly type: string;
  readonly synchronize: boolean;
  readonly logging: boolean; */

  constructor(
    readonly host = process.env.TASK_DB_HOST ?? (() => { throw new Error('TASK_DB_HOST is not defined') })(),
    readonly port = parseInt(process.env.TASK_DB_PORT ?? (() => { throw new Error('TASK_DB_PORT is not defined') })()),
    readonly dbname = process.env.TASK_DB_NAME ?? (() => { throw new Error('TASK_DB_NAME is not defined') })(),
    readonly username = process.env.TASK_DB_USER ?? (() => { throw new Error('TASK_DB_USERNAME is not defined') })(),
    readonly password = process.env.TASK_DB_PASSWORD ?? (() => { throw new Error('TASK_DB_PASSWORD is not defined') })(),
    readonly type = (process.env.TASK_DB_TYPE as any) ?? (() => { throw new Error('TASK_DB_TYPE is not defined') })(),
    readonly synchronize = process.env.TASK_DB_SYNCHRONIZE === 'true',
    readonly logging = process.env.TASK_DB_LOGGING === 'true'
  ) {
    /* if (process.env.NODE_ENV === 'production') {
      const config = parse(process.env.DATABASE_URL || '');
      this.host = config.host || '';
      this.port = parseInt(config.port || '5432');
      this.dbname = config.database || '';
      this.username = config.user || '';
      this.password = config.password || '';
      this.type = 'mysql';
      this.synchronize = false; // Ajusta según tus necesidades
      this.logging = false; // Ajusta según tus necesidades
    } else {
      this.host = process.env.TASK_DB_HOST || '';
      this.port = parseInt(process.env.TASK_DB_PORT || '5432');
      this.dbname = process.env.TASK_DB_NAME || '';
      this.username = process.env.TASK_DB_USER || '';
      this.password = process.env.TASK_DB_PASSWORD || '';
      this.type = process.env.TASK_DB_TYPE || 'mysql';
      this.synchronize = process.env.TASK_DB_SYNCHRONIZE === 'true';
      this.logging = process.env.TASK_DB_LOGGING === 'true';
    } */
  }
}
