import { Repository } from 'typeorm'
import { injectable } from 'inversify'
import { Query, ResponsableRepositoryContract } from '../../../domain/contracts/repositoryContract'
import { Identity } from '../../../domain/models/base/baseModel'

import { ResponsableModel } from '../../../domain/models/responsableModel'
import DefaultCrudRepository from './DefaultCrudRepository'
import { ResponsableEntity } from '../entities/responsableEntity'
import { PaginationQuery, PaginationResultModel } from '../../../domain/models/base/paginationModel'
import { buildPaginationConfig } from '../../utils/pagination/paginationConfig'
import { paginate } from 'nestjs-paginate'

@injectable()
export class ResponsableRepository implements ResponsableRepositoryContract {
    constructor(
        private readonly defaultCrudRepository: DefaultCrudRepository<ResponsableModel, ResponsableEntity> = new DefaultCrudRepository(ResponsableEntity)
        //@inject(DefaultCrudRepository) private readonly defaultCrudRepository: DefaultCrudRepository<ResponsableModel, ResponsableEntity>
    ) { }

    async create(model: Partial<ResponsableModel>, query: Query | undefined): Promise<ResponsableModel> {
        return await this.defaultCrudRepository.create(model, query)
    }

    async delete(id: Identity, query: Query | undefined): Promise<ResponsableModel> {
        return await this.defaultCrudRepository.delete(id, query)
    }

    async find(id: Identity, query: Query | undefined): Promise<ResponsableModel> {
        return await this.defaultCrudRepository.find(id, query)
    }

    async paginate(pagination: PaginationQuery, _query: Query | undefined): Promise<PaginationResultModel<ResponsableModel[]>> {
        const paginationConfig = buildPaginationConfig<ResponsableEntity>({
            maxLimit: 1000,
            sortableColumns: ['id', 'nombre', 'correo', 'cargo'],
            filterableColumns: {
                id: true,
                nombre: true,
                correo: true,
                cargo: true
            }
        })

        const result = await paginate(pagination, this.defaultCrudRepository.getRepository() as Repository<ResponsableEntity>, paginationConfig);

        const { data, meta, links } = result;

        return new PaginationResultModel<ResponsableModel[]>(data, meta, links);
    }

    async list(query: Query | undefined): Promise<ResponsableModel[]> {
        return await this.defaultCrudRepository.list(query)
    }

    async update(id: Identity, model: Partial<ResponsableModel>, query: Query | undefined): Promise<ResponsableModel> {
        return await this.defaultCrudRepository.update(id, model, query)
    }
}
