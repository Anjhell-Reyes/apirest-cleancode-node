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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const inversify_1 = require("inversify");
const symbols_1 = __importDefault(require("../../domain/types/symbols"));
const baseController_1 = require("./baseController");
const tsoa_1 = require("tsoa"); // npm install tsoa - npm install @types/tsoa --save-dev
const parameter_1 = require("@tsoa/runtime/dist/decorators/parameter");
let TaskController = class TaskController extends baseController_1.BaseController {
    constructor(paginationQueryBuilder, taskService) {
        super();
        this.paginationQueryBuilder = paginationQueryBuilder;
        this.taskService = taskService;
    }
    create(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = yield this.createNew(req.body);
            this.CreatedObject(res, dto);
        });
    }
    delete(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = yield this.deleteOne(id);
            this.OkObject(res, dto);
        });
    }
    find(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = yield this.findOne(id);
            this.OkObject(res, dto);
        });
    }
    list(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = yield this.listPaginated(req);
            this.OkObject(res, dto);
        });
    }
    update(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = yield this.updateOne(id, req.body);
            this.OkObject(res, dto);
        });
    }
    /**
   * Retorna todas las novedades de los trabajadores de la empresa
   * @summary Retorna todas las novedades de los datos de todos los trabajadores de la empresa
   */
    listPaginated(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.paginationQueryBuilder.build(request);
            return yield this.taskService.listPaginated(query);
        });
    }
    /**
     * Retorna una novedad del trabajador de la empresa
     * @param id Identificador de la novedad del trabajador
     * @example id "1"
     * @summary Retorna una novedad de un trabajador de la empresa
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskService.find(id);
        });
    }
    /**
     * Crea una novedad de un trabajador de la empresa
     * @summary Crea una novedad de un trabajador
     */
    createNew(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskService.create(data);
        });
    }
    /**
     * Actualiza una novedad de un trabajador de la empresa
     * @param id Identificador la novedad
     * @example id "1"
     * @summary Actualiza una novedad de un trabajador
     */
    updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskService.update(id, data);
        });
    }
    /**
     * Elimina una novedad de un trabajador de la empresa
     * @param id Identificador de la novedad
     * @example id "1"
     * @summary Elimina una novedad de un trabajador
     */
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskService.delete(id);
        });
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, tsoa_1.Get)('/'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    (0, tsoa_1.Response)('400', 'BAD REQUEST'),
    (0, tsoa_1.Response)('404', 'NOT FOUND'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "listPaginated", null);
__decorate([
    (0, tsoa_1.Get)('/{id}'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    (0, tsoa_1.Response)('400', 'BAD REQUEST'),
    (0, tsoa_1.Response)('404', 'NOT FOUND'),
    (0, tsoa_1.Produces)('application/json'),
    __param(0, (0, parameter_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, tsoa_1.Post)('/'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    (0, tsoa_1.Response)('400', 'BAD REQUEST'),
    (0, tsoa_1.Response)('404', 'NOT FOUND'),
    (0, tsoa_1.Produces)('application/json'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createNew", null);
__decorate([
    (0, tsoa_1.Put)('/{id}'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    (0, tsoa_1.Response)('400', 'BAD REQUEST'),
    (0, tsoa_1.Response)('404', 'NOT FOUND'),
    (0, tsoa_1.Produces)('application/json'),
    __param(0, (0, parameter_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateOne", null);
__decorate([
    (0, tsoa_1.Delete)('/{id}'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    (0, tsoa_1.Response)('400', 'BAD REQUEST'),
    (0, tsoa_1.Response)('404', 'NOT FOUND'),
    (0, tsoa_1.Produces)('application/json'),
    __param(0, (0, parameter_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteOne", null);
exports.TaskController = TaskController = __decorate([
    (0, tsoa_1.Route)('/api/v1/tasks'),
    (0, tsoa_1.Produces)('application/json'),
    (0, tsoa_1.Tags)('Tasks'),
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(symbols_1.default.PaginationQueryBuilder)),
    __param(1, (0, inversify_1.inject)(symbols_1.default.TaskService)),
    __metadata("design:paramtypes", [Object, Object])
], TaskController);
