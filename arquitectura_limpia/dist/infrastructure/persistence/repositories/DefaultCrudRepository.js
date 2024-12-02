"use strict";
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
const RepositoryError_1 = require("../../../domain/errors/RepositoryError");
const databaseConfig_1 = __importDefault(require("../databaseConfig"));
const serviceCollection_1 = __importDefault(require("../../../bootstrap/ioc/serviceCollection"));
class DefaultCrudRepository {
    constructor(entity) {
        this.entity = entity;
        this.logger = serviceCollection_1.default.getLogger();
    }
    create(model, _query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Creating data of '${this.entity.name}'`);
            const repository = this.getRepository();
            const result = repository.create(model);
            yield repository.save(result);
            return result;
        });
    }
    delete(id_1, query_1) {
        return __awaiter(this, arguments, void 0, function* (id, query, useSoftDelete = true) {
            this.logger.debug(`Deleting data of '${this.entity.name}' by id: ${id}`);
            const repository = this.getRepository();
            const findResult = yield this.find(id, query);
            const updateResult = yield (useSoftDelete ? repository.softDelete(id) : repository.delete(id));
            this.logger.debug(`Affected rows: ${updateResult.affected}`);
            return findResult;
        });
    }
    find(id, _query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Finding data of '${this.entity.name}' by id: ${id}`);
            const repository = this.getRepository();
            const result = yield repository.findOne(Object.assign({ where: { id } }, options));
            if (result == null) {
                throw new RepositoryError_1.NotFoundRepositoryError(`Requested entity with id ${id} not found`);
            }
            return result;
        });
    }
    list(_query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Listing data of '${this.entity.name}'`);
            const repository = this.getRepository();
            return yield repository.find({
                order: {
                    id: 'DESC'
                }
            });
        });
    }
    update(id, model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Updating data of '${this.entity.name}' by id: ${id}`);
            const repository = this.getRepository();
            const updateResult = yield repository.update(id, model);
            this.logger.debug(`Affected rows: ${updateResult.affected}`);
            return yield this.find(id, query);
        });
    }
    getRepository() {
        return databaseConfig_1.default.getRepository(this.entity);
    }
}
exports.default = DefaultCrudRepository;
