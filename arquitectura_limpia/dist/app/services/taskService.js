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
exports.TaskService = void 0;
const inversify_1 = require("inversify");
const symbols_1 = __importDefault(require("../../domain/types/symbols"));
const taskModel_1 = require("../../domain/models/taskModel");
const paginationModel_1 = require("../../domain/models/base/paginationModel");
let TaskService = class TaskService {
    constructor(logger, taskRepository, taskMapper = new taskModel_1.TaskMapper()) {
        this.logger = logger;
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.logger.debug('TaskService:constructor');
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taskRepository.create(entity);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taskRepository.delete(id);
            return result;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taskRepository.find(id);
            return result;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskRepository.list();
            return tasks.map((task) => this.taskMapper.mapToDto(task));
        });
    }
    listPaginated(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validación básica de paginación
            if (pagination.page && pagination.page < 1)
                pagination.page = 1;
            if (pagination.limit && pagination.limit < 1)
                pagination.limit = 10;
            const paginationResultModel = yield this.taskRepository.paginate(pagination);
            const dtoData = paginationResultModel.data.map((item) => this.taskMapper.mapToDto(item));
            const paginationInfo = paginationResultModel.mapToPaginationBase();
            return new paginationModel_1.PaginationResultModel(dtoData, paginationInfo.meta, paginationInfo.links);
        });
    }
    update(id, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taskRepository.update(id, entity);
            return result;
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(symbols_1.default.Logger)),
    __param(1, (0, inversify_1.inject)(symbols_1.default.TaskRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], TaskService);
