import { Identity } from '../models/base/baseModel'
import { PaginationQuery, PaginationResultModel } from '../models/base/paginationModel'
import { ResponsableModel } from '../models/responsableModel'
import { TaskModel } from "../models/taskModel"

export type Query = Record<string, unknown>

export interface RepositoryList<T> {
  list: (query?: Query) => Promise<T[]>
}

export interface RepositoryPaginate<T> {
  paginate: (pagination: PaginationQuery, query?: Query) => Promise<PaginationResultModel<T[]>>
}

export interface RepositoryContract<T> extends RepositoryList<T>, RepositoryPaginate<T> {
  list: (query?: Query) => Promise<T[]>

  paginate: (pagination: PaginationQuery, query?: Query) => Promise<PaginationResultModel<T[]>>

  create: (model: Partial<T>, query?: Query) => Promise<T>

  delete: (id: Identity, query?: Query) => Promise<T>

  find: (id: Identity, query?: Query) => Promise<T>

  update: (id: Identity, model: Partial<T>, query?: Query) => Promise<T>
}

export interface TaskRepositoryContract extends RepositoryContract<TaskModel> {}
export interface ResponsableRepositoryContract extends RepositoryContract<ResponsableModel> {}