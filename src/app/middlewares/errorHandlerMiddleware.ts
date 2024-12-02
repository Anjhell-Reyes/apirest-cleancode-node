import { Request, Response, NextFunction } from 'express'

import { NotFoundRepositoryError } from '../../domain/errors/RepositoryError'
import { ValidationError } from '../../domain/errors/ValidationError'
import * as Responses from '../../infrastructure/utils/webApiResponses'
import IoC from "../../bootstrap/ioc/serviceCollection";
import {ForbiddenError} from "../../domain/errors/ForbiddenError";

function errorHandlerMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (res.headersSent) {
    return _next(error)
  }

  if (error instanceof NotFoundRepositoryError) {
    Responses.NotFound(res, error.message)
  } else if (error instanceof ValidationError) {
    Responses.BadRequestObject(res, { errors: error.errors })
  } else if (error instanceof ForbiddenError) {
    Responses.Forbidden(res, error.message)
  } else {
    IoC.getLogger().error(error)
    Responses.InternalServerError(res, 'Internal Exception')
  }
}

export default errorHandlerMiddleware

/* function errorHandlerMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof NotFoundRepositoryError) {
    Responses.NotFound(res, error.message)
  } else if (error instanceof ValidationError) {
    Responses.BadRequestObject(res, { errors: error.errors })
  } else if (error instanceof ForbiddenError) {
    Responses.Forbidden(res, error.message)
  } else {
    IoC.getLogger().error(error)
    Responses.InternalServerError(res, 'Internal Exception')
  }
} */

/* import { Request, Response, NextFunction } from 'express'
import { NotFoundRepositoryError } from '../../domain/errors/RepositoryError'
import { ValidationError } from '../../domain/errors/ValidationError'
import * as Responses from '../../infrastructure/utils/webApiResponses'
import Logger from '../../infrastructure/utils/logger/logger'
import {NotFoundError} from "../../domain/errors/NotFoundError";

function errorHandlerMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof NotFoundRepositoryError || error instanceof NotFoundError) {
    Responses.NotFound(res, error.message || 'Not Found')
  } else if (error instanceof ValidationError) {
    Responses.BadRequestObject(res, { errors: error.errors })
  } else {
    Logger.error(error)
    Responses.InternalServerError(res, 'Internal Exception')
  }
}

export default errorHandlerMiddleware */
