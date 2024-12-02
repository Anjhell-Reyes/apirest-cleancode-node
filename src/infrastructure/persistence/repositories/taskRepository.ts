import { Repository } from 'typeorm'
import { injectable } from 'inversify'
import { Query, TaskRepositoryContract } from '../../../domain/contracts/repositoryContract'
import { Identity } from '../../../domain/models/base/baseModel'

import { TaskModel } from '../../../domain/models/taskModel'
import DefaultCrudRepository from './DefaultCrudRepository'
import { TaskEntity } from '../entities/taskEntity'
import { PaginationQuery, PaginationResultModel } from '../../../domain/models/base/paginationModel'
import { buildPaginationConfig } from '../../utils/pagination/paginationConfig'
import { paginate } from 'nestjs-paginate'

@injectable()
export class TaskRepository implements TaskRepositoryContract {
    constructor(
        private readonly defaultCrudRepository: DefaultCrudRepository<TaskModel, TaskEntity> = new DefaultCrudRepository(TaskEntity)
        //@inject(DefaultCrudRepository) private readonly defaultCrudRepository: DefaultCrudRepository<TaskModel, TaskEntity>
    ) { }

    async create(model: Partial<TaskModel>, query: Query | undefined): Promise<TaskModel> {
        return await this.defaultCrudRepository.create(model, query)
    }

    async delete(id: Identity, query: Query | undefined): Promise<TaskModel> {
        return await this.defaultCrudRepository.delete(id, query)
    }

    async find(id: Identity, query: Query | undefined): Promise<TaskModel> {
        return await this.defaultCrudRepository.find(id, query)
    }

    async paginate(pagination: PaginationQuery, _query: Query | undefined): Promise<PaginationResultModel<TaskModel[]>> {
        const paginationConfig = buildPaginationConfig<TaskEntity>({
            maxLimit: 1000,
            sortableColumns: ['id', 'title', 'completed', 'startDate'],
            filterableColumns: {
                id: true,
                title: true,
                completed: true,
                startDate: true
            }
        })

        const result = await paginate(pagination, this.defaultCrudRepository.getRepository() as Repository<TaskEntity>, paginationConfig);

        const { data, meta, links } = result;

        return new PaginationResultModel<TaskModel[]>(data, meta, links);
    }

    async list(query: Query | undefined): Promise<TaskModel[]> {
        return await this.defaultCrudRepository.list(query)
    }

    async update(id: Identity, model: Partial<TaskModel>, query: Query | undefined): Promise<TaskModel> {
        return await this.defaultCrudRepository.update(id, model, query)
    }
}
