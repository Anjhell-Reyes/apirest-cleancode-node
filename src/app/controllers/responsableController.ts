import { inject, injectable } from 'inversify';
import symbols from '../../domain/types/symbols';
import { ResponsableServiceContract } from '../services/responsableService';
import { BaseController, CrudControllerContract } from './baseController';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Get, SuccessResponse, Request, Response, Route, Produces, Tags, Delete, Put, Body, Post } from 'tsoa';  // npm install tsoa - npm install @types/tsoa --save-dev
import { DefaultErrorResponse, DefaultResponse } from '../../infrastructure/utils/webApiResponses';
import { PaginationQueryBuilderContract } from '../../domain/contracts/utils/paginationContract';
import { PaginationResultModel } from '../../domain/models/base/paginationModel';
import { ResponsableDto, ResponsableRequestDto } from '../../domain/models/responsableModel';
import { Path } from '@tsoa/runtime/dist/decorators/parameter';
import { Identity } from '../../domain/models/base/baseModel';

export interface ResponsableControllerContract extends CrudControllerContract { }

@Route('/api/v1/responsables')
@Produces('application/json')
@Tags('Responsables')
@injectable()
export class ResponsableController extends BaseController implements ResponsableControllerContract {
    constructor(
        @inject(symbols.PaginationQueryBuilder) private readonly paginationQueryBuilder: PaginationQueryBuilderContract,        
        @inject(symbols.ResponsableService) private readonly responsableService: ResponsableServiceContract
    ) {
        super();
    }

    async create(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const dto = await this.createNew(req.body)
        this.CreatedObject(res, dto)
    }

    async delete(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const id = req.params.id;        
        const dto = await this.deleteOne(id);
        this.OkObject(res, dto)
    }

    async find(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const id = req.params.id
        const dto = await this.findOne(id)
        this.OkObject(res, dto)
    }

    async list(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const dto = await this.listPaginated(req)
        this.OkObject(res, dto)
    }

    async update(req: ExpressRequest, res: ExpressResponse, _next: NextFunction): Promise<void> {
        const id = req.params.id
        const dto = await this.updateOne(id, req.body)
        this.OkObject(res, dto)
    }

    /**
   * Retorna todos los responsables de la empresa
   * @summary Retorna todos los datos de los responsables de la empresa 
   */
    @Get('/')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    private async listPaginated(@Request() request: ExpressRequest): Promise<PaginationResultModel<ResponsableDto[]>> {
        const query = this.paginationQueryBuilder.build(request)
        return await this.responsableService.listPaginated(query)
    }

    /**
     * Retorna un responsable de la empresa
     * @param id Identificador del responsable
     * @example id "1"
     * @summary Retorna un responsable de la empresa
     */
    @Get('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async findOne(@Path() id: Identity): Promise<ResponsableDto> {
        return await this.responsableService.find(id)
    }

    /**
     * Crea un responsable de la empresa
     * @summary Crea un responsable
     */
    @Post('/')
    @SuccessResponse('201', 'CREATED')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async createNew(@Body() data: ResponsableRequestDto): Promise<ResponsableDto> {
        return await this.responsableService.create(data)
    }

    /**
     * Actualiza un responsable de la empresa
     * @param id Identificador del responsable
     * @example id "1"
     * @summary Actualiza un responsable de la empresa
     */
    @Put('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async updateOne(@Path() id: Identity, @Body() data: ResponsableRequestDto): Promise<ResponsableDto> {
        return await this.responsableService.update(id, data)
    }

    /**
     * Elimina un responsable de la empresa
     * @param id Identificador del responsable
     * @example id "1"
     * @summary Elimina un responsable de la empresa
     */
    @Delete('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async deleteOne(@Path() id: Identity): Promise<ResponsableDto> {
        return await this.responsableService.delete(id)
    }
}
