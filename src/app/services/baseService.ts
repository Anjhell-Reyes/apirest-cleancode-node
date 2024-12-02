import {Identity} from "../../domain/models/base/baseModel";
import {PaginateQuery} from "nestjs-paginate";
import {PaginationResultModel} from "../../domain/models/base/paginationModel";

export interface BaseCrudServiceContract<T> {
  create (entity: Partial<T>): Promise<T>
  delete (id: Identity): Promise<T>
  find (id: Identity): Promise<T>
  list (): Promise<T[]>
  listPaginated (query: PaginateQuery): Promise<PaginationResultModel<T[]>>
  update (id: Identity, entity: Partial<T>): Promise<T>
}
