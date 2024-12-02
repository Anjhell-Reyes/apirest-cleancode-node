import * as dotenv from 'dotenv';
dotenv.config();

export enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging'
}

export class AppConfig {
  constructor(
    readonly port = parseInt(process.env.APP_PORT ?? (() => { throw new Error('APP_PORT is not defined') })()),
    readonly env: Environment = process.env.NODE_ENV as Environment ?? (() => { throw new Error('NODE_ENV is not defined') })(),
    readonly prefix = process.env.APP_PREFIX ?? (() => { throw new Error('APP_PREFIX is not defined') })(),
    readonly swaggerPath = process.env.SWAGGER_PATH ?? (() => { throw new Error('SWAGGER_PATH is not defined') })(),
    readonly sslKeyPath = process.env.SSL_KEY_PATH ?? (() => { throw new Error('SSL_KEY_PATH is not defined') })(),
    readonly sslCertPath = process.env.SSL_CERT_PATH ?? (() => { throw new Error('SSL_CERT_PATH is not defined') })(),
    readonly chromeBin = process.env.CHROME_BIN
  ) {
    switch (this.env) {
      case Environment.Development:
      case Environment.Production:
      case Environment.Staging:
        break;
      default:
        throw new Error(`Invalid NODE_ENV value: ${this.env}`)
    }
  }

  get isDevelopment(): boolean {
    return this.env === Environment.Development
  }

  get isStaging(): boolean {
    return this.env === Environment.Staging
  }

  get isProduction(): boolean {
    return this.env === Environment.Production
  }
}
