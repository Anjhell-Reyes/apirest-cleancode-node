import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express'

import { BaseController } from './baseController'
import {Get, Hidden, Produces, Route, SuccessResponse, Tags, Request } from "tsoa";
import {DefaultResponse} from "../../infrastructure/utils/webApiResponses";

@Route("/api/v1")
@Produces('application/json')
@Tags('Health: Este controlador administra el estado de saludo del servicio de empleados.')
export class HealthController extends BaseController {

  /**
   * Comprueba que el servicio está funcionando correctamente.
   * @summary Comprueba el funcionamiento del servicio.
   */
  @Get('/health')
  @SuccessResponse<DefaultResponse>('200', 'OK')
  healthCheck (@Request() @Hidden() _req: ExpressRequest, @Request() @Hidden() res: ExpressResponse, @Request() @Hidden() _next: NextFunction): void {
    console.log('someone health me!')
    this.Ok(res, 'running')
  }

  /**
   * Permite realizar una prueba de ping en el servicio y verificar su disponibilidad.
   * @summary Realiza una prueba de ping en el servicio.
   */
  @Get('/ping')
  @SuccessResponse<DefaultResponse>('200', 'OK')
  ping (@Request() @Hidden() _req: ExpressRequest, @Request() @Hidden() res: ExpressResponse, @Request() @Hidden() _next: NextFunction): void {
    console.log('someone ping me!')
    this.Ok(res, 'pong')
  }
}
