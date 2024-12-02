import { Request } from "express";
import { PaginationQuery } from "../../models/base/paginationModel";

export interface PaginationQueryBuilderContract {
  build (request: Request): PaginationQuery
}
