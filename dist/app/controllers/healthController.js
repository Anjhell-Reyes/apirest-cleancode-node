"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const baseController_1 = require("./baseController");
const tsoa_1 = require("tsoa");
let HealthController = class HealthController extends baseController_1.BaseController {
    /**
     * Comprueba que el servicio está funcionando correctamente.
     * @summary Comprueba el funcionamiento del servicio.
     */
    healthCheck(_req, res, _next) {
        console.log('someone health me!');
        this.Ok(res, 'running');
    }
    /**
     * Permite realizar una prueba de ping en el servicio y verificar su disponibilidad.
     * @summary Realiza una prueba de ping en el servicio.
     */
    ping(_req, res, _next) {
        console.log('someone ping me!');
        this.Ok(res, 'pong');
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, tsoa_1.Get)('/health'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Request)()),
    __param(0, (0, tsoa_1.Hidden)()),
    __param(1, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __param(2, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "healthCheck", null);
__decorate([
    (0, tsoa_1.Get)('/ping'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Request)()),
    __param(0, (0, tsoa_1.Hidden)()),
    __param(1, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __param(2, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "ping", null);
exports.HealthController = HealthController = __decorate([
    (0, tsoa_1.Route)("/api/v1"),
    (0, tsoa_1.Produces)('application/json'),
    (0, tsoa_1.Tags)('Health: Este controlador administra el estado de saludo del servicio de empleados.')
], HealthController);
