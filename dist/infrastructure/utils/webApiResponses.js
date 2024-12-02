"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorObject = exports.InternalServerError = exports.ConflictObject = exports.Conflict = exports.NotFoundObject = exports.NotFound = exports.ForbiddenObject = exports.Forbidden = exports.UnauthorizedObject = exports.Unauthorized = exports.BadRequestObject = exports.BadRequest = exports.NoContent = exports.CreatedObject = exports.Created = exports.OkObject = exports.OkPlain = exports.Ok = void 0;
const http_status_codes_1 = require("http-status-codes");
function Ok(res, message) {
    OkObject(res, { message });
}
exports.Ok = Ok;
function OkPlain(res, message) {
    OkObject(res, message);
}
exports.OkPlain = OkPlain;
function OkObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.OK).json(data);
}
exports.OkObject = OkObject;
function Created(res, message) {
    CreatedObject(res, { message });
}
exports.Created = Created;
function CreatedObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.CREATED).json(data);
}
exports.CreatedObject = CreatedObject;
function NoContent(res) {
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json();
}
exports.NoContent = NoContent;
function BadRequest(res, message) {
    BadRequestObject(res, { message });
}
exports.BadRequest = BadRequest;
function BadRequestObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(data);
}
exports.BadRequestObject = BadRequestObject;
function Unauthorized(res, message) {
    UnauthorizedObject(res, { message });
}
exports.Unauthorized = Unauthorized;
function UnauthorizedObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(data);
}
exports.UnauthorizedObject = UnauthorizedObject;
function Forbidden(res, message) {
    ForbiddenObject(res, { message });
}
exports.Forbidden = Forbidden;
function ForbiddenObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(data);
}
exports.ForbiddenObject = ForbiddenObject;
function NotFound(res, message) {
    NotFoundObject(res, { message });
}
exports.NotFound = NotFound;
function NotFoundObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(data);
}
exports.NotFoundObject = NotFoundObject;
function Conflict(res, message) {
    ConflictObject(res, { message });
}
exports.Conflict = Conflict;
function ConflictObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.CONFLICT).json(data);
}
exports.ConflictObject = ConflictObject;
function InternalServerError(res, message) {
    InternalServerErrorObject(res, { message });
}
exports.InternalServerError = InternalServerError;
function InternalServerErrorObject(res, data) {
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(data);
}
exports.InternalServerErrorObject = InternalServerErrorObject;
