import lodash from 'lodash'
import { PaginateConfig } from 'nestjs-paginate'
import {Column} from "nestjs-paginate/lib/helper";

export function buildPaginationConfig<T>(paginateConfig: PaginateConfig<T>): PaginateConfig<T> {
  const defaultPaginateConfig = {
    maxLimit: 2000,
    defaultLimit: 25,
    relativePath: true,
    sortableColumns: [],
    defaultSortBy: [['id', 'DESC']],
    filterableColumns: {
      id: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  const merged = lodash.merge(defaultPaginateConfig, paginateConfig)
  merged.sortableColumns = (paginateConfig.sortableColumns || []).concat(['id', 'createdAt', 'updatedAt'] as Column<T>[]) as any

  return merged
}
