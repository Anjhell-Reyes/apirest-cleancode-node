import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export interface DefaultResponse {
  message: string
}

export interface DefaultErrorResponse {
  errors: any[]
}

export function Ok (res: Response, message: string): void {
  OkObject(res, { message })
}

export function OkPlain (res: Response, message: string): void {
  OkObject(res, message)
}

export function OkObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.OK).json(data)
}

export function Created (res: Response, message: string): void {
  CreatedObject(res, { message })
}

export function CreatedObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.CREATED).json(data)
}

export function NoContent (res: Response): void {
  res.status(StatusCodes.NO_CONTENT).json()
}

export function BadRequest (res: Response, message: string): void {
  BadRequestObject(res, { message })
}

export function BadRequestObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.BAD_REQUEST).json(data)
}

export function Unauthorized (res: Response, message: string): void {
  UnauthorizedObject(res, { message })
}

export function UnauthorizedObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.UNAUTHORIZED).json(data)
}

export function Forbidden (res: Response, message: string): void {
  ForbiddenObject(res, { message })
}

export function ForbiddenObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.FORBIDDEN).json(data)
}

export function NotFound (res: Response, message: string): void {
  NotFoundObject(res, { message })
}

export function NotFoundObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.NOT_FOUND).json(data)
}

export function Conflict (res: Response, message: string): void {
  ConflictObject(res, { message })
}

export function ConflictObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.CONFLICT).json(data)
}

export function InternalServerError (res: Response, message: string): void {
  InternalServerErrorObject(res, { message })
}

export function InternalServerErrorObject<T> (res: Response, data: T): void {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(data)
}
