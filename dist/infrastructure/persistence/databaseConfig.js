"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const config_1 = __importDefault(require("../../config/config"));
const taskEntity_1 = require("./entities/taskEntity");
const isProduction = process.env.NODE_ENV === 'development';
exports.default = new typeorm_1.DataSource({
    type: 'mysql', //'postgres',  // config.db.type,
    host: config_1.default.db.host,
    port: config_1.default.db.port,
    username: config_1.default.db.username,
    password: config_1.default.db.password,
    database: config_1.default.db.dbname,
    entities: [
        taskEntity_1.TaskEntity
    ],
    synchronize: config_1.default.db.synchronize,
    logging: config_1.default.db.logging,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    migrations: isProduction ? ['dist/src/infrastructure/persistence/migrations/*.js'] : ['src/infrastructure/persistence/migrations/*.ts'],
});
