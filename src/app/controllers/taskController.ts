import { inject, injectable } from 'inversify';
import symbols from '../../domain/types/symbols';
import { TaskServiceContract } from '../services/taskService';
import { BaseController, CrudControllerContract } from './baseController';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Get, SuccessResponse, Request, Response, Route, Produces, Tags, Delete, Put, Body, Post } from 'tsoa';  // npm install tsoa - npm install @types/tsoa --save-dev
import { DefaultErrorResponse, DefaultResponse } from '../../infrastructure/utils/webApiResponses'
import { PaginationQueryBuilderContract } from '../../domain/contracts/utils/paginationContract'
import { PaginationResultModel } from '../../domain/models/base/paginationModel'
import { TaskDto, TaskRequestDto } from '../../domain/models/taskModel'
import { Path } from '@tsoa/runtime/dist/decorators/parameter'
import { Identity } from '../../domain/models/base/baseModel'

export interface TaskControllerContract extends CrudControllerContract { }

@Route('/api/v1/tasks')
@Produces('application/json')
@Tags('Tasks')
@injectable()
export class TaskController extends BaseController implements TaskControllerContract {
    constructor(
        @inject(symbols.PaginationQueryBuilder) private readonly paginationQueryBuilder: PaginationQueryBuilderContract,        
        @inject(symbols.TaskService) private readonly taskService: TaskServiceContract
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
   * Retorna todas las novedades de los trabajadores de la empresa
   * @summary Retorna todas las novedades de los datos de todos los trabajadores de la empresa 
   */
    @Get('/')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    private async listPaginated(@Request() request: ExpressRequest): Promise<PaginationResultModel<TaskDto[]>> {
        const query = this.paginationQueryBuilder.build(request)
        return await this.taskService.listPaginated(query)
    }

    /**
     * Retorna una novedad del trabajador de la empresa
     * @param id Identificador de la novedad del trabajador
     * @example id "1"
     * @summary Retorna una novedad de un trabajador de la empresa
     */
    @Get('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async findOne(@Path() id: Identity): Promise<TaskDto> {
        return await this.taskService.find(id)
    }

    /**
     * Crea una novedad de un trabajador de la empresa
     * @summary Crea una novedad de un trabajador
     */
    @Post('/')
    @SuccessResponse('201', 'CREATED')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async createNew(@Body() data: TaskRequestDto): Promise<TaskDto> {
        return await this.taskService.create(data)
    }

    /**
     * Actualiza una novedad de un trabajador de la empresa
     * @param id Identificador la novedad
     * @example id "1"
     * @summary Actualiza una novedad de un trabajador
     */
    @Put('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async updateOne(@Path() id: Identity, @Body() data: TaskRequestDto): Promise<TaskDto> {
        return await this.taskService.update(id, data)
    }

    /**
     * Elimina una novedad de un trabajador de la empresa
     * @param id Identificador de la novedad
     * @example id "1"
     * @summary Elimina una novedad de un trabajador
     */
    @Delete('/{id}')
    @SuccessResponse('200', 'OK')
    @Response<DefaultErrorResponse>('400', 'BAD REQUEST')
    @Response<DefaultResponse>('404', 'NOT FOUND')
    @Produces('application/json')
    private async deleteOne(@Path() id: Identity): Promise<TaskDto> {
        return await this.taskService.delete(id)
    }
}
