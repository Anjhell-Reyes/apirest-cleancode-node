export interface LoggerContract {
  debug (message: string | any, ...args: any[]): void
  error (message: string | any, ...args: any[]): void
  info (message: string | any, ...args: any[]): void
  warn (message: string | any, ...args: any[]): void
  http (message: string | any, ...args: any[]): void
}
