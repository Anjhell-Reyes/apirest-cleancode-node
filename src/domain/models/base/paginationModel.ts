export interface PaginationMetaContract {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
  sortBy?: string[][]
  filter?: {
    [column: string]: string | string[]
  }
}

export interface PaginationLinkContract {
  first?: string
  previous?: string
  current: string
  next?: string
  last?: string
}

export interface PaginationBaseContract {
  meta?: PaginationMetaContract
  links?: PaginationLinkContract
}

export interface PaginationContract<T> extends PaginationBaseContract {
  data: T
}

export class PaginationResultModel<T> implements PaginationContract<T> {
  data: T
  meta?: PaginationMetaContract
  links?: PaginationLinkContract

  constructor(data: T, meta?: PaginationMetaContract, links?: PaginationLinkContract) {
    this.data = data
    this.meta = meta
    this.links = links
  }

  mapToPaginationBase(): PaginationBaseContract {
    const { data, ...paginationBase } = this
    return paginationBase
  }
}

export interface PaginationQuery {
  page?: number
  limit?: number
  sortBy?: [string, string][]
  filter?: {
    [column: string]: string | string[]
  }
  path: string
}
