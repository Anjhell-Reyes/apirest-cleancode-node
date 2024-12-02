import { inject, injectable } from "inversify";
import symbols from "../../domain/types/symbols";
import { ResponsableRepositoryContract } from '../../domain/contracts/repositoryContract';
import { Identity } from "../../domain/models/base/baseModel";
import { ResponsableDto, ResponsableMapper } from "../../domain/models/responsableModel";
import { LoggerContract } from "../../domain/contracts/utils/loggerContract";
import { BaseCrudServiceContract } from "./baseService";
import { PaginationQuery, PaginationResultModel } from "../../domain/models/base/paginationModel";

export interface ResponsableServiceContract extends BaseCrudServiceContract<ResponsableDto> {}

@injectable()
export class ResponsableService implements ResponsableServiceContract {
    constructor(
        @inject(symbols.Logger) private readonly logger: LoggerContract,
        @inject(symbols.ResponsableRepository) private readonly responsableRepository: ResponsableRepositoryContract,
        private readonly responsableMapper = new ResponsableMapper()
    ) {
        this.logger.debug('ResponsableService:constructor');
    }

    async create(entity: Partial<ResponsableDto>): Promise<ResponsableDto> {
        const result = await this.responsableRepository.create(entity);
        return result;
    }

    async delete(id: Identity): Promise<ResponsableDto> {
        const result = await this.responsableRepository.delete(id);
        return result;
    }

    async find(id: Identity): Promise<ResponsableDto> {
        const result = await this.responsableRepository.find(id);
        return result;
    }

    async list(): Promise<ResponsableDto[]> {
        const responsables = await this.responsableRepository.list();
        return responsables.map((responsable) => this.responsableMapper.mapToDto(responsable));
    }

    async listPaginated(pagination: PaginationQuery): Promise<PaginationResultModel<ResponsableDto[]>> {
        // Validación básica de paginación
        if (pagination.page && pagination.page < 1) pagination.page = 1;
        if (pagination.limit && pagination.limit < 1) pagination.limit = 10;

        const paginationResultModel = await this.responsableRepository.paginate(pagination);
        const dtoData = paginationResultModel.data.map((item) => this.responsableMapper.mapToDto(item));
        const paginationInfo = paginationResultModel.mapToPaginationBase();

        return new PaginationResultModel<ResponsableDto[]>(dtoData, paginationInfo.meta, paginationInfo.links);
    }

    async update(id: Identity, entity: Partial<ResponsableDto>): Promise<ResponsableDto> {
        const result = await this.responsableRepository.update(id, entity);
        return result;
    }
}
