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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const inversify_1 = require("inversify");
const Responses = __importStar(require("../../infrastructure/utils/webApiResponses"));
let BaseController = class BaseController {
    Ok(res, message) {
        Responses.Ok(res, message);
    }
    OkPlain(res, message) {
        Responses.OkPlain(res, message);
    }
    OkObject(res, data) {
        Responses.OkObject(res, data);
    }
    Created(res, message) {
        Responses.Created(res, message);
    }
    CreatedObject(res, data) {
        Responses.CreatedObject(res, data);
    }
    NoContent(res) {
        Responses.NoContent(res);
    }
    BadRequest(res, message) {
        Responses.BadRequest(res, message);
    }
    BadRequestObject(res, data) {
        Responses.BadRequestObject(res, data);
    }
    Unauthorized(res, message) {
        Responses.Unauthorized(res, message);
    }
    UnauthorizedObject(res, data) {
        Responses.UnauthorizedObject(res, data);
    }
    Forbidden(res, message) {
        Responses.Forbidden(res, message);
    }
    ForbiddenObject(res, data) {
        Responses.ForbiddenObject(res, data);
    }
    NotFound(res, message) {
        Responses.NotFound(res, message);
    }
    NotFoundObject(res, data) {
        Responses.NotFoundObject(res, data);
    }
    Conflict(res, message) {
        Responses.Conflict(res, message);
    }
    ConflictObject(res, data) {
        Responses.ConflictObject(res, data);
    }
    InternalServerError(res, message) {
        Responses.InternalServerError(res, message);
    }
    InternalServerErrorObject(res, data) {
        Responses.InternalServerErrorObject(res, data);
    }
};
exports.BaseController = BaseController;
exports.BaseController = BaseController = __decorate([
    (0, inversify_1.injectable)()
], BaseController);
