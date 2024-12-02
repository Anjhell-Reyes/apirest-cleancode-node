import { HttpMethod } from '../enums/httpMethod'

export interface HttpContextBaseModel {
  url: string
  method: HttpMethod
  headers?: Record<string, string>
  queryParams?: Record<string, string>
}

export interface HttpContextModel<T> extends HttpContextBaseModel {
  body: T
}

export interface HttpGetContextModel extends Omit<HttpContextBaseModel, 'method'> { }

export interface HttpBodyContextModel<T> extends Omit<HttpContextModel<T>, 'method'> { }
