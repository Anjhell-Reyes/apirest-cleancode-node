export class ValidationError extends Error {
  errors: any[] = []

  constructor (errors?: any[], message?: string) {
    super(message ?? '')
    this.name = 'ValidationError'
    this.errors = errors ?? []
  }
}
