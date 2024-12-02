"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryError_1 = require("../../domain/errors/RepositoryError");
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Responses = __importStar(require("../../infrastructure/utils/webApiResponses"));
const serviceCollection_1 = __importDefault(require("../../bootstrap/ioc/serviceCollection"));
const ForbiddenError_1 = require("../../domain/errors/ForbiddenError");
function errorHandlerMiddleware(error, _req, res, _next) {
    if (res.headersSent) {
        return _next(error);
    }
    if (error instanceof RepositoryError_1.NotFoundRepositoryError) {
        Responses.NotFound(res, error.message);
    }
    else if (error instanceof ValidationError_1.ValidationError) {
        Responses.BadRequestObject(res, { errors: error.errors });
    }
    else if (error instanceof ForbiddenError_1.ForbiddenError) {
        Responses.Forbidden(res, error.message);
    }
    else {
        serviceCollection_1.default.getLogger().error(error);
        Responses.InternalServerError(res, 'Internal Exception');
    }
}
exports.default = errorHandlerMiddleware;
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
