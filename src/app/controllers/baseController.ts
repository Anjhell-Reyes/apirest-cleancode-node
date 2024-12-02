import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'

import * as Responses from '../../infrastructure/utils/webApiResponses'

export interface CrudControllerContract {
  list(req: Request, res: Response, next: NextFunction): Promise<void>
  find(_req: Request, res: Response, next: NextFunction): Promise<void>
  create(req: Request, res: Response, next: NextFunction): Promise<void>
  update(req: Request, res: Response, next: NextFunction): Promise<void>
  delete(req: Request, res: Response, next: NextFunction): Promise<void>
}

@injectable()
export abstract class BaseController {
  Ok(res: Response, message: string): void {
    Responses.Ok(res, message)
  }

  OkPlain(res: Response, message: string): void {
    Responses.OkPlain(res, message)
  }

  OkObject<T>(res: Response, data: T): void {
    Responses.OkObject(res, data)
  }

  Created(res: Response, message: string): void {
    Responses.Created(res, message)
  }

  CreatedObject<T>(res: Response, data: T): void {
    Responses.CreatedObject(res, data)
  }

  NoContent(res: Response): void {
    Responses.NoContent(res)
  }

  BadRequest(res: Response, message: string): void {
    Responses.BadRequest(res, message)
  }

  BadRequestObject<T>(res: Response, data: T): void {
    Responses.BadRequestObject(res, data)
  }

  Unauthorized(res: Response, message: string): void {
    Responses.Unauthorized(res, message)
  }

  UnauthorizedObject<T>(res: Response, data: T): void {
    Responses.UnauthorizedObject(res, data)
  }

  Forbidden(res: Response, message: string): void {
    Responses.Forbidden(res, message)
  }

  ForbiddenObject<T>(res: Response, data: T): void {
    Responses.ForbiddenObject(res, data)
  }

  NotFound(res: Response, message: string): void {
    Responses.NotFound(res, message)
  }

  NotFoundObject<T>(res: Response, data: T): void {
    Responses.NotFoundObject(res, data)
  }

  Conflict(res: Response, message: string): void {
    Responses.Conflict(res, message)
  }

  ConflictObject<T>(res: Response, data: T): void {
    Responses.ConflictObject(res, data)
  }

  InternalServerError(res: Response, message: string): void {
    Responses.InternalServerError(res, message)
  }

  InternalServerErrorObject<T>(res: Response, data: T): void {
    Responses.InternalServerErrorObject(res, data)
  }
}
