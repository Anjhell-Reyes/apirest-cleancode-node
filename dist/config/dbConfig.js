"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const dotenv = __importStar(require("dotenv"));
//import { parse } from 'pg-connection-string';
dotenv.config();
class DatabaseConfig {
    /* readonly host: string;
    readonly port: number;
    readonly dbname: string;
    readonly username: string;
    readonly password: string;
    readonly type: string;
    readonly synchronize: boolean;
    readonly logging: boolean; */
    constructor(host, port, dbname, username, password, type, synchronize, logging) {
        var _a, _b, _c, _d, _e, _f;
        if (host === void 0) { host = (_a = process.env.TASK_DB_HOST) !== null && _a !== void 0 ? _a : (() => { throw new Error('TASK_DB_HOST is not defined'); })(); }
        if (port === void 0) { port = parseInt((_b = process.env.TASK_DB_PORT) !== null && _b !== void 0 ? _b : (() => { throw new Error('TASK_DB_PORT is not defined'); })()); }
        if (dbname === void 0) { dbname = (_c = process.env.TASK_DB_NAME) !== null && _c !== void 0 ? _c : (() => { throw new Error('TASK_DB_NAME is not defined'); })(); }
        if (username === void 0) { username = (_d = process.env.TASK_DB_USER) !== null && _d !== void 0 ? _d : (() => { throw new Error('TASK_DB_USERNAME is not defined'); })(); }
        if (password === void 0) { password = (_e = process.env.TASK_DB_PASSWORD) !== null && _e !== void 0 ? _e : (() => { throw new Error('TASK_DB_PASSWORD is not defined'); })(); }
        if (type === void 0) { type = (_f = process.env.TASK_DB_TYPE) !== null && _f !== void 0 ? _f : (() => { throw new Error('TASK_DB_TYPE is not defined'); })(); }
        if (synchronize === void 0) { synchronize = process.env.TASK_DB_SYNCHRONIZE === 'true'; }
        if (logging === void 0) { logging = process.env.TASK_DB_LOGGING === 'true'; }
        this.host = host;
        this.port = port;
        this.dbname = dbname;
        this.username = username;
        this.password = password;
        this.type = type;
        this.synchronize = synchronize;
        this.logging = logging;
        /* if (process.env.NODE_ENV === 'production') {
          const config = parse(process.env.DATABASE_URL || '');
          this.host = config.host || '';
          this.port = parseInt(config.port || '5432');
          this.dbname = config.database || '';
          this.username = config.user || '';
          this.password = config.password || '';
          this.type = 'mysql';
          this.synchronize = false; // Ajusta según tus necesidades
          this.logging = false; // Ajusta según tus necesidades
        } else {
          this.host = process.env.TASK_DB_HOST || '';
          this.port = parseInt(process.env.TASK_DB_PORT || '5432');
          this.dbname = process.env.TASK_DB_NAME || '';
          this.username = process.env.TASK_DB_USER || '';
          this.password = process.env.TASK_DB_PASSWORD || '';
          this.type = process.env.TASK_DB_TYPE || 'mysql';
          this.synchronize = process.env.TASK_DB_SYNCHRONIZE === 'true';
          this.logging = process.env.TASK_DB_LOGGING === 'true';
        } */
    }
}
exports.DatabaseConfig = DatabaseConfig;
