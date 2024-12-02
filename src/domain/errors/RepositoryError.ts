export class NotFoundRepositoryError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'NotFoundRepositoryError'
  }
}
