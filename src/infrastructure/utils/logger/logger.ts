import winston from 'winston'
import {injectable} from "inversify";

import winstonLogger from './loggerConfig'
import {LoggerContract} from "../../../domain/contracts/utils/loggerContract";

@injectable()
export class Logger implements LoggerContract {
  private readonly _logger: winston.Logger

  constructor () {
    this._logger = winstonLogger
  }

  public info (message: string | any, ...args: any[]): void {
    this._logger.info(message, ...args)
  }

  public warn (message: string | any, ...args: any[]): void {
    this._logger.warn(message, ...args)
  }

  public error (message: string | any, ...args: any[]): void {
    this._logger.error(message, ...args)
  }

  public debug (message: string | any, ...args: any[]): void {
    this._logger.debug(message, ...args)
  }

  public http (message: string | any, ...args: any[]): void {
    this._logger.http(message, ...args)
  }
}
