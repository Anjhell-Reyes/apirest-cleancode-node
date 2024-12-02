import {Request} from "express"
import {injectable} from "inversify"
import { pickBy, Dictionary, isString, mapKeys } from 'lodash'

import {PaginationQuery} from "../../../domain/models/base/paginationModel";
import {PaginationQueryBuilderContract} from "../../../domain/contracts/utils/paginationContract";

@injectable()
export class PaginationQueryBuilder implements PaginationQueryBuilderContract {
  build(request: Request): PaginationQuery {
    const { query } = request

    // Determine if Express or Fastify to rebuild the original url and reduce down to protocol, host and base url
    let originalUrl: any
    if (request.originalUrl) {
      originalUrl = request.protocol + '://' + request.get('host') + request.originalUrl
    } else {
      originalUrl = request.protocol + '://' + request.hostname + request.url
    }
    const urlParts = new URL(originalUrl)
    const path = urlParts.protocol + '//' + urlParts.host + urlParts.pathname

    const sortBy = this.parseParam<[string, string]>(query.sortBy, this.multipleSplit)

    const filter = mapKeys(
      pickBy(
        query,
        (param, name) =>
          name.includes('filter.') &&
          (isString(param) || (Array.isArray(param) && (param as any[]).every((p) => isString(p))))
      ) as Dictionary<string | string[]>,
      (_param, name) => name.replace('filter.', '')
    )

    return {
      page: query.page ? parseInt(query.page.toString(), 10) : undefined,
      limit: query.limit ? parseInt(query.limit.toString(), 10) : undefined,
      sortBy,
      filter: Object.keys(filter).length ? filter : undefined,
      path
    }
  }

  private multipleSplit = (param: string, res: any[]) => {
    const items = param.split(':')
    if (items.length === 2) {
      res.push(items as [string, string])
    }
  }

  private parseParam<T>(queryParam: unknown, parserLogic: (param: string, res: T[]) => void): T[] | undefined {
    const res: T[] = []
    if (queryParam) {
      const params = !Array.isArray(queryParam) ? [queryParam] : queryParam
      for (const param of params) {
        if (isString(param)) {
          parserLogic(param, res)
        }
      }
    }
    return res.length ? res : undefined
  }
}
