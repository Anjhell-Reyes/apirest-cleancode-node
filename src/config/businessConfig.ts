export class BusinessConfig {
  readonly clientNits: string[]

  constructor() {
    const clientNitsStr = process.env.BUSINESS_CLIENT_NITS_ARRAY ?? (() => { throw new Error('BUSINESS_CLIENT_NITS_ARRAY') })()
    this.clientNits = JSON.parse(clientNitsStr)
  }
}
