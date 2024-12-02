"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const symbols_1 = __importDefault(require("../../domain/types/symbols"));
const paginationQueryBuilder_1 = require("../../infrastructure/utils/pagination/paginationQueryBuilder");
const handlebarsCompiler_1 = require("../../infrastructure/utils/handlebars/handlebarsCompiler");
const handlebarsLoader_1 = require("../../infrastructure/utils/handlebars/handlebarsLoader");
const logger_1 = require("../../infrastructure/utils/logger/logger");
const taskRepository_1 = require("../../infrastructure/persistence/repositories/taskRepository");
const taskService_1 = require("../../app/services/taskService");
const taskController_1 = require("../../app/controllers/taskController");
const container = new inversify_1.Container();
container.bind(symbols_1.default.TaskRepository).to(taskRepository_1.TaskRepository).inSingletonScope();
container.bind(symbols_1.default.TaskRepository).to(taskRepository_1.TaskRepository).inSingletonScope();
container.bind(symbols_1.default.TaskService).to(taskService_1.TaskService).inSingletonScope();
container.bind(symbols_1.default.TaskController).to(taskController_1.TaskController).inSingletonScope();
container.bind(symbols_1.default.PaginationQueryBuilder).to(paginationQueryBuilder_1.PaginationQueryBuilder).inSingletonScope();
//container.bind<PdfGeneratorContract>(symbols.PdfGenerator).to(PdfGenerator).inSingletonScope()
container.bind(symbols_1.default.HandlebarsCompiler).to(handlebarsCompiler_1.HandlebarsCompiler).inSingletonScope();
container.bind(symbols_1.default.HandlebarsLoader).to(handlebarsLoader_1.HandlebarsLoader).inSingletonScope();
container.bind(symbols_1.default.Logger).to(logger_1.Logger).inSingletonScope();
exports.default = container;
