
import { FindOneOptions, ObjectLiteral } from 'typeorm'

import { Identity } from '../../../domain/models/base/baseModel'
import { Query } from '../../../domain/contracts/repositoryContract'
import { NotFoundRepositoryError } from '../../../domain/errors/RepositoryError'
import database from '../databaseConfig'
import { LoggerContract } from '../../../domain/contracts/utils/loggerContract'
import IoC from '../../../bootstrap/ioc/serviceCollection'

export default class DefaultCrudRepository<TModel, TEntity> {
  private readonly logger: LoggerContract

  constructor(
    readonly entity: new () => TEntity
  ) {
    this.logger = IoC.getLogger()
  }

  async create(model: Partial<TModel>, _query: Query | undefined): Promise<TModel> {
    this.logger.debug(`Creating data of '${this.entity.name}'`)
    const repository = this.getRepository()
    const result = repository.create((model as TEntity) as ObjectLiteral)
    await repository.save(result)
    return result as TModel
  }

  async delete(id: Identity, query: Query | undefined, useSoftDelete: boolean = true): Promise<TModel> {
    this.logger.debug(`Deleting data of '${this.entity.name}' by id: ${id}`)
    const repository = this.getRepository()
    const findResult = await this.find(id, query)
    const updateResult = await (useSoftDelete ? repository.softDelete(id) : repository.delete(id))
    this.logger.debug(`Affected rows: ${updateResult.affected}`)
    return findResult
  }

  async find(id: Identity, _query: Query | undefined, options?: FindOneOptions<ObjectLiteral>): Promise<TModel> {
    this.logger.debug(`Finding data of '${this.entity.name}' by id: ${id}`)
    const repository = this.getRepository()
    const result = await repository.findOne({
      where: { id },
      ...options
    })

    if (result == null) {
      throw new NotFoundRepositoryError(`Requested entity with id ${id} not found`)
    }

    return result as TModel
  }

  async list(_query: Query | undefined): Promise<TModel[]> {
    this.logger.debug(`Listing data of '${this.entity.name}'`)
    const repository = this.getRepository()
    return await repository.find({
      order: {
        id: 'DESC'
      }
    }) as TModel[]
  }

  async update(id: Identity, model: Partial<TModel>, query: Query | undefined): Promise<TModel> {
    this.logger.debug(`Updating data of '${this.entity.name}' by id: ${id}`)
    const repository = this.getRepository()
    const updateResult = await repository.update(id, (model as TEntity) as ObjectLiteral)
    this.logger.debug(`Affected rows: ${updateResult.affected}`)
    return await this.find(id, query)
  }

  getRepository() {
    return database.getRepository(this.entity)
  }
}
